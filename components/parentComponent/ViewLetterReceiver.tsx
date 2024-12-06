"use client";
import { useEffect, useState } from "react";
import { getAllLetterReceiversInCache } from "@/services/(cacheMethods)/getAllLetterReceiversInCache";
import { LetterReceiver } from "@/interfaces/systemInterfaces";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import RenderFullName from "@/components/childComponent/RenderFullName";
import TableOfOpenLetters from "@/components/parentComponent/TableOfOpenLetters";
import { ViewLetterReceiverProps } from "@/interfaces/systemInterfaces";

export default function ViewLetterReceiver({
  letterReceiverId,
}: ViewLetterReceiverProps) {
  const [receiver, setReceiver] = useState<LetterReceiver | null>(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      const receiverData = await getAllLetterReceiversInCache(letterReceiverId);
      if (receiverData) {
        setReceiver(receiverData);
      }
    };
    fetchReceiver();
  }, [letterReceiverId]);

  if (!receiver) {
    return null;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="w-64 h-44">
            <RenderProfilePic />
          </div>
          <div>
            <RenderFullName {...receiver} />
          </div>
        </div>
      </div>
      <div>
        <TableOfOpenLetters letterReceiverId={letterReceiverId as string} />
      </div>
    </>
  );
}
