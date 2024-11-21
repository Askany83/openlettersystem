import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";

export default function AllLetterReceivers() {
  return (
    <div className="bg-gray-100 p-5">
      <LogoutButton />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Destinatários</h1>
        <NavButton href="/allLetterReceivers">Ver destinatário</NavButton>
        <br />
        <NavButton href="/allLetterReceivers">Escrever Carta</NavButton>
      </div>
    </div>
  );
}
