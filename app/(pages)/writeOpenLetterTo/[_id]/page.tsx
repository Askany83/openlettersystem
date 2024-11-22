import LetterForm from "@/components/parentComponent/LetterForm";
import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";

export default function WriteOpenLetter() {
  return (
    <div className="bg-gray-100 p-5">
      <div className="flex flex-row gap-x-4">
        <LogoutButton />
        <NavButton className="w-36" href="/allLetterReceivers">
          Destinatários
        </NavButton>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Escrever Carta Aberta</h1>
        <LetterForm />
      </div>
    </div>
  );
}
