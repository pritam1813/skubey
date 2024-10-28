import React from "react";
import { redirect } from "next/navigation";

export default async function Product() {
  // const result = await fetch("http://localhost:3000/api/products");
  // const data = await result.json();
  redirect("/dashboard/product/all");
  return <div>ni</div>;
}
