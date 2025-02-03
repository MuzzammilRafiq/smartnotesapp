import type { Metadata } from "next";
import "./globals.css";
import { Header } from "~/components/header";
import { logout } from "~/actions/logout";



export const metadata: Metadata = {
  title: "Smart Notes App🤖✨",
  description: "Notes app powerd by AI🤖✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Header logout={logout} />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}