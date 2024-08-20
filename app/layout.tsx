import type { Metadata } from "next";
import { Merienda } from "next/font/google";
import "./globals.css";
import "./main.scss";
import Header from "@/components/Header";
import Topbar from "@/components/Topbar";

const merienda = Merienda({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skubey",
  description: "Best toy store for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={merienda.className}>
        <Topbar />
        <Header />
        {children}
      </body>
    </html>
  );
}
