export interface LetterReceiver {
  _id: string;
  name: string;
  surname: string;
  job: string;
  imageUrl: string;
}

export interface LetterData {
  title: string;
  message: string;
  letterReceiverId: string;
  letterSenderId: string;
}
