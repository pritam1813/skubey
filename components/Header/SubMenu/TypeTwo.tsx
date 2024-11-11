"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductThumbnailSkeleton } from "@/components/Skeletons";
import ProductsThumbnail, {
  ProductThumbnailProps,
} from "@/components/Products/ProductsThumbnail";
import Skeleton from "react-loading-skeleton";
import { Product } from "@/app/types";
import { ToyDisplayProps } from "./TypeOne";

const TypeTwo = ({ categoryData }: ToyDisplayProps) => {
  if (!categoryData) return null;

  const isLoading = Object.values(categoryData).some((cat) => cat.isLoading);
  // Check if any category has an error
  const hasError = Object.values(categoryData).some((cat) => cat.isError);
  if (hasError) return <div>Error loading products</div>;

  return (
    <div className="tw-bg-secondary lg:tw-p-5  lg:tw-shadow-headerItems lg:tw-w-[900px]">
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
            : Object.entries(categoryData)[0][1]
                .data.products.slice(0, 3)
                .map((product: ProductThumbnailProps, index: number) => (
                  <ProductsThumbnail key={index} product={product} />
                ))}

          {/* results[0].data.products
                .slice(0, 3)
                .map((product: ProductThumbnailProps, index: number) => (
                  <ProductsThumbnail key={index} product={product} />
                )) */}
        </div>
        <div
          id="category 1"
          className="tw-space-y-4 tw-text-left max-lg:tw-pt-5"
        >
          <span className="tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2">
            {isLoading ? (
              <Skeleton />
            ) : (
              `${Object.entries(categoryData)[1][1].data.name} Toys`
            )}
          </span>
          <ul className="tw-m-0 tw-p-0">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton />
                  </li>
                ))
              : Object.entries(categoryData)[1][1]
                  .data.products.slice(0, 5)
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
            {isLoading ? (
              <Skeleton />
            ) : (
              `${Object.entries(categoryData)[2][1].data.name} Toys`
            )}
          </span>
          <ul className="tw-m-0 tw-p-0">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    <Skeleton />
                  </li>
                ))
              : Object.entries(categoryData)[2][1]
                  .data.products.slice(0, 4)
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
};

export default TypeTwo;
