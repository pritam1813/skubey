import React from "react";

import ProductTable from "@/components/DashboardUI/ProductTable";

export default async function Product() {
  // const result = await fetch("http://localhost:3000/api/products");
  // const data = await result.json();

  return (
    <div>
      <div className="tw-container tw-mx-auto tw-py-8">
        <ProductTable />
      </div>
    </div>
  );
}
