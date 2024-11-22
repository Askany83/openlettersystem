"use client";
import NavButton from "@/components/childComponent/NavButton";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LetterReceiver {
  _id: string;
  name: string;
  surname: string;
  job: string;
  imageUrl: string;
}

export default function AllLetterReceivers() {
  // change href of both links

  const [receivers, setReceivers] = useState<LetterReceiver[]>([]);

  useEffect(() => {
    const fetchReceivers = async () => {
      // Check sessionStorage first
      const cachedData = sessionStorage.getItem("allLetterReceiversInCache");
      if (cachedData) {
        setReceivers(JSON.parse(cachedData));
        return;
      }

      try {
        const response = await fetch("/api/getLetterReceivers");
        const data = await response.json();
        setReceivers(data);

        // Save to sessionStorage after fetching
        sessionStorage.setItem(
          "allLetterReceiversInCache",
          JSON.stringify(data)
        );
      } catch (error) {
        console.error("Error fetching receivers:", error);
        alert("Erro ao buscar destinatários, tente novamente mais tarde.");
      }
    };

    fetchReceivers();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
      {receivers.map((receiver) => (
        <div
          key={receiver._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative w-full h-48">
            <Image
              src="/genericProfilePicture.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              {receiver.name} {receiver.surname}
            </h2>
            <p className="text-gray-600">{receiver.job}</p>
            <div className="flex flex-row gap-4 mt-4 justify-center">
              <NavButton href={`/viewReceiverNumber/${receiver._id}`}>
                Ver destinatário
              </NavButton>
              <NavButton href={`/writeOpenLetterTo/${receiver._id}`}>
                Escrever Carta
              </NavButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
