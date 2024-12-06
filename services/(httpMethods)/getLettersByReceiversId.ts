import {
  getStoredLetters,
  updateStoredLetters,
} from "@/services/(cacheMethods)/storeAndRecoverLettersArray";

export async function getLettersByReceiverId(letterReceiverId: string) {
  const storedLetters = getStoredLetters(letterReceiverId);

  if (storedLetters) {
    return storedLetters;
  }

  const response = await fetch(`/api/letters?receiverId=${letterReceiverId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch letters");
  }
  const letters = await response.json();
  updateStoredLetters(letterReceiverId, letters);
  return letters;
}
