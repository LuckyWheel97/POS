import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "POS ATK PrintShop",
  description: "Sistem Kasir Digital ATK & Percetakan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pl-64 min-h-screen">
          <div className="p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
