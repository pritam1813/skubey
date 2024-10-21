import React, { forwardRef } from "react";
import ProductsThumbnail, {
  ProductThumbnailProps,
} from "@/components/Products/ProductsThumbnail";
import { useCategoryWiseProducts } from "@/app/hooks/CategoryWiseProducts";

type CategorySection = {
  category: string;
  title?: string;
};

const SECTIONS: CategorySection[] = [
  { category: "featured", title: "Popular Products" },
  { category: "bestseller", title: "Bestseller Products" },
  { category: "latest", title: "Latest Products" },
];

const SubMenuThree = forwardRef<HTMLDivElement>((_, ref) => {
  // Fetch all data in parallel
  const results = SECTIONS.map(({ category }) =>
    useCategoryWiseProducts(category)
  );

  // Check for loading state
  if (results.some((result) => result.isLoading)) {
    return <div className="tw-p-4">Loading...</div>;
  }

  // Check for errors
  const errors = results.filter((result) => result.isError);
  if (errors.length > 0) {
    return (
      <div className="tw-p-4 tw-text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="tw-bg-secondary lg:tw-p-5 max-lg:tw-pt-5 lg:tw-shadow-headerItems lg:tw-w-[900px]"
    >
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-grid-flow-row tw-gap-4">
        {SECTIONS.map(({ category, title }, sectionIndex) => (
          <div key={sectionIndex}>
            <span className="tw-text-left tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2 tw-capitalize">
              {title || `${category} products`}
            </span>
            {results[sectionIndex].data.products
              .slice(0, 3)
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
});

SubMenuThree.displayName = "SubMenuThree";

export default SubMenuThree;
