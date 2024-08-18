import type { Metadata } from "next";
import { Merienda } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
