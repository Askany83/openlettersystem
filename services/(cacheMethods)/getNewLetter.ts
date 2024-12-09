import { LetterData, LetterReceiver } from "@/interfaces/systemInterfaces";
import { getAllLetterReceiversInCache } from "./getAllLetterReceiversInCache";
import { promisify } from "util";
import { gunzip } from "zlib";

export const getNewLetter = async (
  _id: string,
  setLetter: React.Dispatch<React.SetStateAction<LetterData | null>>,
  setDecodedMessage: React.Dispatch<React.SetStateAction<string>>,
  setReceiver: React.Dispatch<React.SetStateAction<LetterReceiver | null>>,
  setSender: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    // Retrieve 'myLetters' from sessionStorage instead of 'openLettersOfReceiver'
    const myLetters = sessionStorage.getItem("myLetters");

    console.log("Attempting to find my letters in sessionStorage:", myLetters);

    if (myLetters) {
      const parsedMyLetters = JSON.parse(myLetters);

      for (const receiverData of parsedMyLetters) {
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

          // Set the receiver based on the letterReceiverId, if available, or fetch from cache
          if (foundLetter.letterReceiverId) {
            setReceiver(foundLetter.letterReceiverId);
            console.log(
              "letterReceiverId being passed - 1:",
              foundLetter.letterReceiverId
            );
          } else {
            getAllLetterReceiversInCache(receiverData.letterReceiverId).then(
              (receiver) => {
                setReceiver(receiver);
              }
            );
          }

          console.log(
            "letterReceiverId being passed - 2:",
            receiverData.letterReceiverId
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
