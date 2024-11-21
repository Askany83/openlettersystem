import NavButton from "@/components/childComponent/NavButton";

export default function RegisterAndLogin() {
  return (
    <div className="bg-gray-100 p-5">
      <div className="space-x-4">
        <NavButton href="/addLetterSender">Criar Remente</NavButton>
        <NavButton href="/addLetterReceiver">Criar Destinatário</NavButton>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Register and Login</h1>
        <NavButton href="/homepage">Entrar</NavButton>
      </div>
    </div>
  );
}
