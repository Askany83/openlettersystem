import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import LetterReceiversCard from "@/components/parentComponent/LetterReceiversCard";
export default function AllLetterReceivers() {
  return (
    <div className="bg-gray-100 p-5">
      <div className="flex flex-row gap-x-4">
        <LogoutButton />
        <NavButton href="/homepage">Início</NavButton>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Destinatários</h1>
        <LetterReceiversCard />
      </div>
    </div>
  );
}
