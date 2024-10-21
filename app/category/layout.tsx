import { ReactNode } from "react";
import CategorySidebar from "./component/CategorySidebar";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {/* <Bradcrumb /> */}
      <div className="container">
        <div className="row">
          <CategorySidebar />
          {children}
        </div>
      </div>
    </main>
  );
}
