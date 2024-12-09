import { LetterData } from "@/interfaces/systemInterfaces";

// Function to get the letters from sessionStorage based on receiverId
export function getStoredLetters(
  letterReceiverId: string
): LetterData[] | null {
  const openLettersOfReceiver = JSON.parse(
    sessionStorage.getItem("openLettersOfReceiver") || "[]"
  );
  const storedLetters = openLettersOfReceiver.find(
    (letter: LetterData) => letter.letterReceiverId === letterReceiverId
  );

  if (storedLetters) {
    return storedLetters.data;
  }

  return null;
}

// Function to update sessionStorage with new letters data
export function updateStoredLetters(
  letterReceiverId: string,
  letters: LetterData[]
): void {
  const openLettersOfReceiver = JSON.parse(
    sessionStorage.getItem("openLettersOfReceiver") || "[]"
  );

  openLettersOfReceiver.push({
    data: letters,
  });

  sessionStorage.setItem(
    "openLettersOfReceiver",
    JSON.stringify(openLettersOfReceiver)
  );
}
