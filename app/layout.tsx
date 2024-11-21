import type { Metadata } from "next";
import "./globals.css";

export const roboto = {
  src: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap",
  variable: "--font-roboto",
  weight: "100 700",
};

export const metadata: Metadata = {
  title: "Open Letter System",
  description: "Next.js dockerized Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
