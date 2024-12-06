"use client";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import RenderFullName from "@/components/childComponent/RenderFullName";
import Spinner from "@/components/childComponent/Spinner";
import TitleInput from "@/components/childComponent/TitleInput";
import MessageInput from "@/components/childComponent/MessageInput";
import SubmitFormButton from "@/components/childComponent/SubmitFormButton";
import useLetterForm from "@/hooks/useLetterForm";

export default function LetterForm() {
  const {
    receiver,
    formData,
    error,
    isSubmitting,
    validationErrors,
    handleInputChange,
    handleSubmit,
  } = useLetterForm();

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
