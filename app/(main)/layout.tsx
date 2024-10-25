import React, { ReactNode } from "react";
import Bradcrumb from "@/components/Breadcrumb/Bradcrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Topbar from "@/components/Topbar";
import "../main.scss";
import "animate.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <Header />
      {/* <Bradcrumb /> */}
      {children}
      <Footer />
    </>
  );
}
