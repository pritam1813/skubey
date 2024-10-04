"use client";
import React, { useRef, useState } from "react";

import Slider from "react-slick";
import ProductsCard from "./ProductsCard";
import SliderButton from "../Buttons/SliderButton";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface ProductImageProps {
  url: string;
  alt: string;
}

interface CategoriesProps {
  categoryName: string;
}

export interface ProductsDataProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  rating: number;
  images: ProductImageProps[];
  categories: CategoriesProps[];
  inStock: boolean;
}

const Products = () => {
  const [activeTab, setActiveTab] = useState("Featured");
  const sliderRef = useRef<Slider | null>(null);

  const { data, error, isLoading } = useSWR("/api/product", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
    { title: "Featured", url: "/featured" },
    { title: "Latest", url: "/latest" },
    { title: "Bestseller", url: "/bestseller" },
  ];

  const filteredProducts = data.filter(
    (product: ProductsDataProps) =>
      product.categories[0].categoryName === activeTab
  );

  let rowsCount = filteredProducts.length > 4 ? 2 : 1;

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
    rows: rowsCount,
    centerPadding: "30px",
    // Todo Add ZoomIn animation on slide change
  };

  //console.log(filteredProducts);

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
                  {filteredProducts.map(
                    (product: ProductsDataProps, index: number) => (
                      <div key={index}>
                        <ProductsCard product={product} />
                      </div>
                    )
                  )}
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
