import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/modals/Modal";
import RegisterModel from "./components/modals/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider/>
        <RegisterModel/>
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}
