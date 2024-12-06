import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LetterReceiver, LetterData } from "@/interfaces/systemInterfaces";
import { getAllLetterReceiversInCache } from "@/services/(cacheMethods)/getAllLetterReceiversInCache";
import { postLetter } from "@/services/(httpMethods)/postLetter";
import { validateField } from "@/utils/validateLetterFields";
import { gzip } from "zlib";
import { promisify } from "util";

export default function useLetterForm() {
  const params = useParams();
  const receiverId = params._id;
  const router = useRouter();
  const [receiver, setReceiver] = useState<LetterReceiver | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchReceiverDetails = async () => {
      if (typeof receiverId === "string") {
        const receiverData = await getAllLetterReceiversInCache(receiverId);
        if (receiverData) {
          setReceiver(receiverData);
        } else {
          setError("Failed to fetch receiver data");
        }
      } else {
        setError("Invalid receiver ID");
      }
    };

    if (receiverId) {
      fetchReceiverDetails();
    }
  }, [receiverId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validationError = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: validationError,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!receiverId || Array.isArray(receiverId)) {
      setError("Invalid receiver ID");
      setIsSubmitting(false);
      return;
    }

    const titleError = validateField("title", formData.title);
    const messageError = validateField("message", formData.message);

    if (titleError || messageError) {
      setValidationErrors({
        title: titleError,
        message: messageError,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const gzipAsync = promisify(gzip);
      const compressedMessage = await gzipAsync(Buffer.from(formData.message));
      const base64Message = compressedMessage.toString("base64");

      const letterData: LetterData = {
        title: formData.title,
        message: `data:application/gzip;base64,${base64Message}`,
        letterReceiverId: receiverId,
        letterSenderId: "673f7b91233a733fa2872709",
      };

      await postLetter(letterData);
      const savedLetters = JSON.parse(
        sessionStorage.getItem("myLetters") || "[]"
      );
      const _id = savedLetters[savedLetters.length - 1]._id;
      alert("Carta Aberta submetida!");
      setFormData({ title: "", message: "" });
      await router.push(`/readOpenLetterNumber/${_id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while sending the letter"
      );
      setIsSubmitting(false);
    }
  };

  return {
    receiver,
    formData,
    error,
    isSubmitting,
    validationErrors,
    handleInputChange,
    handleSubmit,
  };
}
