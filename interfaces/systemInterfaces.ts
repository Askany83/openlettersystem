export interface LoginFormData {
  name: string;
  password: string;
}

export interface OpenLetter {
  id: string;
  title: string;
  content: string;
  receiverId: string;
  letterReceiver?: string;
  senderId: string;
  letterSender?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  message?: string;
  _id?: string;
}

export interface TitleInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MessageInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface LetterFormProps {
  receiver: LetterReceiver;
}

export interface FormattedDateProps {
  updatedAt: string | Date;
}

export interface EditLetterFormProps {
  letterId: string;
}

export interface ViewLetterReceiverProps {
  receiverId: string;
}

export interface OpenLetterInterface {
  id: string;
  title: string;
  senderId: string;
  letterSender?: string;
  receiverId: string;
  letterReceiverId?: string;
  content: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  _id?: string;
  message?: string;
}

// from here down check if they are used

export interface LetterReceiver {
  _id: string;
  name: string;
  surname: string;
  job?: string;
  imageUrl?: string;
}

export interface LetterData {
  _id?: string;
  title: string;
  message: string;
  letterReceiverId: string;
  letterSenderId: string;
  updatedAt?: string;
}
