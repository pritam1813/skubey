import React from "react";
import { Category } from "@/app/types/category";
import Link from "next/link";

interface CategoryMenu extends Category {
  children: CategoryMenu[];
}

// To do
// utilise children to display subcategories using AnimateHeight
// (eg. category.children.length > 0 ? <animateheight><animateheight>: <Link></Link>)

const CategorySidebarMenuItems = ({
  categories,
}: {
  categories: CategoryMenu[];
}) => {
  return categories
    .filter((category) => category.name !== "Uncategorized")
    .slice(0, 15)
    .map((category, index) => (
      <li key={index}>
        <Link
          href={`/product?categoryId=${category.id}`}
          className={`${
            index === 0 ? "-tw-mt-1 tw-pb-2" : "tw-py-2"
          } tw-no-underline tw-text-sm tw-capitalize tw-transition-all tw-duration-300 tw-text-secondaryLight hover:tw-text-primary tw-relative tw-block`}
        >
          {category.name}
        </Link>
      </li>
    ));
};

export default CategorySidebarMenuItems;
