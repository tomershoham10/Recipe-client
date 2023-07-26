import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe apps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} text-[#5A4A42]`}
      >
        <NavBar />
        <div className="p-6">{children}</div>
      </body>
    </html>
  );
}
