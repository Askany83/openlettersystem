import { LetterData, LetterReceiver } from "@/interfaces/systemInterfaces";
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
      "Attempting to find open letters of receiver in sessionStorage - openLettersOfReceiver:",
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

          console.log(
            "Letter found in sessionStorage - setFoundLetter 1:",
            foundLetter.letterReceiver
          );

          setReceiver(foundLetter.letterReceiver);

          // Extract base64 data from message and decompress it
          const base64Data = foundLetter.message.split(",")[1];
          const compressedData = Buffer.from(base64Data, "base64");

          const gunzipAsync = promisify(gunzip);
          const decompressedBuffer = await gunzipAsync(compressedData);
          const decodedMessage = decompressedBuffer.toString();

          // Set the decoded message
          setDecodedMessage(decodedMessage);

          // Set the sender of the letter
          setSender(foundLetter.letterSender);

          console.log(
            "Letter found in sessionStorage - openLettersOfReceiver:",
            foundLetter
          );
          return;
        } else {
          //check in sessionStorage.myLetters if !foundLetter in openLettersOfReceiver
          const myLetters = sessionStorage.getItem("myLetters");
          if (myLetters) {
            const parsedMyLetters = JSON.parse(myLetters);
            for (const letterData of parsedMyLetters) {
              if (letterData._id === _id) {
                setLetter(letterData);
                console.log(
                  "Letter found in sessionStorage - myLetters:",
                  letterData
                );
                // Extract base64 data from message and decompress it
                const base64Data = letterData.message.split(",")[1];
                const compressedData = Buffer.from(base64Data, "base64");
                const gunzipAsync = promisify(gunzip);
                const decompressedBuffer = await gunzipAsync(compressedData);
                const decodedMessage = decompressedBuffer.toString();
                setDecodedMessage(decodedMessage);
                setReceiver(letterData.letterReceiverId);
                console.log(
                  "LetterReceiver found in sessionStorage - myLetters:",
                  letterData.letterReceiverId
                );
                setSender(letterData.letterSenderId);
                console.log(
                  "letterSender found in sessionStorage:",
                  letterData.letterSenderId
                );
                return;
              }
            }
          }
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
