"use client";
import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Carousel = () => {
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

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
  };
  return (
    <section className="tw-relative">
      <div className="tw-absolute tw-top-[calc(50%-8px)] tw-block tw-z-10 tw-w-full [&>*]:tw-absolute [&>*]:-tw-mt-0.5 ">
        <button
          className="tw-left-2 lg:tw-left-5 tw-w-5 tw-h-5 tw-text-xs/5 sm:tw-w-7.5 sm:tw-h-7.5 sm:tw-text-base/[30px] md:tw-h-[34px] md:tw-w-[37px] md:tw-text-[17px]/9 xxl:tw-w-13 xxl:tw-h-13 xxl:tw-text-xl/[50px] tw-bg-secondary tw-text-primary hover:tw-bg-primaryHover hover:tw-text-secondary hover:tw-ease-linear hover:tw-duration-700 tw-rounded-full"
          onClick={previous}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          className="tw-right-2 lg:tw-right-5 tw-w-5 tw-h-5 tw-text-xs/5 sm:tw-w-7.5 sm:tw-h-7.5 sm:tw-text-base/[30px] md:tw-h-[34px] md:tw-w-[37px] md:tw-text-[17px]/9 xxl:tw-w-13 xxl:tw-h-13 xxl:tw-text-xl/[50px] tw-bg-secondary tw-text-primary hover:tw-bg-primaryHover hover:tw-text-secondary hover:tw-ease-linear hover:tw-duration-700 tw-rounded-full"
          onClick={next}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className="slider-container  tw-mx-auto d-block">
        <Slider
          {...settings}
          ref={sliderRef}
          className="position-relative z-1 carouselslider"
        >
          <div>
            <Image
              src="/banners/mainbanner1.png"
              width={1920}
              height={900}
              className="tw-min-w-full"
              alt="banner"
            />
          </div>
          <div>
            <Image
              src="/banners/mainbanner2.png"
              width={1920}
              height={900}
              className="tw-min-w-full"
              alt="banner"
            />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Carousel;
