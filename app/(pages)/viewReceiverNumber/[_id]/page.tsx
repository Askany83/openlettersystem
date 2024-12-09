import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import ViewLetterReceiver from "@/components/parentComponent/ViewLetterReceiver";

export default function viewReceiverNumber({
  params,
}: {
  params: { _id: string };
}) {
  const letterReceiverId = params._id;
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
          Destinatário nº {letterReceiverId}
        </h1>
        <ViewLetterReceiver letterReceiverId={letterReceiverId} />
      </div>
    </div>
  );
}
