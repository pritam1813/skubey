"use client";
import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryList, { CategoryItemProps } from "./CategoryList";

const CategoryManagement = () => {
  const [categoryToEdit, setCategoryToEdit] =
    useState<CategoryItemProps | null>(null);
  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
      <CategoryForm categoryToEdit={categoryToEdit} />
      <CategoryList onEditCategory={setCategoryToEdit} />
      {/* <CategoryList /> */}
    </div>
  );
};

export default CategoryManagement;
