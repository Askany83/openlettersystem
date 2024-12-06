import { LetterData } from "@/interfaces/systemInterfaces";

export const deleteLetter = async (
  letterId: string
): Promise<string | null> => {
  try {
    const response = await fetch(`/api/deleteLetter/?letterId=${letterId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete letter");
    }

    // Remove letter from sessionStorage
    const existingLetters = JSON.parse(
      sessionStorage.getItem("myLetters") || "[]"
    );
    const updatedLetters = existingLetters.filter(
      (letter: LetterData) => letter._id !== letterId
    );
    sessionStorage.setItem("myLetters", JSON.stringify(updatedLetters));

    alert("Carta Aberta apagada com sucesso!");

    return null;
  } catch (error) {
    console.error("Error deleting letter:", error);
    return "Erro ao apagar a carta.";
  }
};
