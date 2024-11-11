import React from "react";

import { ProductThumbnailSkeleton } from "@/components/Skeletons";
import ProductsThumbnail, {
  ProductThumbnailProps,
} from "@/components/Products/ProductsThumbnail";
import { ToyDisplayProps } from "./TypeOne";

type CategorySection = {
  category: string;
  title?: string;
};

const SECTIONS: CategorySection[] = [
  { category: "featured", title: "Popular Products" },
  { category: "bestseller", title: "Bestseller Products" },
  { category: "latest", title: "Latest Products" },
];

const TypeThree = ({ categoryData }: ToyDisplayProps) => {
  if (!categoryData) return null;

  const isLoading = Object.values(categoryData).some((cat) => cat.isLoading);
  // Check if any category has an error
  const hasError = Object.values(categoryData).some((cat) => cat.isError);

  if (isLoading)
    return (
      <div className="tw-bg-secondary lg:tw-p-5 max-lg:tw-pt-5 lg:tw-shadow-headerItems lg:tw-w-[900px]">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-grid-flow-row tw-gap-4">
          {SECTIONS.map(({ category, title }, sectionIndex) => (
            <div key={sectionIndex}>
              <span className="tw-text-left tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2 tw-capitalize">
                {title || `${category} products`}
              </span>
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="tw-my-3">
                  <ProductThumbnailSkeleton />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );

  if (hasError)
    return (
      <div className="tw-p-4 tw-text-red-500">
        Error loading products. Please try again later.
      </div>
    );

  return (
    <div className="tw-bg-secondary lg:tw-p-5 max-lg:tw-pt-5 lg:tw-shadow-headerItems lg:tw-w-[900px]">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-grid-flow-row tw-gap-4">
        {SECTIONS.map(({ category, title }, sectionIndex) => (
          <div key={sectionIndex}>
            <span className="tw-text-left tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2 tw-capitalize">
              {title || `${category} products`}
            </span>
            {Object.entries(categoryData)
              [sectionIndex][1].data.products.slice(0, 3)
              .map((product: ProductThumbnailProps, index: number) => (
                <div key={index} className="tw-my-3">
                  <ProductsThumbnail product={product} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeThree;
