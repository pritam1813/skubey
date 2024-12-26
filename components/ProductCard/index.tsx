import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/app/types/product";

import UtilityButtons from "./UtilityButtons";
import { Rating } from "@smastrom/react-rating";
import ProductPrice from "./ProductPrice";
import Skeleton from "react-loading-skeleton";
import supabaseLoader from "@/supabase-image-loader";

const ProductCard = ({
  product,
  columnsStyle,
  isLoading,
}: {
  product?: Product;
  columnsStyle: string;
  isLoading?: boolean;
}) => {
  let imageSrc = supabaseLoader({
    src: `products/${product?.images[0]}`,
  });

  // let imageSrc = "/products/1.jpg";

  //console.log("product card image src: ", imageSrc);

  return (
    <div className={columnsStyle}>
      <div id="productlayout" className="animate__animated animate__zoomIn">
        <div className="tw-group tw-border-none tw-overflow-hidden tw-mb-5 lg:tw-mb-[30px] tw-rounded-cardcustom tw-shadow-card tw-bg-secondaryHover">
          <div
            id="imageSection"
            className="tw-bg-backgroundColor tw-relative tw-text-center tw-overflow-hidden tw-rounded-tl-cardcustom tw-rounded-tr-cardcustom tw-border-8 tw-border-solid tw-border-secondary tw-transition-all tw-duration-500 group-hover:tw-border-secondaryHover"
          >
            {isLoading ? (
              <Skeleton height={300} />
            ) : (
              <Link href={`/product/${product?.id}`}>
                <Image
                  src={imageSrc}
                  alt={`${product?.name} card image`}
                  className="img-fluid"
                  width={920}
                  height={1093}
                  loading="lazy"
                />
              </Link>
            )}
          </div>

          <div
            id="prodescription"
            className="tw-relative tw-px-[10px] tw-pt-[14px] tw-pb-[15px] lg:tw-px-[15px] lg:tw-pb-[25px] tw-bg-secondary tw-transition-all tw-duration-500 group-hover:tw-bg-secondaryHover tw-rounded-br-cardcustom tw-rounded-bl-cardcustom"
          >
            <div id="caption" className="max-xl:tw-text-center">
              {isLoading ? (
                <Skeleton count={3} />
              ) : (
                product && <UtilityButtons product={product} />
              )}

              <div id="producttitle">
                <h4 className="tw-text-base/5 tw-mt-[3px] tw-mb-0 tw-text-primary hover:tw-text-secondaryLight tw-font-medium">
                  {isLoading ? <Skeleton /> : product?.name}
                </h4>
              </div>

              <div
                id="price"
                className="tw-block xl:tw-inline-block tw-mt-[7px] xl:tw-mt-[10px] tw-text-sm xl:tw-text-[15px] tw-text-primary tw-font-medium"
              >
                {isLoading ? (
                  <Skeleton />
                ) : (
                  product && (
                    <ProductPrice
                      amount={Number(product.price)}
                      discount={
                        product.priceDiscount
                          ? Number(product.priceDiscount)
                          : 0
                      }
                    />
                  )
                )}
              </div>

              <div
                id="rating"
                className="tw-block xl:tw-inline-block tw-float-none xl:tw-float-right tw-mt-[5px] xl:tw-mt-2 xl:tw-p-0 tw-space-x-1 tw-w-1/4"
              >
                {isLoading ? (
                  <Skeleton />
                ) : (
                  product && <Rating readOnly value={product.avgRating} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
