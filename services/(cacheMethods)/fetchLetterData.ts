import { CacheSystem } from "@/utils/cacheSystem";
import { OpenLetter } from "@/interfaces/systemInterfaces";
import { LetterReceiver } from "@/interfaces/systemInterfaces";

export const fetchLetterData = async (
  letterId: string,
  setLetter: React.Dispatch<React.SetStateAction<OpenLetter | null>>,
  setReceiver: React.Dispatch<React.SetStateAction<LetterReceiver | null>>,

  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setUserId: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const cacheSystem = new CacheSystem();

  // Fetch the user ID from the cache system
  const fetchedUserId = cacheSystem.loggedUserUID();
  if (fetchedUserId) {
    setUserId(fetchedUserId);
    console.log("User ID fetched - fetchLetterData:", fetchedUserId);
  } else {
    console.warn("User ID not found in cache system.");
  }

  // Fetch the letter using the letterId
  const fetchedLetter = cacheSystem.readOpenLetters(letterId);

  console.log("Fetched letter - fetchLetterData:", fetchedLetter);

  if (fetchedLetter) {
    setLetter(fetchedLetter);
    console.log("Letter fetched - ReadLetterNumber:", fetchedLetter);
    setMessage(fetchedLetter.content);
    //setSender to fetchedLetter.letterSender or fetchedLetter.senderId

    const fetchedReceiver = fetchedLetter.letterReceiver
      ? cacheSystem.readOneReceiver(fetchedLetter.letterReceiver)
      : undefined;
    console.log("Letter fetched - receiverId:", fetchedLetter.letterReceiver);

    if (fetchedReceiver) {
      setReceiver(fetchedReceiver);
      console.log("Receiver fetched - ReadLetterNumber:", fetchedReceiver);
    }
  } else {
    console.warn(`Letter with ID ${letterId} not found.`);
  }
  setIsLoading(false);
};
