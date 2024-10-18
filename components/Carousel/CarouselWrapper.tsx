"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import "./CarouselStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

/* TO BE IMPROVED LATER */

interface CarouselProps {
  slides?: React.ReactNode[];
  options?: EmblaOptionsType;
}

const Sampleslides = [
  <Image
    src="/images/products/1.jpg"
    alt="Prod 1"
    width={100}
    height={50}
    key={1}
  />,
  <Image
    src="/images/products/2.jpg"
    alt="Prod 2"
    width={100}
    height={50}
    key={2}
  />,
  <Image
    src="/images/products/3.jpg"
    alt="Prod 3"
    width={100}
    height={50}
    key={3}
  />,
  <Image
    src="/images/products/4.jpg"
    alt="Prod 4"
    width={100}
    height={50}
    key={4}
  />,
  <Image
    src="/images/products/5.jpg"
    alt="Prod 5"
    width={100}
    height={50}
    key={5}
  />,
  <Image
    src="/images/products/6.jpg"
    alt="Prod 6"
    width={100}
    height={50}
    key={6}
  />,
];

const CarouselWrapper: React.FC<CarouselProps> = ({
  slides = Sampleslides,
  options = { slidesToScroll: 1 },
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  //const [slideToAnimate, setSlideToAnimate] = useState(0)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="embla tw-relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        className="embla__prev embla__button"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        className="embla__next embla__button"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default CarouselWrapper;
