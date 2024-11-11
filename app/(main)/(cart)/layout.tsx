import React, { ReactNode } from "react";
import Bradcrumb from "@/components/Breadcrumb/Bradcrumb";
import ProductSidebar from "@/components/SidebarMenu/ProductSidebar";

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Bradcrumb />
      <div className="container">
        <div className="row">
          <ProductSidebar />
          {children}
        </div>
      </div>
    </main>
  );
}
