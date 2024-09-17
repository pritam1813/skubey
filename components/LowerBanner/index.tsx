import Image from "next/image";
import React from "react";

const LowerBanner = () => {
  return (
    <section>
      <div className="tw-flex max-md:tw-flex-wrap [&>*]:tw-relative animate__animated animate__fadeInLeft">
        <div className="max-md:tw-w-1/2 max-lg:tw-px-1.2 lg:tw-pr-3.75 tw-float-left max-md:tw-mb-2.5">
          <Image
            src="/images/banners/banner1.png"
            alt="Banner 1"
            width={465}
            height={501}
          />
          <div className="tw-absolute tw-top-1.2 tw-right-3.75 lg:tw-top-3.75 lg:tw-right-[30px] xxl:tw-top-13 xxl:tw-right-13">
            <h2 className="tw-text-base/[22px] lg:tw-text-2xl/[34px] xxl:tw-text-4xl/[46px] tw-capitalize tw-font-semibold tw-text-primary">
              kids
              <br />
              world
            </h2>
          </div>
        </div>
        <div className="max-md:tw-w-full max-md:tw-clear-both max-lg:tw-px-1.2 tw-order-3 md:tw-order-2 lg:tw-mx-[7px]">
          <div id="banner2">
            <Image
              src="/images/banners/banner2.png"
              alt="Banner 2"
              width={930}
              height={501}
            />
          </div>
          <div className="tw-absolute tw-top-0 lg:tw-top-1.2 tw-right-1/2 xxl:tw-top-3.75 tw-w-20 tw-h-16 lg:tw-w-[110px] lg:tw-h-[87px] max-xxl:tw-bg-[length:100%] xxl:tw-w-40 xxl:tw-h-32  tw-bg-[url(/images/offer.png)] tw-bg-no-repeat tw-translate-x-1/2 tw-z-[1] tw-animate-flash-slow">
            <div className=" tw-leading-5 [&>*]:tw-uppercase tw-text-primary tw-absolute tw-right-0 tw-left-0 tw-text-center tw-top-1/2 -tw-translate-y-1/2">
              <span className="tw-hidden lg:tw-block">flat</span>
              <span className="tw-block tw-text-sm/[15px] xxl:tw-text-[22px] tw-font-semibold lg:tw-py-1.2">
                30%
              </span>
              <span className="tw-block max-xxl:tw-text-xs/[15px]">off</span>
            </div>
          </div>
          <div
            id="bannerdetail"
            className="tw-absolute tw-bottom-1/2 tw-translate-y-1/2 tw-right-2.5 lg:tw-right-13 tw-text-center "
          >
            <h2 className="tw-text-sm lg:tw-text-[22px] xxl:tw-text-[46px] tw-leading-[1.2] tw-capitalize tw-font-semibold tw-text-primary">
              exclusive toys
            </h2>
            <div className="tw-mt-1.2 lg:tw-mt-3.75 xxl:tw-mt-[25px] tw-text-secondaryLight tw-text-xs lg:tw-text-sm xxl:tw-text-lg tw-leading-5">
              Special offer for new Customers
            </div>
          </div>
          <div
            id="voucher"
            className="tw-absolute tw-block tw-w-[85px] tw-h-[75px] lg:tw-w-[150px] lg:tw-h-[131px] xxl:tw-w-[210px] xxl:tw-h-[184px] tw-bottom-0 md:-tw-bottom-2.5 lg:-tw-bottom-[30px] xxl:-tw-bottom-[60px] tw-right-0  tw-animate-flash  tw-bg-[url(/images/giftvoucher.png)] tw-bg-no-repeat max-xxl:tw-bg-[length:100%]"
          >
            <span className="tw-absolute tw-right-[46%] tw-bottom-1/2 tw-translate-x-1/2 tw-translate-y-1/2 tw-text-[10px]/4 lg:tw-text-sm/[23px] xxl:tw-text-[22px]/[30px] tw-capitalize tw-w-[60px] lg:tw-w-[70px] xxl:tw-w-[100px] tw-text-center tw-font-semibold">
              gift voucher
            </span>
          </div>
        </div>
        <div className="max-md:tw-w-1/2 tw-order-2 md:tw-order-3 max-lg:tw-px-1.2 lg:tw-pl-3.75 max-md:tw-mb-2.5">
          <Image
            src="/images/banners/banner3.png"
            alt="Banner 3"
            width={465}
            height={501}
          />
          <div
            id="detail"
            className="tw-absolute tw-top-1.2 lg:tw-top-3.75 xxl:tw-top-13 tw-left-3.75 lg:tw-left-[30px] xxl:tw-left-13 tw-text-center tw-text-secondary"
          >
            <div className="tw-text-xs lg:tw-text-sm tw-leading-5">
              just for your baby
            </div>
            <h2 className="tw-capitalize tw-font-semibold tw-text-secondary tw-mt-2 lg:tw-mt-3.75 tw-text-sm lg:tw-text-[22px] xxl:tw-text-[40px]">
              20% off
            </h2>
            <div className="tw-mt-1.2 lg:tw-mt-2.5 xxl:tw-mt-[17px] tw-text-xs lg:tw-text-sm xxl:tw-text-[22px]">
              on toys
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LowerBanner;
