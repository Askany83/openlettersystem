import NavButton from "@/components/childComponent/NavButton";
import LogoutButton from "@/components/childComponent/LogoutButton";
import ReadLetterNumber from "@/components/parentComponent/ReadLetterNumber";

export default async function ReadOpenLetterNumber({
  params,
}: {
  params: { _id: string };
}) {
  return (
    <div className="bg-gray-100 p-5">
      <div className="flex flex-row gap-x-4">
        <LogoutButton />
        <NavButton className="w-36" href="/allLetterReceivers">
          Destinatários
        </NavButton>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          Carta Aberta nº {params._id}
        </h1>

        <ReadLetterNumber _id={params._id} />
      </div>
    </div>
  );
}
