import Spinner from "@/components/childComponent/Spinner";
import { ViewLetterReceiverProps } from "@/interfaces/systemInterfaces";
import { useEffect, useState } from "react";
import { CacheSystem } from "@/utils/cacheSystem";
import { OpenLetter } from "@/utils/openLetter";
import { OpenLetterInterface } from "@/interfaces/systemInterfaces";
import { CipherSystem } from "@/utils/cipherSystem";
import RenderProfilePic from "@/components/childComponent/RenderProfilePic";
import RenderFullName from "@/components/childComponent/RenderFullName";
import NavButton from "@/components/childComponent/NavButton";

export default function ViewLetterReceiver({
  receiverId,
}: ViewLetterReceiverProps) {
  console.log("receiverId - comp ViewLetterReceiver", receiverId);
  const [receiverData, setReceiverData] = useState<{
    _id: string;
    name: string;
    surname: string;
    job: string;
  } | null>(null);
  const [letters, setLetters] = useState<OpenLetterInterface[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchReceiverDataAndLetters = async () => {
      if (receiverId) {
        setIsSubmitting(true);
        const cacheSystem = new CacheSystem();

        const receiver = cacheSystem.readOneReceiver(receiverId);
        if (receiver) {
          setReceiverData({
            _id: receiver._id,
            name: receiver.name,
            surname: receiver.surname,
            job: receiver.job || "",
          });
        }

        try {
          const openLetter = new OpenLetter("", "", "", "", receiverId);
          const fetchedLetters = (await openLetter.getAll(
            receiverId
          )) as OpenLetterInterface[];

          console.log(
            "fetchedLetters - comp ViewLetterReceiver",
            fetchedLetters
          );

          const transformedLetters = await Promise.all(
            fetchedLetters.map(async (letter) => {
              let decodedContent = "";
              if (letter.message) {
                // Decompress the message using CipherSystem.decode
                try {
                  decodedContent = await CipherSystem.decode(letter.message);
                } catch (error) {
                  console.error("Error decoding message", error);
                }
              }

              return {
                id: letter._id,
                title: letter.title,
                // message: letter.message,
                content: decodedContent,
                letterSender: letter.letterSender,
                letterReceiver: letter.letterReceiverId,
                createdAt: letter.createdAt,
                updatedAt: letter.updatedAt,
              };
            })
          );

          sessionStorage.setItem(
            "openLetters",
            JSON.stringify(transformedLetters)
          );

          setLetters(fetchedLetters);
        } catch (error) {
          console.error("Error fetching letters", error);
        }

        setIsSubmitting(false);
      }
    };

    fetchReceiverDataAndLetters();
  }, [receiverId]);

  return (
    <div className="p-5 mx-auto">
      {isSubmitting ? (
        <div className="flex justify-center items-start h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-center">
            <div className="flex flex-row items-center gap-4 w-96 bg-white">
              <RenderProfilePic />
              {receiverData && (
                <RenderFullName
                  _id={receiverData._id}
                  name={receiverData.name}
                  surname={receiverData.surname}
                  job={receiverData.job}
                />
              )}
            </div>
          </div>
          <div className="p-5">
            {letters.length > 0 ? (
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
                  {letters.map(
                    (letter) => (
                      console.log("letter - comp ViewLetterReceiver", letter),
                      (
                        <tr
                          key={letter._id || letter.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="py-4 px-6 text-xs">{letter.title}</td>
                          <td className="py-4 px-6 text-xs">
                            {new Date(letter.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6 text-xs justify-end">
                            <div className="text-right">
                              {letter._id ? (
                                <NavButton
                                  href={`/readOpenLetterNumber/${letter._id}`}
                                  className="w-36"
                                >
                                  Ler Carta
                                </NavButton>
                              ) : (
                                <span>Invalid Letter ID</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <b>
                <p className="text-center">
                  Sem Cartas Abertas para este destinatário.
                </p>
              </b>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
