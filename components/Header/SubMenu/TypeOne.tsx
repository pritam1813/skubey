"use client";
import React from "react";
import Image from "next/image";
import ToysUnderCategory, { categoryType } from "./ToysUnderCategory";

interface CategoryData {
  data: categoryType;
  isLoading: boolean;
  isError: any;
}

export interface ToyDisplayProps {
  categoryData?: Record<string, CategoryData>;
}

const TypeOne = ({ categoryData }: ToyDisplayProps) => {
  // Guard clause for when categoryData hasn't been injected yet
  if (!categoryData) return null;

  const isLoading = Object.values(categoryData).some((cat) => cat.isLoading);
  // Check if any category has an error
  const hasError = Object.values(categoryData).some((cat) => cat.isError);

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error loading products</div>;

  let columnsCount = 2;
  const categoriesPerColumn = Math.ceil(
    Object.entries(categoryData).length / columnsCount
  );

  const columns = Array.from({ length: columnsCount }, (_, columnIndex) =>
    Object.entries(categoryData).slice(
      columnIndex * categoriesPerColumn,
      (columnIndex + 1) * categoriesPerColumn
    )
  );
  return (
    <div
      className={`tw-bg-secondary max-lg:tw-pt-2.5 lg:tw-p-5 lg:tw-shadow-headerItems tw-grid max-lg:tw-grid-flow-row lg:tw-grid-cols-4 lg:tw-gap-8 lg:tw-w-[900px]`}
    >
      <div className="tw-col-span-1 lg:tw-col-span-2">
        <Image
          src="/images/megamenu/1.jpg"
          alt="Shop Submenu Image"
          width={435}
          height={560}
        />
      </div>

      {columns.map((columnCategories, columnIndex) => (
        <div
          key={columnIndex}
          className="tw-col-span-1 max-lg:tw-pt-2.5 tw-grid tw-gap-4 "
        >
          {columnCategories.map(([category, { data }], categoryIndex) => (
            <ToysUnderCategory key={categoryIndex} category={data} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TypeOne;
