"use client";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import RenderFullName from "@/components/childComponent/RenderFullName";
import Spinner from "@/components/childComponent/Spinner";
import TitleInput from "@/components/childComponent/TitleInput";
import MessageInput from "@/components/childComponent/MessageInput";
import SubmitFormButton from "@/components/childComponent/SubmitFormButton";
import useEditLetterForm from "@/hooks/useEditLetterForm";

export default function EditLetterForm({ letterId }: { letterId: string }) {
  const {
    formData,
    letterData,
    isFetching,
    isSubmitting,
    validationErrors,
    error,
    handleInputChange,
    handleSubmit,
  } = useEditLetterForm(letterId);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!letterData || !letterData.letter || !letterData.receiver) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carta Aberta não foi encontrada!</p>
      </div>
    );
  }

  const { receiver } = letterData;

  return (
    <div className="p-5 mx-auto">
      {isSubmitting ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-row items-center gap-4 w-96">
            <RenderProfilePic />
            <RenderFullName {...receiver} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
