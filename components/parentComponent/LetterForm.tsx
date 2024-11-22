"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LetterReceiver } from "@/interfaces/systemInterfaces";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import RenderFullName from "@/components/childComponent/RenderFullName";
import { getAllLetterReceiversInCache } from "@/services/(cacheMethods)/getAllLetterReceiversInCache";
import Spinner from "@/components/childComponent/Spinner";
import { postLetter } from "@/services/(httpMethods)/postLetter";
import TitleInput from "@/components/childComponent/TitleInput";
import MessageInput from "@/components/childComponent/MessageInput";
import SubmitFormButton from "@/components/childComponent/SubmitFormButton";
import { validateField } from "@/utils/validateLetterFields";

export default function LetterForm() {
  const params = useParams();
  const receiverId = params._id;
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

  // Fetch receiver details from cache
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

    // Real-time validation
    const validationError = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: validationError,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!receiverId || Array.isArray(receiverId)) {
      setError("Invalid receiver ID");
      setIsSubmitting(false);
      return;
    }

    // Validate all fields before submission
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
      const letterData = {
        title: formData.title,
        message: formData.message,
        letterReceiverId: receiverId,
        letterSenderId: "673f7b91233a733fa2872709", // For now, hardcoded sender ID
      };

      // Use the postLetter function
      await postLetter(letterData);
      alert("Carta Aberta submetida!");
      setFormData({ title: "", message: "" });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while sending the letter"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 mx-auto">
      {isSubmitting ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : receiver ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-row items-center gap-4 w-96">
            <RenderProfilePic />
            <RenderFullName {...receiver} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <br />
            <TitleInput value={formData.title} onChange={handleInputChange} />
            {validationErrors.title && (
              <div className="text-red-500 text-sm">
                {validationErrors.title}
              </div>
            )}
            <MessageInput
              value={formData.message}
              onChange={handleInputChange}
            />
            {validationErrors.message && (
              <div className="text-red-500 text-sm">
                {validationErrors.message}
              </div>
            )}
            <SubmitFormButton
              isSubmitting={isSubmitting}
              buttonText="Enviar Carta"
            />
            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
}
