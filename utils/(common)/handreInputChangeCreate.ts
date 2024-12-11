import { OpenLetter } from "@/interfaces/systemInterfaces";
import { validateField } from "@/utils/(common)/validateLetterFields";
import { Dispatch, SetStateAction } from "react";

export default function handleInputChangeCreate(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setLetter: Dispatch<SetStateAction<OpenLetter>>,
  setValidationErrors: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | undefined }>
  >
) {
  const { name, value } = e.target;

  // Update the letter state
  setLetter((prevLetter) => ({
    ...prevLetter,
    [name]: value,
  }));

  // Validate the field and update validation errors
  const validationError = validateField(name, value);
  setValidationErrors((prev) => ({
    ...prev,
    [name]: validationError,
  }));
}
