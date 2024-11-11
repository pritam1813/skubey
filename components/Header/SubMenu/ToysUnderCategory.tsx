import React from "react";
import Link from "next/link";
import { Product } from "@/app/types/product";

export interface categoryType {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

const ToysUnderCategory = ({ category }: { category: categoryType }) => {
  return (
    <div className="tw-row-span-1 tw-text-left">
      <ul className="tw-m-0 tw-pl-0">
        <li className="tw-pb-1.2 tw-border-b tw-border-solid tw-border-borderColor">
          <Link
            href={`product?categoryId=${category.id}`}
            className="tw-relative  tw-text-[15px] tw-no-underline tw-text-primary tw-capitalize tw-font-medium"
          >
            {category.name}
          </Link>
        </li>
      </ul>

      <ul className="tw-px-3.75 tw-pt-1.2 tw-list-none tw-capitalize">
        {category.products.slice(0, 7).map((product, index) => (
          <li key={index}>
            <Link
              href="/"
              className="tw-block tw-text-sm tw-text-secondaryLight hover:tw-text-primary tw-relative tw-no-underline tw-py-1.2 tw-font-normal"
            >
              <span className="tw-w-1 tw-h-1 tw-bg-primaryHover tw-mr-1.5 tw-absolute tw-align-middle tw-top-0 tw-bottom-0 -tw-left-2.5 tw-my-auto"></span>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToysUnderCategory;
