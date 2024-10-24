import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductThumbnailSkeleton = () => {
  return (
    <div className="tw-flex tw-flex-row tw-space-x-3">
      <div className="tw-inline-block tw-float-none tw-border-2 tw-border-solid tw-border-primaryHover tw-rounded-md">
        <Skeleton width={60} height={71} />
      </div>
      <div className="tw-flex tw-flex-col tw-text-sm tw-text-left  tw-justify-around">
        <div>
          <Skeleton width={100} height={15} />
        </div>
        <div className="">
          <div className="tw-flex tw-flex-row tw-space-x-1">
            <Skeleton width={70} height={15} />
          </div>
        </div>
        <div>
          <Skeleton width={30} height={15} />
        </div>
      </div>
    </div>
  );
};

export default ProductThumbnailSkeleton;
