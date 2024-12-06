"use client";
import { useState, useEffect } from "react";
import { LetterData, LetterReceiver } from "@/interfaces/systemInterfaces";
import { fetchAndDecodeLetter } from "@/services/(cacheMethods)/fetchAndDecodeLetter";
import { gzip } from "zlib";
import { promisify } from "util";
import { updateLetterInSessionStorage } from "@/services/(cacheMethods)/updateLetter";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  message: string;
}

interface ValidationErrors {
  title?: string;
  message?: string;
}

export default function useEditLetterForm(letterId: string) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    message: "",
  });
  const [letterData, setLetterData] = useState<{
    letter: LetterData | null;
    decodedMessage: string;
    receiver: LetterReceiver | null;
  } | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLetterData = async () => {
      setIsFetching(true);
      const data = await fetchAndDecodeLetter(letterId);
      setLetterData(data);
      if (data.letter) {
        setFormData({
          title: data.letter.title,
          message: data.decodedMessage,
        });
      }
      setIsFetching(false);
    };

    fetchLetterData();
  }, [letterId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const errors: ValidationErrors = {};
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const gzipAsync = promisify(gzip);
      const compressedMessage = await gzipAsync(Buffer.from(formData.message));
      const base64Message = compressedMessage.toString("base64");

      const response = await fetch(`/api/editLetter?letterId=${letterId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          message: `data:application/gzip;base64,${base64Message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the letter");
      }

      const result = await response.json();
      alert("Carta Aberta editada com sucesso!");

      // Update sessionStorage after successful update
      updateLetterInSessionStorage(letterId, {
        title: formData.title,
        message: base64Message,
      });

      router.push(`/readOpenLetterNumber/${letterId}`);
      return result;
    } catch (error: unknown) {
      setError(
        `An error occurred while saving the letter: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    letterData,
    isFetching,
    isSubmitting,
    validationErrors,
    error,
    handleInputChange,
    handleSubmit,
  };
}
