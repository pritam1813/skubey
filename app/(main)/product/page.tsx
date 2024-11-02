import { Product } from "@/app/types/product";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import React from "react";

export default async function Products({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  // Convert searchParams object to URLSearchParams
  const queryString = new URLSearchParams();

  // Add each search parameter to the query string
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryString.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => queryString.append(key, v));
    }
  });

  try {
    const response = await fetch(
      `${getBaseUrl()}/api/products?${queryString.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return (
      <div>
        {/* Render your products here */}
        Products of search
        {data.products.map((product: Product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return <div>Error loading products</div>;
  }
}
