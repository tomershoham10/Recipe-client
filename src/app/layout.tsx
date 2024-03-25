import "./globals.css";
import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import NavBar from "@/components/NavBar/page";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe apps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"he"} dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${assistant.className} text-[#5A4A42]`}
      >
        <NavBar />
        <section className="p-6 text-recipeGray-darker">{children}</section>
      </body>
    </html>
  );
}
