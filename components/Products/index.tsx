"use client";
import React, { useRef, useState } from "react";

import Slider from "react-slick";
import ProductsCard from "./ProductsCard";
import { ProductsData } from "@/data/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [activeTab, setActiveTab] = useState("featured");
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const tabs = [
    { title: "featured", url: "/featured" },
    { title: "latest", url: "/latest" },
    { title: "bestseller", url: "/bestseller" },
  ];

  let settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    rows: 2,
    centerPadding: "30px",
  };

  const filteredProducts = ProductsData.filter(
    (product) => product.topProductCategory === activeTab
  );
  return (
    <div className="tw-mt-[30px] lg:tw-mt-[50px]">
      <div className="container sm:tw-max-w-[540px] md:tw-max-w-[720px] lg:tw-max-w-[1500px]">
        <div className="mainTab">
          <div id="productstab">
            <div
              id="title"
              className="tw-flex tw-relative productsTitle tw-justify-between"
            >
              <h3 className="tw-inline-block tw-text-xl/5 tw-mb-5 lg:tw-text-3xl/5 lg:tw-mb-[30px] tw-capitalize tw-text-primary">
                Top Product
              </h3>
              <div className="tw-inline-block tw-space-x-5">
                <button
                  className="tw-bg-primaryHover tw-h-12 tw-w-12 tw-rounded-full tw-text-primary hover:tw-bg-primary hover:tw-text-secondary hover:tw-ease-linear hover:tw-duration-700"
                  onClick={previous}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button
                  className="tw-bg-primaryHover tw-h-12 tw-w-12 tw-rounded-full tw-text-primary hover:tw-bg-primary hover:tw-text-secondary hover:tw-ease-linear hover:tw-duration-700"
                  onClick={next}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>

            <div id="tabsSection">
              <ul className="tw-mb-[15px] tw-border-none tw-p-0 tw-justify-center tw-flex tw-flex-wrap tw-list-none tw-space-x-[5px] tw-text-sm">
                {tabs.map((tab, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setActiveTab(tab.title)}
                      className={`tw-text-primary hover:tw-bg-secondaryHover tw-no-underline tw-py-2 tw-px-[15px] tw-rounded-pillcustom tw-capitalize ${
                        activeTab === tab.title ? "tw-bg-secondaryHover" : ""
                      }`}
                    >
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div id="Products">
              <div className="row">
                <Slider
                  ref={sliderRef}
                  {...settings}
                  className="productslider"
                  key={activeTab}
                >
                  {filteredProducts.map((product, index) => (
                    <div key={index}>
                      <ProductsCard product={product} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
