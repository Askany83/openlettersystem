"use client";
import { useState, useEffect } from "react";
import RenderFullName from "@/components/childComponent/RenderFullName";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import EditDeleteLetterButton from "@/components/childComponent/EditDeleteLetterButtons";
import FormattedDate from "@/components/childComponent/FormattedDate";
import Spinner from "@/components/childComponent/Spinner";
import { LetterReceiver } from "@/interfaces/systemInterfaces";
import { OpenLetter } from "@/interfaces/systemInterfaces";
import { fetchLetterData } from "@/services/(cacheMethods)/fetchLetterData";

export default function ReadLetterNumber({
  _id,
  onReceiverLoaded,
}: {
  _id: string;
  onReceiverLoaded: (receiver: LetterReceiver | null) => void; // New prop to pass receiver data up
}) {
  const letterId = _id;
  const [letter, setLetter] = useState<OpenLetter | null>(null);
  const [receiver, setReceiver] = useState<LetterReceiver | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLetterData(
      letterId,
      setLetter,
      setReceiver,
      setMessage,
      setUserId,
      setIsLoading
    );
  }, [letterId]);

  useEffect(() => {
    if (receiver) {
      onReceiverLoaded(receiver);
    }
  }, [receiver, onReceiverLoaded]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden w-full md:w-1/2 mx-auto">
          <div className="flex justify-center ">
            <div className="flex flex-row items-center gap-4 w-96 bg-white">
              <RenderProfilePic />
              {receiver && (
                <RenderFullName
                  _id={receiver._id}
                  name={receiver.name}
                  surname={receiver.surname}
                  job={receiver.job}
                />
              )}
            </div>
          </div>
          <div className="mt-4 mb-4 p-5">
            <h2 className="text-xl font-bold">{letter?.title}</h2>
            <br />
            {letter?.updatedAt && (
              <FormattedDate updatedAt={letter.updatedAt} />
            )}
            <br />
            <p>{message || "A carregar..."}</p>
          </div>
          <br />
          <div className="flex justify-center pb-4">
            {(letter?.senderId === userId ||
              letter?.letterSender === userId) && (
              <EditDeleteLetterButton letterId={letter.id as string} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
