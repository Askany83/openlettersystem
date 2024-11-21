import LogoutButton from "@/components/childComponent/LogoutButton";

export default function AddLetterReceiver() {
  return (
    <div className="bg-gray-100 p-5">
      <LogoutButton />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Criar Destinatário</h1>
      </div>
    </div>
  );
}
