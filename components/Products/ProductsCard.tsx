import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faHeart,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

export interface ProductsCardProps {
  productName: string;
  productImage: {
    url: string;
    alt: string;
  };
  price: number;
  rating: number;
  productLink: string;
}

const ProductsCard = (product: { product: ProductsCardProps }) => {
  const { productName, productImage, price, rating, productLink } =
    product.product;
  return (
    <div id="item">
      <div className="col col-xs-12">
        <div id="productlayout" className="animate__animated animate__zoomIn">
          <div className="tw-group tw-border-none tw-overflow-hidden tw-mb-[30px] tw-rounded-cardcustom tw-shadow-card tw-bg-secondaryHover">
            <div
              id="imageSection"
              className="tw-bg-backgroundColor tw-relative tw-text-center tw-overflow-hidden tw-rounded-tl-cardcustom tw-rounded-tr-cardcustom tw-border-8 tw-border-solid tw-border-secondary tw-transition-all tw-duration-500 group-hover:tw-border-secondaryHover"
            >
              <Link href={productLink}>
                <Image
                  src={productImage.url}
                  alt={productImage.alt}
                  className="img-fluid"
                  width={920}
                  height={1093}
                />
              </Link>
            </div>
            <div
              id="prodescription"
              className="tw-relative tw-px-[15px] tw-pt-[14px] tw-pb-[25px] tw-bg-secondary tw-transition-all tw-duration-500 group-hover:tw-bg-secondaryHover tw-rounded-br-cardcustom tw-rounded-bl-cardcustom"
            >
              <div id="caption" className="">
                <div
                  id="buttongrp"
                  className="tw-absolute -tw-top-[26px] tw-space-x-[5px] -tw-right-[150px] group-hover:tw-right-[18px] tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-duration-500 "
                >
                  <button className="tw-w-[38px] tw-h-[38px] tw-bg-secondary hover:tw-bg-primaryHover tw-text-primary tw-text-base/9 tw-rounded-full tw-ease-linear tw-duration-500 tw-transition">
                    <FontAwesomeIcon icon={faBagShopping} />
                  </button>
                  <button className="tw-w-[38px] tw-h-[38px] tw-bg-secondary hover:tw-bg-primaryHover tw-text-primary tw-text-base/9 tw-rounded-full tw-ease-linear tw-duration-500 tw-transition">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button className="tw-w-[38px] tw-h-[38px] tw-bg-secondary hover:tw-bg-primaryHover tw-text-primary tw-text-base/9 tw-rounded-full tw-ease-linear tw-duration-500 tw-transition">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="tw-w-[38px] tw-h-[38px] tw-bg-secondary hover:tw-bg-primaryHover tw-text-primary tw-text-base/9 tw-rounded-full tw-ease-linear tw-duration-500 tw-transition">
                    <FontAwesomeIcon icon={faShuffle} />
                  </button>
                </div>
                <div id="producttitle">
                  <h4 className="tw-text-base/5 tw-mt-[3px] tw-mb-0 tw-text-primary hover:tw-text-secondaryLight tw-font-medium">
                    {productName}
                  </h4>
                </div>
                <div
                  id="price"
                  className="tw-inline-block tw-mt-[10px] tw-text-[15px] tw-text-primary tw-font-medium"
                >
                  ${price}.00
                </div>
                <div
                  id="rating"
                  className="tw-inline-block tw-float-right tw-mt-[8px] tw-space-x-1"
                >
                  <FontAwesomeIcon
                    icon={faStarEmpty}
                    className="tw-w-[14px] tw-h-[14px] tw-text-[#e69500]"
                  />
                  <FontAwesomeIcon
                    icon={faStarEmpty}
                    className="tw-w-[14px] tw-h-[14px] tw-text-[#e69500]"
                  />
                  <FontAwesomeIcon
                    icon={faStarEmpty}
                    className="tw-w-[14px] tw-h-[14px] tw-text-[#e69500]"
                  />
                  <FontAwesomeIcon
                    icon={faStarEmpty}
                    className="tw-w-[14px] tw-h-[14px] tw-text-[#e69500]"
                  />
                  <FontAwesomeIcon
                    icon={faStarEmpty}
                    className="tw-w-[14px] tw-h-[14px] tw-text-[#e69500]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
