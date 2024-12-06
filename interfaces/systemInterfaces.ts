export interface LetterReceiver {
  _id: string;
  name: string;
  surname: string;
  job: string;
  imageUrl: string;
}

export interface LetterData {
  _id?: string;
  title: string;
  message: string;
  letterReceiverId: string;
  letterSenderId: string;
  updatedAt?: string;
}

export interface ViewLetterReceiverProps {
  letterReceiverId: string;
}
