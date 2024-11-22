"use client";
import NavButton from "@/components/childComponent/NavButton";
import { useState, useEffect } from "react";
import { LetterReceiver } from "@/interfaces/systemInterfaces";
import { fetchReceivers } from "@/services/(httpMethods)/fetchReceivers";
import RenderFullName from "../childComponent/RenderFullName";
import RenderProfilePic from "../childComponent/RenderProfilePic";
import Spinner from "../childComponent/Spinner";

export default function AllLetterReceivers() {
  const [receivers, setReceivers] = useState<LetterReceiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReceivers = async () => {
      await fetchReceivers(setReceivers);
      setIsLoading(false);
    };
    loadReceivers();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
      {receivers.map((receiver) => (
        <div
          key={receiver._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <RenderProfilePic />
          <RenderFullName {...receiver} />
          <div className="flex flex-row gap-4 mt-4 justify-center p-4">
            <NavButton
              href={`/viewReceiverNumber/${receiver._id}`}
              className="w-36"
            >
              Ver destinatário
            </NavButton>
            <NavButton
              href={`/writeOpenLetterTo/${receiver._id}`}
              className="w-36"
            >
              Escrever Carta
            </NavButton>
          </div>
        </div>
      ))}
    </div>
  );
}
