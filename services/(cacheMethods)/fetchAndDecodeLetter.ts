import { LetterData, LetterReceiver } from "@/interfaces/systemInterfaces";
import { gunzip } from "zlib";
import { promisify } from "util";

export const fetchAndDecodeLetter = async (
  _id: string
): Promise<{
  letter: LetterData | null;
  decodedMessage: string;
  receiver: LetterReceiver | null;
}> => {
  try {
    const storedLetters = JSON.parse(
      sessionStorage.getItem("myLetters") || "[]"
    );
    let foundLetter = storedLetters.find(
      (letter: LetterData) => letter._id === _id
    );

    // If not found in "myLetters", check in "openLettersOfReceiver"
    if (!foundLetter) {
      const openLettersOfReceiver = JSON.parse(
        sessionStorage.getItem("openLettersOfReceiver") || "[]"
      );

      for (const receiverData of openLettersOfReceiver) {
        foundLetter = receiverData.data.find(
          (letter: LetterData) => letter._id === _id
        );
        if (foundLetter) break;
      }
    }

    if (foundLetter) {
      // Extract base64 data
      const base64Data = foundLetter.message.split(",")[1];
      const compressedData = Buffer.from(base64Data, "base64");

      // Decompress the message
      const gunzipAsync = promisify(gunzip);
      const decompressedBuffer = await gunzipAsync(compressedData);
      const decodedMessage = decompressedBuffer.toString();

      // Get receiver data from cache
      const receivers = JSON.parse(
        sessionStorage.getItem("allLetterReceiversInCache") || "[]"
      );
      let receiver = receivers.find(
        (r: LetterReceiver) => r._id === foundLetter.letterReceiverId
      );

      // If receiver is not found in "allLetterReceiversInCache", check in "openLettersOfReceiver"
      if (!receiver) {
        const openLettersOfReceiver = JSON.parse(
          sessionStorage.getItem("openLettersOfReceiver") || "[]"
        );

        for (const receiverData of openLettersOfReceiver) {
          if (receiverData.letterReceiverId === foundLetter.letterReceiverId) {
            receiver = receiverData;
            break; // Exit loop once the receiver is found
          }
        }
      }

      // Ensure receiver has required fields for ReadLetterNumber component
      if (receiver) {
        if (!receiver.name || !receiver.surname || !receiver.job) {
          console.warn("Receiver data missing required fields");
        }
      }

      return {
        letter: foundLetter,
        decodedMessage,
        receiver: receiver || null,
      };
    }

    return {
      letter: null,
      decodedMessage: "",
      receiver: null,
    };
  } catch (error) {
    console.error("Error decoding letter:", error);
    return {
      letter: null,
      decodedMessage: "",
      receiver: null,
    };
  }
};
