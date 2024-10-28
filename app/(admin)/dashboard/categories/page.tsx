import { redirect } from "next/navigation";
import React from "react";

export default function Categories() {
  redirect("/dashboard/categories/add");
  return <div>Categories</div>;
}
