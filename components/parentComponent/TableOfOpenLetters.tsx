"use client";
import { ViewLetterReceiverProps } from "@/interfaces/systemInterfaces";
import { useState, useEffect } from "react";
import { getLettersByReceiverId } from "@/services/(httpMethods)/getLettersByReceiversId";
import { LetterData } from "@/interfaces/systemInterfaces";
import NavButton from "@/components/childComponent/NavButton";
import Spinner from "@/components/childComponent/Spinner";

export default function OpenLettersOfOneReceiver({
  letterReceiverId,
}: ViewLetterReceiverProps) {
  const [letters, setLetters] = useState<LetterData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const lettersData = await getLettersByReceiverId(letterReceiverId);
        setLetters(lettersData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [letterReceiverId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <div className="overflow-y-auto">
        <div className="grid place-items-start h-screen justify-center">
          <div className="p-5 lg:w-[95rem] w-72">
            <div className="divider divider-primary"></div>
            <div className="flex items-center justify-center mb-3 mt-5">
              <span className="mr-2 font-bold text-xs md:text-sm">
                Order by
              </span>
              {/* Add sort/filter options here if needed */}
            </div>

            {letters.length === 0 ? (
              <div className="flex items-center justify-center">
                <h1 className="text-xl font-black mt-2 text-gray-900">
                  Sem Cartas Abertas
                </h1>
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6 text-xs">
                      Título
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs">
                      Data
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs">
                      <div className="text-right">Ação</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {letters.map((letter) => (
                    <tr
                      key={letter._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="py-4 px-6 text-xs">{letter.title}</td>
                      <td className="py-4 px-6 text-xs">
                        {letter.updatedAt
                          ? new Date(letter.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-6 text-xs justify-end">
                        <div className="text-right">
                          <NavButton
                            href={`/readOpenLetterNumber/${letter._id}`}
                            className="w-36"
                          >
                            Ler Carta
                          </NavButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
