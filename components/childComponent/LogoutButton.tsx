"use client";
import Link from "next/link";

export default function LogoutButton() {
  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <Link
      href="/"
      onClick={handleLogout}
      className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
    >
      Logout
    </Link>
  );
}
