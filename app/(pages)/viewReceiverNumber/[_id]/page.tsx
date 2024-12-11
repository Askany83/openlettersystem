"use client";
import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import BackgroundImageAfterLogin from "@/components/childComponent/BackgroundImageAfterLogin";
import ViewLetterReceiver from "@/components/parentComponent/ViewLetterReceiver";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewReceiverNumber() {
  const { _id } = useParams();
  const [receiverId, setReceiverId] = useState<string | null>(null);

  useEffect(() => {
    if (_id) {
      setReceiverId(Array.isArray(_id) ? _id[0] : _id);
    }
  }, [_id]);

  if (!receiverId) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      {" "}
      <BackgroundImageAfterLogin />
      <div className="absolute inset-0 p-5 z-10">
        {" "}
        <div className="flex flex-row gap-x-4">
          <LogoutButton />
          <NavButton className="w-36" href="/allLetterReceivers">
            Destinatários
          </NavButton>
        </div>
        <div className="flex flex-col items-center justify-start min-h-screen">
          <h1 className="text-2xl font-bold mb-4">
            Destinatário nº {receiverId}
          </h1>
          <ViewLetterReceiver receiverId={receiverId} />
        </div>
      </div>
    </div>
  );
}
