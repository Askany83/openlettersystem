import { LetterData } from "@/interfaces/systemInterfaces";

export const postLetter = async (letterData: LetterData): Promise<void> => {
  try {
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

    const { letterId } = await response.json();

    // Save new letter UID to sessionStorage if successful
    const existingLetters = JSON.parse(
      sessionStorage.getItem("myLetters") || "[]"
    );

    existingLetters.push({
      ...letterData,
      _id: letterId,
    });
    sessionStorage.setItem("myLetters", JSON.stringify(existingLetters));
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while sending the letter"
    );
  }
};
