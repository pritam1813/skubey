import { ReactNode } from "react";
import Bradcrumb from "@/components/Breadcrumb/Bradcrumb";

export default function MiscLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Bradcrumb />
      {children}
    </main>
  );
}
