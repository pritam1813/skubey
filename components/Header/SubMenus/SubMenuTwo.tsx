import ProductsThumbnail from "@/components/Products/ProductsThumbnail";
import { CategoryWiseToys } from "@/data/categories";
import { ProductsData } from "@/data/products";
import Link from "next/link";
import React, { forwardRef } from "react";
import Image from "next/image";

const SubMenu2 = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div
      ref={ref}
      className="tw-bg-secondary lg:tw-p-5  lg:tw-shadow-headerItems lg:tw-w-[900px]"
    >
      <div className="tw-grid  tw-grid-cols-1 lg:tw-grid-cols-3 tw-grid-flow-row lg:tw-gap-4">
        <div
          id="product thumb col"
          className="tw-space-y-4 tw-text-left max-lg:tw-pt-3"
        >
          <span className="tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2">
            Special Products
          </span>
          {ProductsData.slice(0, 3).map((product, index) => (
            <ProductsThumbnail key={index} product={product} />
          ))}
        </div>
        <div
          id="category 1"
          className="tw-space-y-4 tw-text-left max-lg:tw-pt-5"
        >
          <span className="tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2">
            {CategoryWiseToys[0].title}
          </span>
          <ul className="tw-m-0 tw-p-0">
            {CategoryWiseToys[0].toys.slice(0, 5).map((toy, index) => (
              <li key={index}>
                <Link
                  href={`/product/${toy}`}
                  className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-py-1.2 tw-text-sm tw-no-underline"
                >
                  {toy}
                </Link>
              </li>
            ))}
          </ul>
          <Image
            src="/images/banners/category_banner1.jpg"
            alt="Category banner 1"
            width={267}
            height={80}
          />
        </div>
        <div
          id="category 2"
          className="tw-space-y-4 tw-text-left max-lg:tw-pt-5"
        >
          <span className="tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2">
            {CategoryWiseToys[1].title}
          </span>
          <ul className="tw-m-0 tw-p-0">
            {CategoryWiseToys[1].toys.slice(0, 3).map((toy, index) => (
              <li key={index}>
                <Link
                  href={`/product/${toy}`}
                  className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-py-1.2 tw-text-sm tw-no-underline"
                >
                  {toy}
                </Link>
              </li>
            ))}
          </ul>
          <Image
            src="/images/banners/category_banner1.jpg"
            alt="Category banner 1"
            width={267}
            height={80}
          />
        </div>
      </div>
    </div>
  );
});

export default SubMenu2;
