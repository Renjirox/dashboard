import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Kacper Stawicki",
  description: "Example dashboard design by Kacper Stawicki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex ${font.className}`}>
        <Navbar />
        <div className="min-h-screen w-full max-h-screen overflow-auto text-gray-800">
          {children}
        </div>
      </body>
    </html>
  );
}
