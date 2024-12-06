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
    const foundLetter = storedLetters.find(
      (letter: LetterData) => letter._id === _id
    );

    if (foundLetter) {
      // Extract base64 data
      const base64Data = foundLetter.message.split(",")[1];
      const compressedData = Buffer.from(base64Data, "base64");

      // Decompress the message
      const gunzipAsync = promisify(gunzip);
      const decompressedBuffer = await gunzipAsync(compressedData);
      const decodedMessage = decompressedBuffer.toString();

      // Get receiver data
      const receivers = JSON.parse(
        sessionStorage.getItem("allLetterReceiversInCache") || "[]"
      );
      const receiver = receivers.find(
        (r: LetterReceiver) => r._id === foundLetter.letterReceiverId
      );

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
