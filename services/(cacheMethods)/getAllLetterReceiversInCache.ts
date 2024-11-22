import { LetterReceiver } from "@/interfaces/systemInterfaces";

export const getAllLetterReceiversInCache = async (
  receiverId: string
): Promise<LetterReceiver | null> => {
  try {
    const cachedData = sessionStorage.getItem("allLetterReceiversInCache");
    if (!cachedData) {
      throw new Error("No cached data found");
    }
    const allReceivers: LetterReceiver[] = JSON.parse(cachedData);
    const receiverData = allReceivers.find(
      (r: LetterReceiver) => r._id === receiverId
    );

    if (!receiverData) {
      throw new Error("Receiver not found in cache");
    }

    return receiverData;
  } catch (error) {
    console.error("Error getting receiver details from cache:", error);
    return null;
  }
};
