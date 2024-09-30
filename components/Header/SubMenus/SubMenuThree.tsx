import React, { forwardRef } from "react";
import { ProductsData } from "@/data/products";
import ProductsThumbnail from "@/components/Products/ProductsThumbnail";

const SubMenu3 = forwardRef<HTMLDivElement>(({}, ref) => {
  const productSubmenuArray = ["popular", "bestseller", "latest"];
  let ind = 0;
  return (
    <div
      ref={ref}
      className="tw-bg-secondary lg:tw-p-5 max-lg:tw-pt-5 lg:tw-shadow-headerItems lg:tw-w-[900px]"
    >
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-grid-flow-row tw-gap-4">
        {/* {productSubmenuArray.map((productsubmenuTitle, i = ind) => (
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
        ))} */}

        {productSubmenuArray.map((productsubmenuTitle, i) => (
          <div key={i}>
            <span className="tw-text-left tw-text-primary tw-border-b tw-border-solid tw-border-borderColor tw-text-[15px] tw-font-medium tw-block tw-pb-1.2 tw-capitalize">
              {`${productsubmenuTitle} products`}
            </span>
            {ProductsData.slice(ind, (ind += 3)).map((product, index) => (
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

export default SubMenu3;
