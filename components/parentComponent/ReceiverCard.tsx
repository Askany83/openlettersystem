"use client";
import { ReceiverService } from "@/utils/receiverServices";
import { useState, useEffect } from "react";
import NavButton from "@/components/childComponent/NavButton";
import Spinner from "@/components/childComponent/Spinner";
import RenderFullName from "@/components/childComponent/RenderFullName";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import { LetterReceiver } from "@/interfaces/systemInterfaces";

export default function ReceiverCard() {
  const [receivers, setReceivers] = useState<LetterReceiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReceivers = async () => {
      const receiverService = new ReceiverService();
      await receiverService.viewAllReceivers(setReceivers);
      setIsLoading(false);
    };
    loadReceivers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
      {receivers.map((receiver) => (
        <div
          key={receiver._id}
          className="bg-white/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
        >
          <RenderProfilePic />
          <RenderFullName {...receiver} />

          <div className="flex flex-row gap-4 justify-center pb-4">
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
