"use client";
import LetterForm from "@/components/parentComponent/LetterForm";
import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import BackgroundImageAfterLogin from "@/components/childComponent/BackgroundImageAfterLogin";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LetterReceiver } from "@/interfaces/systemInterfaces";
import { CacheSystem } from "@/utils/cacheSystem";

export default function WriteOpenLetter() {
  const { _id } = useParams();
  console.log("Letter Receiver ID - page:", _id);

  const [receiverId, setReceiverId] = useState<LetterReceiver | null>(null);

  useEffect(() => {
    // Initialize CacheSystem instance
    const cacheSystem = new CacheSystem();

    // Get the receiver data by _id from sessionStorage
    const receiverData = cacheSystem.readOneReceiver(
      Array.isArray(_id) ? _id[0] : _id || ""
    );

    if (receiverData) {
      setReceiverId(receiverData);
    } else {
      console.warn(`Receiver with ID ${_id} not found in sessionStorage.`);
    }
  }, [_id]);
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
        </div>
        <div className="flex flex-col items-center justify-start min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Escrever Carta Aberta</h1>
          {receiverId && <LetterForm receiver={receiverId} />}
        </div>
      </div>
    </div>
  );
}
