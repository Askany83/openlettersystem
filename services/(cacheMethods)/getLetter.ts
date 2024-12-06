import { LetterData, LetterReceiver } from "@/interfaces/systemInterfaces";
import { getAllLetterReceiversInCache } from "./getAllLetterReceiversInCache";
import { promisify } from "util";
import { gunzip } from "zlib";

export const getLetter = async (
  _id: string,
  setLetter: React.Dispatch<React.SetStateAction<LetterData | null>>,
  setDecodedMessage: React.Dispatch<React.SetStateAction<string>>,
  setReceiver: React.Dispatch<React.SetStateAction<LetterReceiver | null>>,
  setSender: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    const openLettersOfReceiver = sessionStorage.getItem(
      "openLettersOfReceiver"
    );

    console.log(
      "Attempting to find open letters of receiver in sessionStorage:",
      openLettersOfReceiver
    );

    if (openLettersOfReceiver) {
      const parsedOpenLetters = JSON.parse(openLettersOfReceiver);

      for (const receiverData of parsedOpenLetters) {
        const foundLetter = receiverData.data.find(
          (letter: LetterData) => letter._id === _id
        );

        if (foundLetter) {
          // Letter found in sessionStorage
          setLetter(foundLetter);

          // Extract base64 data from message and decompress it
          const base64Data = foundLetter.message.split(",")[1];
          const compressedData = Buffer.from(base64Data, "base64");

          const gunzipAsync = promisify(gunzip);
          const decompressedBuffer = await gunzipAsync(compressedData);
          const decodedMessage = decompressedBuffer.toString();

          // Set the decoded message
          setDecodedMessage(decodedMessage);

          // Set the receiver based on the letterReceiverId, ensuring all required properties are present
          getAllLetterReceiversInCache(receiverData.letterReceiverId).then(
            (receiver) => {
              setReceiver(receiver);
            }
          );

          // Set the sender of the letter
          setSender(foundLetter.letterSender);

          console.log("Letter found in sessionStorage:", foundLetter);
          return;
        }
      }
    }

    // If we reach here, the letter was not found in sessionStorage either
    console.log("Letter not found in sessionStorage");
    setLetter(null);
    setDecodedMessage("");
    setReceiver(null);
    setSender(null);
  } catch (error) {
    console.error("Error fetching and decoding the letter:", error);
    setLetter(null);
    setDecodedMessage("");
    setReceiver(null);
    setSender(null);
  } finally {
    setLoading(false);
  }
};
