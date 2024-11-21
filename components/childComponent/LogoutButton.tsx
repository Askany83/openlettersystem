import Link from "next/link";

export default function LogoutButton() {
  return (
    <Link
      href="/"
      className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
    >
      Logout
    </Link>
  );
}
