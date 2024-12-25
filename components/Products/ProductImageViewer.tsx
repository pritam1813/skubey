"use client";
import React, { useCallback, useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import "../Carousel/CarouselStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import supabaseLoader from "@/supabase-image-loader";

const ProductImageViewer = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [alt, setAlt] = useState(`${name} + Main Image`);
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1 });
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
    <div className="col-sm-6">
      <InnerImageZoom
        src={supabaseLoader({
          src: `products/${mainImage}` || "/products/1.jpg",
        })}
        zoomSrc={supabaseLoader({
          src: `products/${mainImage}` || "/products/1.jpg",
        })}
        width={920}
        height={1093}
        imgAttributes={{ alt }}
        zoomType="hover"
        hasSpacer={true}
      />

      <div className="tw-w-1/2 tw-mx-auto ">
        <div className="embla tw-relative">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {images?.map((img, index) => (
                <div
                  className="embla__slide"
                  key={index}
                  onClick={() => {
                    setMainImage(img);
                    setAlt(`${name} image ${index + 1}`);
                  }}
                >
                  <Image
                    src={supabaseLoader({
                      src: `products/${img}` || "/products/1.jpg",
                    })}
                    alt={`${name} image ${index + 1}`}
                    width={100}
                    height={50}
                  />
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
      </div>
    </div>
  );
};

export default ProductImageViewer;
