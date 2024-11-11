import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/product";
import { Rating as ReactRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ProductPrice from "../ProductCard/ProductPrice";

export type ProductThumbnailProps = Pick<
  Product,
  "images" | "id" | "name" | "avgRating" | "price" | "priceDiscount"
>;

const ProductsThumbnail = ({ product }: { product: ProductThumbnailProps }) => {
  const { images, id, name, avgRating, price, priceDiscount } = product;
  return (
    <div className="tw-flex tw-flex-row tw-space-x-3">
      <div className="tw-inline-block tw-float-none tw-border-2 tw-border-solid tw-border-primaryHover tw-rounded-md">
        <Image
          src={`${images[0]}`}
          alt={`${name} Thumbnail`}
          width={60}
          height={71}
        />
      </div>
      <div className="tw-flex tw-flex-col tw-text-sm tw-text-left  tw-justify-around">
        <div>
          <Link
            href={`/product/${id}`}
            className="tw-no-underline tw-text-primary hover:tw-text-secondaryLight"
          >
            {name}
          </Link>
        </div>
        <div className="">
          <div className="tw-flex tw-flex-row tw-space-x-1">
            <ReactRating style={{ maxWidth: 70 }} value={avgRating} readOnly />
          </div>
        </div>
        <div>
          <ProductPrice
            amount={Number(price)}
            discount={priceDiscount ? Number(priceDiscount) : 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsThumbnail;
