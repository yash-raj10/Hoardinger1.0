import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModel from "./components/modals/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModel from "./components/modals/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";
import RentModel from "./components/modals/RentModel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hoardinger",
  description: "Hoardinger",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <LoginModel />
        <RentModel />
        <RegisterModel />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
