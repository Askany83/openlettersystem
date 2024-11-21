"use client";

import NavButton from "@/components/childComponent/NavButton";
import { useState } from "react";

export default function RegisterAndLogin() {
  const [dbStatus, setDbStatus] = useState<string | null>(null);

  const testDbConnection = async () => {
    try {
      const response = await fetch("/api/dbTest");
      const data = await response.json();
      setDbStatus(data.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      setDbStatus("Failed to connect to MongoDB");
    }
  };
  return (
    <div className="bg-gray-100 p-5">
      <div className="space-x-4">
        <NavButton href="/addLetterSender">Criar Remente</NavButton>
        <NavButton href="/addLetterReceiver">Criar Destinatário</NavButton>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Register and Login</h1>
        <NavButton href="/homepage">Entrar</NavButton>

        <button
          onClick={testDbConnection}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test DB Connection
        </button>
        {dbStatus && <p className="mt-2 text-sm font-semibold">{dbStatus}</p>}
      </div>
    </div>
  );
}
