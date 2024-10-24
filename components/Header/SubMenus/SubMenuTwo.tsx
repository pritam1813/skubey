import React, { forwardRef } from "react";
import ProductsThumbnail, {
  ProductThumbnailProps,
} from "@/components/Products/ProductsThumbnail";
import { CategoryWiseToys } from "@/data/categories";

import Link from "next/link";
import Image from "next/image";
import { useCategoryWiseProducts } from "@/app/hooks/CategoryWiseProducts";
import { ProductThumbnailSkeleton } from "@/components/Skeletons";
import Skeleton from "react-loading-skeleton";
import { Product } from "@/app/types";

interface SubmenuTwoProps {
  products: ProductThumbnailProps[];
  isLoading?: boolean;
}
const SECTIONS: string[] = ["featured", "bestseller"];

const SubMenuTwo = forwardRef<HTMLDivElement, SubmenuTwoProps>(
  ({ products, isLoading = false }, ref) => {
    const results = SECTIONS.map((category) =>
      useCategoryWiseProducts(category)
    );

    let categoryIsLoading = results.some((result) => result.isLoading);

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
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <ProductThumbnailSkeleton key={index} />
                ))
              : products
                  .slice(0, 3)
                  .map((product, index) => (
                    <ProductsThumbnail key={index} product={product} />
                  ))}
          </div>
          <div
            id="category 1"
            className="tw-space-y-4 tw-text-left max-lg:tw-pt-5"
          >
            <span className="tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2">
              {categoryIsLoading ? (
                <Skeleton />
              ) : results[0].data == null ? (
                CategoryWiseToys[0].title
              ) : (
                `${results[0].data.categoryName} Toys`
              )}
            </span>
            <ul className="tw-m-0 tw-p-0">
              {categoryIsLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>
                      <Skeleton />
                    </li>
                  ))
                : results[0].data == null
                ? CategoryWiseToys[0].toys.slice(0, 5).map((toy, index) => (
                    <li key={index}>
                      <Link
                        href={`/product/${toy}`}
                        className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-py-1.2 tw-text-sm tw-no-underline"
                      >
                        {toy}
                      </Link>
                    </li>
                  ))
                : results[0].data.products
                    .slice(0, 5)
                    .map((toy: Product, index: number) => (
                      <li key={index}>
                        <Link
                          href={`/product/${toy.id}`}
                          className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-py-1.2 tw-text-sm tw-no-underline"
                        >
                          {toy.name}
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
              {categoryIsLoading ? (
                <Skeleton />
              ) : results[1].data == null ? (
                CategoryWiseToys[1].title
              ) : (
                `${results[1].data.categoryName} Toys`
              )}
            </span>
            <ul className="tw-m-0 tw-p-0">
              {categoryIsLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <li key={index}>
                      <Skeleton />
                    </li>
                  ))
                : results[1].data == null
                ? CategoryWiseToys[1].toys.slice(0, 3).map((toy, index) => (
                    <li key={index}>
                      <Link
                        href={`/product/${toy}`}
                        className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-py-1.2 tw-text-sm tw-no-underline"
                      >
                        {toy}
                      </Link>
                    </li>
                  ))
                : results[1].data.products
                    .slice(0, 3)
                    .map((toy: Product, index: number) => (
                      <li key={index}>
                        <Link
                          href={`/product/${toy.id}`}
                          className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-py-1.2 tw-text-sm tw-no-underline"
                        >
                          {toy.name}
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
  }
);

SubMenuTwo.displayName = "SubMenuTwo";

export default SubMenuTwo;
