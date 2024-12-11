import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import ReceiverCard from "@/components/parentComponent/ReceiverCard";
import BackgroundImageAfterLogin from "@/components/childComponent/BackgroundImageAfterLogin";

export default function AllLetterReceivers() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <BackgroundImageAfterLogin />

      {/* Content Wrapper */}
      <div className="absolute top-0 left-0 right-0 bottom-0  p-5">
        <div className="flex flex-row gap-x-4">
          <LogoutButton />
          <NavButton href="/homepage">Início</NavButton>
        </div>

        <div className="flex flex-col items-center justify-start">
          <h1 className="text-2xl font-bold mb-4">Destinatários</h1>
          <br />
          <ReceiverCard />
        </div>
      </div>
    </div>
  );
}
