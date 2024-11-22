import { LetterReceiver } from "@/interfaces/systemInterfaces";

export const fetchReceivers = async (
  setReceivers: React.Dispatch<React.SetStateAction<LetterReceiver[]>>
) => {
  // Check sessionStorage first
  const cachedData = sessionStorage.getItem("allLetterReceiversInCache");
  if (cachedData) {
    setReceivers(JSON.parse(cachedData));
    return;
  }

  try {
    const response = await fetch("/api/getLetterReceivers");
    const data = await response.json();
    setReceivers(data);

    // Save to sessionStorage after fetching
    sessionStorage.setItem("allLetterReceiversInCache", JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching receivers:", error);
    alert("Erro ao buscar destinatários, tente novamente mais tarde.");
  }
};
