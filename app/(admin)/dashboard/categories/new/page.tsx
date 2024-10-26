import { Metadata } from "next";
import CategoryManagement from "@/components/DashboardUI/CategoryManagement";

export const metadata: Metadata = {
  title: "Add New Category",
  description: "Create a new product category",
};

export default async function NewCategoryPage() {
  return (
    <div className="tw-container tw-py-10 tw-mx-auto tw-text-center">
      {/* <div className="tw-mb-20">
        <h1 className="tw-text-2xl tw-mb-4">Available Categories</h1>
        
        <CategoryList />
      </div>
      <div className="tw-mb-8">
        <p className="tw-text-muted-foreground tw-text-xl">
          Create a new category for your products
        </p>
      </div> */}

      <CategoryManagement />
    </div>
  );
}
