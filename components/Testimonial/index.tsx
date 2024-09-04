import React from "react";
import Image from "next/image";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <section className="tw-mt-[10px] lg:tw-mt-5 animate__animated animate__bounceInUp">
      <div id="Testimonial" className="tw-relative tw-mb-5">
        <div className="container">
          <div className="row">
            <div id="ttle" className="tw-relative">
              <h3 className="tw-text-xl/5 tw-mb-5 lg:tw-text-3xl/5 lg:tw-mb-[30px] tw-capitalize tw-inline-block tw-text-primary after:tw-bg-primaryHover after:tw-h-[2px] after:tw-w-full after:tw-block after:tw-mt-[10px] tw-font-medium">
                Testimonial
              </h3>
            </div>
            <div id="img" className="col-md-4 max-md:tw-hidden">
              <Image
                src="/banners/testimonial_banner.png"
                alt="Testimonial Banner"
                width={375}
                height={536}
              />
            </div>
            <div className="col-md-8 tw-relative slider-container">
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
