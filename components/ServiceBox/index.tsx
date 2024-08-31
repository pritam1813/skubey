import React from "react";
import ServiceItemCard from "./ServiceItemCard";
import { Services } from "@/data/services";
import Image from "next/image";
import { Nosifer } from "next/font/google";

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
});

const ServiceBox = () => {
  return (
    <section className="tw-mt-12">
      <div className="container">
        <div className="row">
          <div id="promoitem" className="col-lg-6">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 ">
              {Services.map((item, index) => (
                <ServiceItemCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.imageUrl}
                  imagealt={item.imageAlt}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-6 tw-self-center">
            <div className="position-relative max-lg:tw-mt-[30px]">
              <div
                id="animated-icon"
                className="position-absolute tw-left-10 -tw-top-[5px] tw-w-[48px] tw-h-[85px] xs:tw-w-[92px] xs:tw-h-[152px] tw-animate-moveIt tw-origin-[50%_0]"
              >
                <Image
                  src="/service/service-pattern.png"
                  alt="animated icon"
                  fill
                />
              </div>
              <div id="main-banner">
                <Image
                  src="/banners/service_banner.jpg"
                  alt="Main Service Banner"
                  width={720}
                  height={666}
                />
              </div>
              <div
                id="banner-detail"
                className="position-absolute text-center tw-left-[10px] xs:tw-left-5 tw-bottom-1/2 tw-translate-y-1/2 tw-text-primary"
              >
                <div className="tw-text-[13px] xs:tw-text-base md:tw-text-xl">
                  Exclusive sale on toy town
                </div>
                <h2
                  className={`${nosifer.className} tw-text-[14px] tw-mt-[10px] xs:tw-text-[22px] xs:tw-mt-5 xl:tw-text-[28px] xl:tw-mt-[30px]`}
                >
                  Trendy kids toys
                </h2>
                <div className="tw-text-[13px] xs:tw-text-base md:tw-text-lg tw-mt-[10px] xs:tw-mt-[15px] xl:tw-mt-[25px]">
                  Get up to 30% off Available
                </div>
                <button className="tw-bg-primaryHover tw-text-primary tw-rounded-3xl hover:tw-bg-secondaryHover tw-ease-in-out tw-duration-700 tw-text-sm xs:tw-text-base tw-py-[5px] tw-px-5 xs:tw-py-[10px] xs:tw-px-[30px] tw-mt-[10px] xs:tw-mt-5 xl:tw-mt-7">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBox;
