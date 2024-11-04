import { ReactNode } from "react";
import "./accountStyle.scss";
import Bradcrumb from "@/components/Breadcrumb/Bradcrumb";
import InformationSidebar from "@/components/SidebarMenu/InformationSidebar";
import AuthSidebar from "@/components/SidebarMenu/AuthSidebar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Bradcrumb />
      <div className="container">
        <div className="row">
          <aside id="sidebarleft" className="col-sm-3 tw-order-2 lg:tw-order-1">
            <AuthSidebar />
            <InformationSidebar />
          </aside>
          {children}
        </div>
      </div>
    </main>
  );
}
