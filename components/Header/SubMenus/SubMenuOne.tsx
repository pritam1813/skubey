import React, { forwardRef } from "react";
import Image from "next/image";
import ToysUnderCategory, { categoryType } from "./ToysUnderCategory";

interface SubMenuOneProps {
  CategoryWiseToys: categoryType[];
  columnsCount?: number;
}

const SubMenuOne = forwardRef<HTMLDivElement, SubMenuOneProps>(
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
        className={`tw-bg-secondary max-lg:tw-pt-2.5 lg:tw-p-5 lg:tw-shadow-headerItems tw-grid max-lg:tw-grid-flow-row lg:tw-grid-cols-4 lg:tw-gap-8 lg:tw-w-[900px]`}
        // style={{ gridTemplateColumns: `2fr ${" 1fr".repeat(columnsCount)}` }}
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
            {columnCategories.map((category, categoryIndex) => (
              <ToysUnderCategory key={categoryIndex} category={category} />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

SubMenuOne.displayName = "SubMenuOne";

export default SubMenuOne;
