import React, { forwardRef } from "react";
import Image from "next/image";
import ToysUnderCategory, { categoryType } from "./ToysUnderCategory";

interface SubMenu1Props {
  CategoryWiseToys: categoryType[];
  columnsCount?: number;
}

const SubMenu1 = forwardRef<HTMLDivElement, SubMenu1Props>(
  ({ CategoryWiseToys, columnsCount = 2 }, ref) => {
    const categoriesPerColumn = Math.ceil(
      CategoryWiseToys.length / columnsCount
    );

    const columns = Array.from({ length: columnsCount }, (_, columnIndex) =>
      CategoryWiseToys.slice(
        columnIndex * categoriesPerColumn,
        (columnIndex + 1) * categoriesPerColumn
      )
    );

    return (
      <div
        ref={ref}
        className={`tw-bg-secondary tw-p-5 tw-shadow-headerItems tw-grid tw-gap-8  tw-w-[900px]`}
        style={{ gridTemplateColumns: `2fr ${" 1fr".repeat(columnsCount)}` }}
      >
        <div className="tw-col-span-1">
          <Image
            src="/images/megamenu/1.jpg"
            alt="Shop Submenu Image"
            width={435}
            height={560}
          />
        </div>
        {columns.map((columnCategories, columnIndex) => (
          <div key={columnIndex} className="tw-col-span-1 tw-grid tw-gap-4 ">
            {columnCategories.map((category, categoryIndex) => (
              <ToysUnderCategory key={categoryIndex} category={category} />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

SubMenu1.displayName = "SubMenu1";

export default SubMenu1;
