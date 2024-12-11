"use client";
import { useState } from "react";
// import { deleteLetter } from "@/services/(httpMethods)/deleteLetter";
import { useRouter } from "next/navigation";
import { OpenLetter } from "@/utils/openLetter";

export default function EditDeleteLetterButton({
  letterId,
}: {
  letterId: string;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = () => {
    console.log("Edit button clicked");
    router.push(`/editLetterNumber/${letterId}`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Tem a certeza que quer apagar esta Carta Aberta?"
    );

    if (!isConfirmed) {
      return;
    }
    setErrorMessage(null);
    console.log("Attempting to delete");

    try {
      // Create an OpenLetter instance
      const openLetter = new OpenLetter(letterId, "", "", "", "");

      // Call the deleteOne method
      const error = await openLetter.deleteOne();

      if (error) {
        setErrorMessage(error);
      } else {
        router.push("/allLetterReceivers");
      }
    } catch (error) {
      console.error("Error in deleting letter:", error);
      setErrorMessage("Erro ao apagar a carta.");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 min-w-[100px] text-center"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 min-w-[100px] text-center"
        >
          Delete
        </button>
      </div>
      {errorMessage && (
        <div className="flex justify-center">
          <p className="text-red-500 mt-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
