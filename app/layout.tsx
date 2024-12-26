import type { Metadata } from "next";
import { Merienda } from "next/font/google";
import "./globals.css";

const merienda = Merienda({
  variable: "--font-merienda",
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
      <body className={`${merienda.variable} antialiased`}>{children}</body>
    </html>
  );
}
