"use client";
import NavButton from "@/components/childComponent/NavButton";
import LogoutButton from "@/components/childComponent/LogoutButton";
import BackgroundImageAfterLogin from "@/components/childComponent/BackgroundImageAfterLogin";
import ReadLetterNumber from "@/components/parentComponent/ReadLetterNumber";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LetterReceiver } from "@/interfaces/systemInterfaces";

export default function ReadOpenLetterNumber() {
  const { _id } = useParams();
  const [receiver, setReceiver] = useState<LetterReceiver | null>(null);
  console.log("Letter ID - page:", _id);

  const handleReceiverLoaded = (receiverData: LetterReceiver | null) => {
    setReceiver(receiverData);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <BackgroundImageAfterLogin />

      {/* Foreground content */}
      <div className="relative z-10 p-5 min-h-screen">
        <div className="flex flex-row gap-x-4">
          <LogoutButton />
          <NavButton className="w-36" href="/allLetterReceivers">
            Destinatários
          </NavButton>
          {receiver && (
            <NavButton
              href={`/viewReceiverNumber/${receiver._id}`}
              className="w-36"
            >
              Ver destinatário
            </NavButton>
          )}
        </div>
        <div className="flex flex-col items-center justify-Start min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Carta Aberta nº {_id}</h1>
          <ReadLetterNumber
            _id={_id as string}
            onReceiverLoaded={handleReceiverLoaded}
          />
        </div>
      </div>
    </div>
  );
}
