import LoginUserId from "@/components/childComponent/LoginUserId";
import NavButton from "@/components/childComponent/NavButton";

export default function RegisterAndLogin() {
  // There are two buttons that are commented
  // It's not a good way to do it
  // But it's a quick way to add new letter sender and receiver

  const userUID = "673f7b91233a733fa2872709";

  return (
    <div className="bg-gray-100 p-5">
      <div className="space-x-4">
        {/* <NavButton href="/addLetterSender">Criar Remente</NavButton>
        <NavButton href="/addLetterReceiver">Criar Destinatário</NavButton> */}
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Register and Login</h1>
        <LoginUserId userUID={userUID} />
        <NavButton href="/homepage">Entrar</NavButton>
      </div>
    </div>
  );
}
