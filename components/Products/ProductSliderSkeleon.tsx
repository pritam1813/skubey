import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductSliderSkeleon = () => {
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
                <Skeleton
                  count={2}
                  width={40}
                  height={40}
                  className="tw-mr-5"
                  inline
                />
              </div>
            </div>

            <div id="Products">
              <div className="row tw-mb-4 gx-2 gy-2">
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Skeleton inline height={504} borderRadius={50} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Skeleton inline height={504} borderRadius={50} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Skeleton inline height={504} borderRadius={50} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <Skeleton inline height={504} borderRadius={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSliderSkeleon;
