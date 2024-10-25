import { Metadata } from "next";
import CategoryForm from "@/components/DashboardUI/CategoryForm";
import { type CategoryFormData } from "@/app/types/category";

export const metadata: Metadata = {
  title: "Add New Category",
  description: "Create a new product category",
};

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function NewCategoryPage() {
  const handleSubmit = async (data: CategoryFormData) => {
    "use server";
    try {
      //   const response = await fetch("/api/categories", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Failed to create category");
      //   }

      //   return response.json();

      await delay(5000);
      console.log(data);
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };
  return (
    <div className="tw-container tw-py-10 tw-mx-auto">
      <div className="tw-mb-8">
        <h1 className="tw-text-3xl tw-font-bold">Add New Category</h1>
        <p className="tw-text-muted-foreground">
          Create a new category for your products
        </p>
      </div>

      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
