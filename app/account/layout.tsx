import { ReactNode } from "react";
import Sidebar from "./component/Sidebar";
import "./accountStyle.scss";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="container">
        <div className="row">
          <Sidebar />
          <div
            id="content"
            className="col-sm-9 tw-relative tw-min-h-[80vh] tw-text-primary tw-order-1 lg:tw-order-2"
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
