import { LetterReceiver, OpenLetter } from "@/interfaces/systemInterfaces";

export class CacheSystem {
  loggedUserUID(): string | null {
    const userId = sessionStorage.getItem("loginUserId");

    if (userId) {
      return userId;
    } else {
      console.warn("No logged user ID found in sessionStorage.");
      return null;
    }
  }

  saveReceivers(receivers: LetterReceiver[]): void {
    console.log("Receivers cached.");
    sessionStorage.setItem("allLetterReceivers", JSON.stringify(receivers));
  }

  readReceivers(): LetterReceiver[] {
    const cachedReceivers = sessionStorage.getItem("allLetterReceivers");
    if (cachedReceivers) {
      console.log("Reading cached receivers.");
      return JSON.parse(cachedReceivers) as LetterReceiver[];
    } else {
      console.log("No cached receivers found.");
      return [];
    }
  }

  readOneReceiver(receiverId: string): LetterReceiver | undefined {
    const cachedReceivers = sessionStorage.getItem("allLetterReceivers");

    if (cachedReceivers) {
      console.log(`Reading cached receiver with ID: ${receiverId}`);

      const receivers: LetterReceiver[] = JSON.parse(cachedReceivers);

      const foundReceiver = receivers.find(
        (receiver) => receiver._id === receiverId
      );

      // Return the found receiver, or undefined if not found
      return foundReceiver;
    } else {
      console.log("No cached receivers found.");
      return undefined;
    }
  }

  saveOpenLetters(letters: OpenLetter[]): void {
    try {
      // Retrieve existing letters from sessionStorage
      const storedLetters = JSON.parse(
        sessionStorage.getItem("openLetters") || "[]"
      );

      // Add new letters to the array
      const updatedLetters = [...storedLetters, ...letters];

      // Save the updated list of letters back to sessionStorage
      sessionStorage.setItem("openLetters", JSON.stringify(updatedLetters));

      console.log("Letters cached in sessionStorage.");
    } catch (error) {
      console.error("Error saving letters to sessionStorage:", error);
    }
  }

  readOpenLetters(letterId: string): OpenLetter | null {
    const cachedLetters = sessionStorage.getItem("openLetters");

    if (cachedLetters) {
      console.log("Reading cached open letters.");

      // Parse the cached letters into an array of OpenLetter
      const letters: OpenLetter[] = JSON.parse(cachedLetters);

      console.log("Looking for letter with ID in cache:", letterId);

      // Find the letter with the given letterId
      const foundLetter = letters.find((letter) => {
        return letter.id === letterId || letter._id === letterId;
      });

      console.log("Found letter - cacheSystem:", foundLetter);
      if (foundLetter) {
        console.log(`Found letter with ID: ${letterId}`);
        return foundLetter;
      } else {
        console.warn(`Letter with ID ${letterId} not found.`);
        return null;
      }
    } else {
      console.log("No cached open letters found.");
      return null;
    }
  }

  updateOneLetter(letterId: string, updatedLetter: OpenLetter): void {
    try {
      const cachedLetters = sessionStorage.getItem("openLetters");

      if (cachedLetters) {
        console.log("Reading cached open letters to update.");

        const letters: OpenLetter[] = JSON.parse(cachedLetters);

        // Find the index of the letter that needs to be updated
        const letterIndex = letters.findIndex(
          (letter) => letter.id === letterId
        );

        if (letterIndex !== -1) {
          // Replace the old letter with the updated one
          letters[letterIndex] = updatedLetter;

          // Save the updated list back to sessionStorage
          sessionStorage.setItem("openLetters", JSON.stringify(letters));

          console.log(`Letter with ID: ${letterId} updated successfully.`);
        } else {
          console.warn(`Letter with ID ${letterId} not found to update.`);
        }
      } else {
        console.warn("No cached open letters found to update.");
      }
    } catch (error) {
      console.error("Error updating letter in sessionStorage:", error);
    }
  }

  deleteOneLetter(letterId: string): void {
    try {
      const cachedLetters = sessionStorage.getItem("openLetters");

      if (cachedLetters) {
        console.log("Reading cached open letters to delete.");

        const letters: OpenLetter[] = JSON.parse(cachedLetters);

        // Filter out the letters with the given letterId
        const updatedLetters = letters.filter(
          (letter) => letter.id !== letterId
        );

        // Save the updated list back to sessionStorage
        sessionStorage.setItem("openLetters", JSON.stringify(updatedLetters));

        console.log(`Letter(s) with ID: ${letterId} deleted.`);
      } else {
        console.warn("No cached open letters found to delete.");
      }
    } catch (error) {
      console.error("Error deleting letter from sessionStorage:", error);
    }
  }
}
