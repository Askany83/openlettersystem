"use client";
import { useEffect } from "react";

export default function LoginUserId({ userUID }: { userUID: string }) {
  useEffect(() => {
    if (userUID) {
      sessionStorage.setItem("loginUserUID", userUID);
    }
  }, [userUID]);

  return null;
}
