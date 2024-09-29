import React, { forwardRef } from "react";
import { ProductsData } from "@/data/products";
import ProductsThumbnail from "@/components/Products/ProductsThumbnail";

const SubMenu3 = forwardRef<HTMLDivElement>(({}, ref) => {
  const productSubmenuArray = ["popular", "bestseller", "latest"];
  return (
    <div
      ref={ref}
      className="tw-bg-secondary tw-p-5 tw-shadow-headerItems tw-w-[900px]"
    >
      <div className="tw-grid tw-grid-cols-3 tw-grid-flow-row tw-gap-4">
        {productSubmenuArray.map((productsubmenuTitle, i) => (
          <span
            key={i}
            className="tw-text-left tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2 tw-capitalize"
          >
            {`${productsubmenuTitle} products`}
          </span>
        ))}
        {ProductsData.slice(0, 9).map((product, index) => (
          <div key={index}>
            <ProductsThumbnail product={product} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default SubMenu3;
