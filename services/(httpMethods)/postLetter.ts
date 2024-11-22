import { LetterData } from "@/interfaces/systemInterfaces";

export const postLetter = async (letterData: LetterData): Promise<void> => {
  try {
    // console.log(letterData);
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
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while sending the letter"
    );
  }
};
