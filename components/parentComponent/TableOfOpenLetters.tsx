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
  const [showOnlyMyLetters, setShowOnlyMyLetters] = useState(false);
  const [sortOption, setSortOption] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [lettersPerPage] = useState(10); // Número de cartas por página
  const loginUserUID = sessionStorage.getItem("loginUserUID");

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const lettersData = await getLettersByReceiverId(letterReceiverId);

        // Filtra as cartas de acordo com a opção "showOnlyMyLetters"
        const filteredLetters = showOnlyMyLetters
          ? lettersData.filter(
              (letter: LetterData) => letter.letterSenderId === loginUserUID
            )
          : lettersData;

        // Ordena as cartas conforme a opção selecionada
        const sortedLetters = filteredLetters.sort(
          (a: LetterData, b: LetterData) => {
            if (sortOption === "date") {
              const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
              const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
              return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            } else {
              const titleA = a.title.toLowerCase();
              const titleB = b.title.toLowerCase();
              return sortOrder === "asc"
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA);
            }
          }
        );

        setLetters(sortedLetters);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [
    letterReceiverId,
    showOnlyMyLetters,
    loginUserUID,
    sortOption,
    sortOrder,
  ]);

  // Lógica para obter as cartas da página atual
  const indexOfLastLetter = currentPage * lettersPerPage;
  const indexOfFirstLetter = indexOfLastLetter - lettersPerPage;
  const currentLetters = letters.slice(indexOfFirstLetter, indexOfLastLetter);

  // Funções de navegação de página
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  if (loading) {
    return (
      <>
        <br />
        <Spinner />
      </>
    );
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
                Filtrar Cartas:
              </span>
              <button
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => setShowOnlyMyLetters(!showOnlyMyLetters)}
              >
                {showOnlyMyLetters
                  ? "Todas as Cartas"
                  : "Apenas as minhas Cartas"}
              </button>
            </div>

            <div className="flex items-center justify-center mt-5">
              <span className="mr-2 font-bold text-xs md:text-sm">
                Ordenar por:
              </span>
              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as "date" | "title")
                }
                className="ml-2 px-3 py-1 border border-gray-300 rounded"
              >
                <option value="date">Data</option>
                <option value="title">Título</option>
              </select>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
              >
                {sortOrder === "asc" ? "Ascendente" : "Descendente"}
              </button>
            </div>

            {letters.length === 0 ? (
              <div className="flex items-center justify-center">
                <br />
                <h1 className="text-xl font-black mt-2 text-gray-900">
                  Sem Cartas Abertas
                </h1>
              </div>
            ) : (
              <>
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
                    {currentLetters.map((letter) => (
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

                {/* Controles de Navegação */}
                <div className="flex justify-center mt-5">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    Anterior
                  </button>
                  <span className="mx-3">{currentPage}</span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage * lettersPerPage >= letters.length}
                    className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    Próxima
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
