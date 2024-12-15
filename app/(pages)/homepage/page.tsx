import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import BackgroundImageAfterLogin from "@/components/childComponent/BackgroundImageAfterLogin";

export default function Homepage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <BackgroundImageAfterLogin />

      {/* Content Wrapper */}
      <div className="absolute top-0 left-0 right-0 bottom-0  p-5">
        <LogoutButton />

        <div className="flex flex-col items-center justify-start min-h-screen ">
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden p-5">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Página de Ínicio
            </h1>
            <br />
            <div className="flex flex-col items-center justify-center max-w-96">
              <p className="text-lg text-gray-700 text-center">
                <b>
                  Como <i>Sender</i>, quero
                </b>{" "}
                uma página dedicada onde posso <i>ver os Destinatários</i>{" "}
                existentes na plataforma, <b>para</b> que eu possa{" "}
                <i>interagir</i> com eles através de Cartas Abertas ou consultar
                as Cartas Abertas associadas a cada.
              </p>
              <br />
              <NavButton href="/allLetterReceivers">Destinatários</NavButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
