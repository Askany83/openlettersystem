import LogoutButton from "@/components/childComponent/LogoutButton";
import LetterSenderForm from "@/components/parentComponent/LetterSenderForm";

export default function AddLetterSender() {
  return (
    <div className="bg-gray-100 p-5">
      <LogoutButton />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Criar Remente</h1>
        <LetterSenderForm />
      </div>
    </div>
  );
}
