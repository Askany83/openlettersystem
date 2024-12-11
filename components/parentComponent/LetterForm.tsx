"use client";
import { useState } from "react";
import { OpenLetter, LetterFormProps } from "@/interfaces/systemInterfaces";
import TitleInput from "@/components/childComponent/TitleInput";
import MessageInput from "@/components/childComponent/MessageInput";
import SubmitFormButton from "@/components/childComponent/SubmitFormButton";
import Spinner from "@/components/childComponent/Spinner";
import handleInputChangeCreate from "@/utils/(common)/handreInputChangeCreate";
import RenderFullName from "@/components/childComponent/RenderFullName";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import { OpenLetter as LetterClass } from "@/utils/openLetter";
import { CacheSystem } from "@/utils/cacheSystem";
import { useRouter } from "next/navigation";

export default function LetterForm({ receiver }: LetterFormProps) {
  const cacheSystem = new CacheSystem();
  const loggedInUserId = cacheSystem.loggedUserUID();

  const router = useRouter();

  const [letter, setLetter] = useState<OpenLetter>({
    id: "", // MongoDB ID
    title: "",
    content: "",
    receiverId: receiver._id,
    senderId: loggedInUserId || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data (add any additional validation logic here)
    if (!letter.title || !letter.content) {
      setValidationErrors({
        title: "Título é obrigatório",
        content: "Mensagem é obrigatória",
      });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create a new instance of the OpenLetter class
      const openLetter = new LetterClass(
        "", // Leave the ID empty because MongoDB will generate it
        letter.title,
        letter.content,
        letter.senderId,
        letter.receiverId
      );

      const createdLetterId = await openLetter.create();

      setLetter({
        id: "",
        title: "",
        content: "",
        receiverId: receiver._id,
        senderId: loggedInUserId || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log("Letter created successfully");
      alert("Carta Aberta criada com sucesso!");
      router.push(`/readOpenLetterNumber/${createdLetterId}`);
    } catch (err) {
      console.error("Error creating letter:", err);
      setError("Failed to send the letter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 mx-auto">
      {isSubmitting ? (
        <div className="flex justify-start items-start h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-row items-center gap-4 w-96 bg-white">
            <RenderProfilePic />
            <RenderFullName {...receiver} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4 ">
            <TitleInput
              name="title"
              value={letter.title}
              onChange={(e) =>
                handleInputChangeCreate(e, setLetter, setValidationErrors)
              }
            />
            {validationErrors.title && (
              <div className="text-red-500 text-sm">
                {validationErrors.title}
              </div>
            )}

            <MessageInput
              name="content"
              value={letter.content}
              onChange={(e) =>
                handleInputChangeCreate(e, setLetter, setValidationErrors)
              }
            />
            {validationErrors.content && (
              <div className="text-red-500 text-sm">
                {validationErrors.content}
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
      )}
    </div>
  );
}
