"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { Testimonials } from "@/data/testimonial";
import TestimonialCard from "./TestimonialCard";
import SliderButton from "../Buttons/SliderButton";

const TestimonialSlider = () => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => sliderRef.current?.slickNext();
  const previous = () => sliderRef.current?.slickPrev();

  let settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="tw-absolute -tw-mt-[2px] -tw-top-12 tw-right-7 lg:-tw-top-[70px] lg:tw-right-5">
        <div className="tw-inline-block tw-space-x-[5px] lg:tw-space-x-5">
          <SliderButton previous={previous} next={next} />
        </div>
      </div>

      <Slider {...settings} ref={sliderRef}>
        {Testimonials.map((testimonial, index) => (
          <div key={index}>
            <TestimonialCard
              TestimonialData={testimonial}
              bgColor={
                index % 2 === 0 ? "tw-bg-primaryHover" : "tw-bg-secondaryHover"
              }
            />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default TestimonialSlider;
