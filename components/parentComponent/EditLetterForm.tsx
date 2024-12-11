"use client";
import { EditLetterFormProps } from "@/interfaces/systemInterfaces";
import { useState, useEffect } from "react";
import { OpenLetter, LetterReceiver } from "@/interfaces/systemInterfaces";
import { fetchLetterData } from "@/services/(cacheMethods)/fetchLetterData";
import { OpenLetter as UpdateOpenLetter } from "@/utils/openLetter";
import { useRouter } from "next/navigation";
import TitleInput from "@/components/childComponent/TitleInput";
import MessageInput from "@/components/childComponent/MessageInput";
import SubmitFormButton from "@/components/childComponent/SubmitFormButton";
import Spinner from "@/components/childComponent/Spinner";
import handleInputChangeEdit from "@/utils/(common)/handleInputChangeEdit";
import RenderFullName from "@/components/childComponent/RenderFullName";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";

export default function EditLetterForm({ letterId }: EditLetterFormProps) {
  const [letter, setLetter] = useState<OpenLetter | null>(null);
  const [receiver, setReceiver] = useState<LetterReceiver | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | undefined;
  }>({
    title: undefined,
    content: undefined,
  });

  const router = useRouter();
  console.log("Letter ID - editForm:", letterId);

  useEffect(() => {
    fetchLetterData(
      letterId,
      setLetter,
      setReceiver,
      setMessage,
      setUserId,
      setIsLoading
    );
  }, [letterId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data (add any additional validation logic here)
    if (!letter?.title || !letter?.content) {
      setValidationErrors({
        title: "Título é obrigatório",
        content: "Mensagem é obrigatória",
      });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const openLetter = new UpdateOpenLetter(
        letterId,
        letter.title,
        letter.content,
        userId || "",
        receiver?._id || ""
      );

      // Call the update method to update the letter
      await openLetter.update();

      console.log("Letter updated successfully");
      alert("Carta Aberta alterada com sucesso!");
      router.push(`/readOpenLetterNumber/${letterId}`);
    } catch (err) {
      console.error("Error updating letter:", err);
      setError("Failed to update the letter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 mx-auto">
      {isSubmitting || isLoading ? (
        <div className="flex justify-start items-start h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-center">
            <div className="flex flex-row items-center gap-4 w-96 bg-white">
              <RenderProfilePic />
              {receiver && (
                <RenderFullName
                  _id={receiver._id}
                  name={receiver.name}
                  surname={receiver.surname}
                  job={receiver.job}
                />
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <TitleInput
              name="title"
              value={letter?.title || ""}
              onChange={(e) =>
                handleInputChangeEdit(e, setLetter, setValidationErrors)
              }
            />
            {validationErrors.title && (
              <div className="text-red-500 text-sm">
                {validationErrors.title}
              </div>
            )}

            <MessageInput
              name="content"
              value={message || ""}
              onChange={(e) =>
                handleInputChangeEdit(
                  e,
                  setLetter,
                  setValidationErrors,
                  setMessage
                )
              }
            />
            {validationErrors.content && (
              <div className="text-red-500 text-sm">
                {validationErrors.content}
              </div>
            )}

            <SubmitFormButton isSubmitting={isSubmitting} buttonText="Salvar" />

            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
