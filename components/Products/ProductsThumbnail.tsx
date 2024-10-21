import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types";
import { Rating as ReactRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export type ProductThumbnailProps = Pick<
  Product,
  "images" | "id" | "name" | "rating" | "price"
>;

const ProductsThumbnail = ({ product }: { product: ProductThumbnailProps }) => {
  const { images, id, name, rating } = product;
  return (
    <div className="tw-flex tw-flex-row tw-space-x-3">
      <div className="tw-inline-block tw-float-none tw-border-2 tw-border-solid tw-border-primaryHover tw-rounded-md">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID_DEV}/${images[0].url}`}
          alt={images[0].alt}
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
            <ReactRating style={{ maxWidth: 70 }} value={rating} readOnly />
          </div>
        </div>
        <div>Rs. {product.price}</div>
      </div>
    </div>
  );
};

export default ProductsThumbnail;
