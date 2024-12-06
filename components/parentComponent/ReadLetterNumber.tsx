"use client";

import { useEffect, useState } from "react";
import Spinner from "@/components/childComponent/Spinner";
import { LetterData, LetterReceiver } from "@/interfaces/systemInterfaces";
import { fetchAndDecodeLetter } from "@/services/(cacheMethods)/fetchAndDecodeLetter";
import RenderProfilePic from "../childComponent/RenderProfilePic";
import EditDeleteLetterButton from "../childComponent/EditDeleteLetterButtons";

interface ReadLetterNumberProps {
  _id: string;
}

export default function ReadLetterNumber({ _id }: ReadLetterNumberProps) {
  const [letter, setLetter] = useState<LetterData | null>(null);
  const [decodedMessage, setDecodedMessage] = useState<string>("");
  const [receiver, setReceiver] = useState<LetterReceiver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLetter = async () => {
      try {
        const {
          letter: foundLetter,
          decodedMessage: message,
          receiver: foundReceiver,
        } = await fetchAndDecodeLetter(_id);
        setLetter(foundLetter);
        setDecodedMessage(message);
        setReceiver(foundReceiver);
      } catch (error) {
        console.error("Error decoding letter:", error);
      } finally {
        setLoading(false);
      }
    };

    getLetter();
  }, [_id]);

  if (loading) {
    return <Spinner />;
  }

  if (!letter || !receiver) {
    return <div>Carta não encontrada</div>;
  }

  const loginUserUID = sessionStorage.getItem("loginUserUID");

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 flex items-center space-x-4 w-1/2 mx-auto">
          <RenderProfilePic />
          <div>
            <h2 className="text-xl font-semibold">
              {receiver.name} {receiver.surname}
            </h2>
            <p className="text-gray-600">{receiver.job}</p>
          </div>
          <br />
        </div>
        <h2 className="text-xl font-semibold">Título: {letter.title}</h2>
        <br />
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{decodedMessage}</p>
        </div>
        <br />
        <div className="flex justify-center">
          {letter.letterSenderId === loginUserUID && (
            <EditDeleteLetterButton letterId={letter._id as string} />
          )}
        </div>
      </div>
    </>
  );
}
