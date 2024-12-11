import { LetterReceiver } from "@/interfaces/systemInterfaces";
import { CacheSystem } from "@/utils/cacheSystem";

export const fetchReceivers = async (
  setReceivers: React.Dispatch<React.SetStateAction<LetterReceiver[]>>
) => {
  const cacheSystem = new CacheSystem();

  // Check the cache before making an API call
  const cachedReceivers = cacheSystem.readReceivers();
  if (cachedReceivers.length > 0) {
    setReceivers(cachedReceivers);
    console.log("Receivers loaded from cache.");
    return;
  }

  try {
    console.log("Fetching receivers...");
    const response = await fetch("/api/getLetterReceivers");
    const data = await response.json();
    console.log("Fetched receivers - https:", data);
    setReceivers(data);

    // Save to sessionStorage after fetching
    cacheSystem.saveReceivers(data);
  } catch (error) {
    console.error("Error fetching receivers:", error);
    alert("Erro ao buscar destinatários, tente novamente mais tarde.");
  }
};
