import { LetterReceiver } from "@/interfaces/systemInterfaces";
import { fetchReceivers } from "@/services/(httpMethods)/fetchReceivers";

export class ReceiverService {
  private receivers: LetterReceiver[] = [];

  async viewAllReceivers(
    setReceivers: React.Dispatch<React.SetStateAction<LetterReceiver[]>>
  ): Promise<void> {
    await fetchReceivers(setReceivers);
    console.log("Receivers- class:", this.receivers);
  }

  // viewOneReceiver(receiverId: string): Receiver | undefined {
  //   const receiver = this.receivers.find((r) => r["userId"] === receiverId);
  //   console.log(`Displaying receiver with ID: ${receiverId}`, receiver);
  //   return receiver;
  // }
}
