import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sophia - Course Design Studio",
  description: "Progetta corsi di formazione con il metodo Understanding by Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
