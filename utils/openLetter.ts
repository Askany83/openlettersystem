import {
  LetterData,
  OpenLetter as OpenLetterInterface,
} from "@/interfaces/systemInterfaces";
import { CipherSystem } from "@/utils/cipherSystem";
import { CacheSystem } from "@/utils/cacheSystem";
import { createOpenLetterObject } from "./(common)/letterFactory";

export class OpenLetter {
  private letterId: string;
  private title: string;
  private message: string;
  protected letterSender: string;
  protected letterReceiver: string;

  constructor(
    letterId: string,
    title: string,
    message: string,
    senderId: string,
    receiverId: string
  ) {
    this.letterId = letterId;
    this.title = title;
    this.message = message;
    this.letterSender = senderId;
    this.letterReceiver = receiverId;
  }

  async create(): Promise<void> {
    try {
      const compressedMessage = await CipherSystem.compress(this.message);

      const letterData: LetterData = {
        title: this.title,
        message: compressedMessage,
        letterReceiverId: this.letterReceiver,
        letterSenderId: this.letterSender,
      };

      const response = await fetch(`/api/writeLetter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(letterData),
      });

      if (!response.ok) {
        throw new Error("Failed to send letter");
      }

      // Get the letterId from the response
      const { letterId } = await response.json();
      console.log("Letter sent successfully: - class openLetter", letterId);

      // Created an object that fits the OpenLetter interface structure
      const openLetterInterfaceObject = createOpenLetterObject(
        letterId,
        this.title,
        this.message,
        this.letterReceiver,
        this.letterSender
      );

      const cacheSystem = new CacheSystem();
      cacheSystem.saveOpenLetters([openLetterInterfaceObject]);
      console.log("Letter created and saved successfully in cache");
      return letterId;
    } catch (error) {
      console.error("Error creating the letter:", error);
    }
  }

  // readOne(): void {
  //   console.log(`Reading letter with ID: ${this.letterId}`);
  // }

  async getAll(receiverId: string): Promise<OpenLetterInterface[] | void> {
    try {
      console.log(
        "Fetching letters for receiver with ID - getAll:",
        receiverId
      );
      const response = await fetch(`/api/letters?receiverId=${receiverId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch letters");
      }

      // Parse the response data
      const letters: OpenLetterInterface[] = await response.json();
      console.log("Letters fetched successfully - getAll:", letters);

      // Return the fetched letters
      return letters;
    } catch (error) {
      console.error("Error fetching letters:", error);
    }
  }

  async update(): Promise<void> {
    try {
      // Compress the message before sending it to the backend
      const compressedMessage = await CipherSystem.compress(this.message);

      // Prepare the data for the PATCH request
      const letterData = {
        title: this.title,
        message: compressedMessage,
      };

      // Send a PATCH request to update the letter
      const response = await fetch(
        `/api/editLetter?letterId=${this.letterId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(letterData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the letter");
      }

      const result = await response.json();
      console.log("Letter updated successfully - openLetter class:", result);

      // After the letter has been successfully updated, save it to cache
      const updatedLetterData = {
        id: this.letterId,
        title: this.title,
        content: this.message,
        receiverId: this.letterReceiver,
        senderId: this.letterSender,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const cacheSystem = new CacheSystem();
      console.log("Letter ready to be updated in cache");
      cacheSystem.updateOneLetter(this.letterId, updatedLetterData);
      console.log("Letter updated and saved successfully in cache");
    } catch (error) {
      console.error("Error updating the letter:", error);
    }
  }

  async deleteOne(): Promise<string | null> {
    try {
      const response = await fetch(
        `/api/deleteLetter/?letterId=${this.letterId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete letter");
      }

      alert("Carta Aberta apagada com sucesso!");

      // Remove the letter from the cache after deletion
      const cacheSystem = new CacheSystem();
      cacheSystem.deleteOneLetter(this.letterId);

      console.log("Letter deleted and removed from cache");

      return null;
    } catch (error) {
      console.error("Error deleting letter:", error);
      return "Erro ao apagar a carta.";
    }
  }
}
