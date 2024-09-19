import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="tw-fixed tw-left-0 tw-top-0 tw-w-full tw-h-full tw-z-[9999] tw-bg-no-repeat tw-bg-borderColor tw-bg-opacity-90">
      <Image
        src="/images/ajax_loader.gif"
        alt="Loading"
        width={200}
        height={200}
        className="tw-mx-auto tw-mt-[35vh]"
        unoptimized={true}
      />
    </div>
  );
};

export default Loading;
