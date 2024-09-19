import { ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function MiscLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
}
