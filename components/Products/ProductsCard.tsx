import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faHeart,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/app/stores/";
import { Product } from "@/app/types";
import useCurrencyStore from "@/app/stores/currencyStore";

const ProductsCard = ({ product }: { product: Product }) => {
  const { addToCart, setQuickViewProduct } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const {
    id,
    name,
    price,
    description,
    categories,
    inStock,
    images,
    rating,
    discount,
  } = product;

  const utilityButtons = [
    {
      id: 1,
      icon: faBagShopping,
      title: "Add to Cart",
      link: "#",
      onClickHandler: () => {
        addToCart(product);
      },
    },
    {
      id: 2,
      icon: faHeart,
      title: "Add to Wishlist",
      link: "#",
      onClickHandler: () => {
        console.log("Add to Wishlist");
      },
    },
    {
      id: 3,
      icon: faEye,
      title: "Quick View",
      link: "#",
      onClickHandler: () => {
        setQuickViewProduct({
          id,
          name,
          slug: `/product/${id}`,
          description,
          images,
          price,
          rating,
          discount,
          inStock,
          categories,
        });
      },
    },
    {
      id: 4,
      icon: faShuffle,
      title: "Compare",
      link: "#",
      onClickHandler: () => {
        console.log("compare");
      },
    },
  ];

  return (
    <div id="item">
      <div className="col col-xs-12">
        <div id="productlayout" className="animate__animated animate__zoomIn">
          <div className="tw-group tw-border-none tw-overflow-hidden tw-mb-5 lg:tw-mb-[30px] tw-rounded-cardcustom tw-shadow-card tw-bg-secondaryHover">
            <div
              id="imageSection"
              className="tw-bg-backgroundColor tw-relative tw-text-center tw-overflow-hidden tw-rounded-tl-cardcustom tw-rounded-tr-cardcustom tw-border-8 tw-border-solid tw-border-secondary tw-transition-all tw-duration-500 group-hover:tw-border-secondaryHover"
            >
              <Link href={`/product/${id}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID_DEV}/${images[0].url}`}
                  alt={images[0].alt}
                  className="img-fluid"
                  width={920}
                  height={1093}
                />
              </Link>
            </div>
            <div
              id="prodescription"
              className="tw-relative tw-px-[10px] tw-pt-[14px] tw-pb-[15px] lg:tw-px-[15px] lg:tw-pb-[25px] tw-bg-secondary tw-transition-all tw-duration-500 group-hover:tw-bg-secondaryHover tw-rounded-br-cardcustom tw-rounded-bl-cardcustom"
            >
              <div id="caption" className="max-xl:tw-text-center">
                <div
                  id="buttongrp"
                  // className="tw-absolute -tw-top-[26px] tw-space-x-[5px] -tw-right-[150px] group-hover:tw-right-[18px] tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-duration-500 "
                  className="tw-block tw-absolute max-lg:tw-left-0 max-lg:tw-right-0 lg:-tw-right-[150px] -tw-top-[26px] tw-space-x-2 lg:group-hover:tw-right-[18px] lg:tw-opacity-0 lg:group-hover:tw-opacity-100 tw-transition-all tw-duration-500"
                >
                  {utilityButtons.map((button) => (
                    <button
                      title={button.title}
                      key={button.id}
                      className="tw-text-[14px] tw-w-[30px] tw-h-[30px] lg:tw-w-10 lg:tw-h-10 lg:tw-text-base xl:tw-h-[38px] xl:tw-w-[38px] tw-bg-secondary hover:tw-bg-primaryHover tw-text-primary tw-rounded-full tw-ease-linear tw-duration-500 tw-transition tw-shadow-card"
                      onClick={button.onClickHandler}
                    >
                      <FontAwesomeIcon icon={button.icon} />
                    </button>
                  ))}
                </div>
                <div id="producttitle">
                  <h4 className="tw-text-base/5 tw-mt-[3px] tw-mb-0 tw-text-primary hover:tw-text-secondaryLight tw-font-medium">
                    {name}
                  </h4>
                </div>
                <div
                  id="price"
                  className="tw-block xl:tw-inline-block tw-mt-[7px] xl:tw-mt-[10px] tw-text-sm xl:tw-text-[15px] tw-text-primary tw-font-medium"
                >
                  {discount ? (
                    <>
                      <span className="tw-mr-2">${price - discount}</span>
                      <span className="tw-line-through tw-text-secondaryLight">
                        ${price}
                      </span>
                    </>
                  ) : (
                    <span>{formatPrice(price)}</span>
                  )}
                </div>
                <div
                  id="rating"
                  className="tw-block xl:tw-inline-block tw-float-none xl:tw-float-right tw-mt-[5px] xl:tw-mt-2 xl:tw-p-0 tw-space-x-1"
                >
                  {Array.from({ length: 5 }, (_, i) =>
                    i < Math.floor(rating) ? (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
