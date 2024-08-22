"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

const Carousel = () => {
  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: true,
    slidesToShow: 1,
  };
  return (
    <section>
      <div className="slider-container  tw-mx-auto d-block">
        <Slider {...settings} className="position-relative z-1 ">
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
