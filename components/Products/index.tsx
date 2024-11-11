"use client";
import React, { useRef, useState } from "react";

import Slider from "react-slick";
import ProductCard from "../ProductCard";
import SliderButton from "../Buttons/SliderButton";
import useSWR from "swr";
import { Product } from "@/app/types";

import { fetcher } from "@/app/utils/fetcherFunctions";

const tabs = [
  { title: "Featured", url: "featured" },
  { title: "Latest", url: "latest" },
  { title: "Bestseller", url: "bestseller" },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[0]>(tabs[0]);
  const sliderRef = useRef<Slider | null>(null);

  const { data, error, isLoading } = useSWR(
    `/api/category/${activeTab.url}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;

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

  // const filteredProducts = data.filter(
  //   (product: Product) => product.categories[0].categoryName === activeTab
  // );

  // let rowsCount = filteredProducts.length > 4 ? 2 : 1;

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
    // Todo Add ZoomIn animation on slide change
  };

  return (
    <div className="tw-mt-[30px] lg:tw-mt-[50px] animate__animated animate__fadeInUp">
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
              <div className="tw-inline-block tw-space-x-[5px] lg:tw-space-x-5">
                <SliderButton previous={previous} next={next} />
              </div>
            </div>

            <div id="tabsSection">
              <ul className="tw-mb-[15px] tw-border-none tw-p-0 tw-justify-center tw-flex tw-flex-wrap tw-list-none tw-space-x-[5px] tw-text-sm">
                {tabs.map((tab, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`tw-text-primary hover:tw-bg-secondaryHover tw-no-underline tw-py-2 tw-px-[15px] tw-rounded-pillcustom tw-capitalize ${
                        activeTab === tab ? "tw-bg-secondaryHover" : ""
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
                  key={activeTab.title}
                >
                  {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div key={i}>
                          <div id="item">
                            <ProductCard
                              isLoading
                              columnsStyle="col col-xs-12"
                            />
                          </div>
                        </div>
                      ))
                    : data &&
                      data.products.map((product: Product, index: number) => (
                        <div key={index}>
                          <div id="item">
                            <ProductCard
                              product={product}
                              columnsStyle="col col-xs-12"
                            />
                          </div>
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
