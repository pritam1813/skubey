import React from "react";
import { ProductsCardProps } from "./ProductsCard";
import Image from "next/image";
import Link from "next/link";

const ProductsThumbnail = ({ product }: { product: ProductsCardProps }) => {
  return (
    <div className="tw-flex tw-flex-row tw-space-x-3">
      <div className="tw-inline-block tw-float-none tw-border-2 tw-border-solid tw-border-primaryHover tw-rounded-md">
        <Image
          src={product.productImage.url}
          alt={product.productImage.alt}
          width={60}
          height={71}
        />
      </div>
      <div className="tw-flex tw-flex-col tw-text-sm tw-text-left  tw-justify-around">
        <div>
          <Link
            href={`/products/${product.productLink}`}
            className="tw-no-underline tw-text-primary hover:tw-text-secondaryLight"
          >
            {product.productName}
          </Link>
        </div>
        <div className="">
          <div className="tw-flex tw-flex-row tw-space-x-1">
            {Array.from({ length: 5 }, (_, i) =>
              i < Math.floor(product.rating) ? (
                <span key={i} className="tw-text-primaryHover">
                  &#9733;
                </span>
              ) : (
                <span key={i} className="tw-text-primaryHover">
                  &#9734;
                </span>
              )
            )}
          </div>
        </div>
        <div>Rs. {product.price}</div>
      </div>
    </div>
  );
};

export default ProductsThumbnail;
