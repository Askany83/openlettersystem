import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import EditLetterForm from "@/components/parentComponent/EditLetterForm";

export default function editLetterNumber({
  params,
}: {
  params: { letterId: string };
}) {
  return (
    <div className="bg-gray-100 p-5">
      <div className="flex flex-row gap-x-4">
        <LogoutButton />
        <NavButton
          className="w-36"
          href={`/readOpenLetterNumber/${params.letterId}`}
        >
          Cancelar
        </NavButton>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          Editar Carta Aberta nº {params.letterId}
        </h1>

        <EditLetterForm letterId={params.letterId} />
      </div>
    </div>
  );
}
