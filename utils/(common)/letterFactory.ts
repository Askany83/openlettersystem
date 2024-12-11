import { OpenLetter as OpenLetterInterface } from "@/interfaces/systemInterfaces";

export function createOpenLetterObject(
  letterId: string,
  title: string,
  message: string,
  receiverId: string,
  senderId: string
): OpenLetterInterface {
  return {
    id: letterId,
    title: title,
    content: message,
    receiverId: receiverId, // Required by the interface
    letterReceiver: receiverId, // Optional alternative name
    senderId: senderId, // Required by the interface
    letterSender: senderId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
