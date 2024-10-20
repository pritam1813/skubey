import { ReactNode } from "react";
import Sidebar from "./component/Sidebar";
import "./accountStyle.scss";
import Bradcrumb from "@/components/Breadcrumb/Bradcrumb";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {/* <Bradcrumb /> */}
      <div className="container">
        <div className="row">
          <Sidebar />
          {children}
        </div>
      </div>
    </main>
  );
}
