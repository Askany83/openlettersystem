import { OpenLetter } from "@/interfaces/systemInterfaces";
import { validateField } from "@/utils/(common)/validateLetterFields";
import { Dispatch, SetStateAction } from "react";

export default function handleInputChangeEdit(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setLetter: Dispatch<SetStateAction<OpenLetter | null>>,
  setValidationErrors: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | undefined }>
  >,
  setMessage?: Dispatch<SetStateAction<string | null>> // Optional setMessage
) {
  const { name, value } = e.target;

  // Update the letter state
  setLetter((prevState) => {
    if (prevState) {
      return { ...prevState, [name]: value };
    }
    return prevState;
  });

  // Update the message if the field is the content/message field
  if (name === "content" && setMessage) {
    setMessage(value); // Update the message state
  }

  // Validate the field and update validation errors
  const validationError = validateField(name, value);
  setValidationErrors((prev) => ({
    ...prev,
    [name]: validationError,
  }));
}
