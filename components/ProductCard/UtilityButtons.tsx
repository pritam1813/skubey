"use client";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faHeart,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "@/app/stores/";
import { Product } from "@/app/types";

const UtilityButtons = ({ product }: { product: Product }) => {
  const { addToCart, setQuickViewProduct } = useCartStore();

  // const {
  //   id,
  //   name,
  //   price,
  //   description,
  //   categoryId,
  //   stock,
  //   images,
  //   avgRating,
  //   priceDiscount,
  // } = product;

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
        // setQuickViewProduct({
        //   id,
        //   name,
        //   slug: `/product/${id}`,
        //   description,
        //   images,
        //   price,
        //   avgRating,
        //   priceDiscount,
        //   stock,
        //   categories,
        // });
        console.log(product.id);
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
      {/* <Link
        href={`/product/${id}`}
        className="tw-w-7.5 tw-h-7.5 lg:tw-w-10 lg:tw-h-10 xl:tw-h-[38px] xl:tw-w-[38px] tw-px-2.5 tw-py-2 tw-text-sm lg:tw-text-base tw-bg-secondary hover:tw-bg-primaryHover tw-text-primary tw-rounded-full tw-ease-linear tw-duration-500 tw-transition tw-shadow-card"
        passHref
      >
        <FontAwesomeIcon icon={faEye} />
      </Link> */}
    </div>
  );
};

export default UtilityButtons;
