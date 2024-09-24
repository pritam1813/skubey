import { ReactNode } from "react";
import Sidebar from "./component/Sidebar";
import "./accountStyle.scss";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="container">
        <div className="row">
          <Sidebar />
          {children}
        </div>
      </div>
    </main>
  );
}
