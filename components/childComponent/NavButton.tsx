import Link from "next/link";

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavButton({
  href,
  children,
  className = "",
}: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
