"use client";
import LogoutButton from "@/components/childComponent/LogoutButton";
import NavButton from "@/components/childComponent/NavButton";
import BackgroundImageAfterLogin from "@/components/childComponent/BackgroundImageAfterLogin";
import EditLetterForm from "@/components/parentComponent/EditLetterForm";
import { useParams } from "next/navigation";

export default function EditLetterNumber() {
  const { letterId } = useParams();
  console.log("Letter ID - editPage:", letterId);

  if (typeof letterId !== "string") {
    return <div>Invalid letter ID</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <BackgroundImageAfterLogin />

      {/* Foreground content */}
      <div className="relative z-10 p-5 min-h-screen">
        <div className="flex flex-row gap-x-4">
          <LogoutButton />
          <NavButton
            className="w-36"
            href={`/readOpenLetterNumber/${letterId}`}
          >
            Cancelar
          </NavButton>
        </div>
        <div className="flex flex-col items-center justify-Start min-h-screen">
          <h1 className="text-2xl font-bold mb-4">
            Editar Carta Aberta nº {letterId}
          </h1>

          <EditLetterForm letterId={letterId} />
        </div>
      </div>
    </div>
  );
}
