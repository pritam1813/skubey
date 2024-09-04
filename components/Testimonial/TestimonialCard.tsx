import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

interface TestimonialProp {
  imageUrl: string;
  name: string;
  review: string;
}

const TestimonialCard = ({
  TestimonialData,
  bgColor,
}: {
  TestimonialData: TestimonialProp;
  bgColor: string;
}) => {
  const { imageUrl, name, review } = TestimonialData;
  return (
    <div className="tw-mb-[30px] lg:tw-mr-7 ">
      <div
        className={`${bgColor} tw-py-5 tw-px-[15px] tw-shadow-card tw-rounded-cardcustom tw-text-center tw-border-8 tw-border-secondary`}
      >
        <div>
          <Image
            src={`/images/${imageUrl}`}
            alt={`${name} Image`}
            width={200}
            height={200}
            className="tw-w-3/5 xs:tw-w-[35%] md:tw-w-1/2 xl:tw-w-2/5 tw-rounded-full tw-mx-auto"
          />
        </div>
        <div id="content" className="tw-mt-5">
          <div className="tw-capitalize tw-text-[18px]">{name}</div>
          <div className="tw-mt-[10px] tw-text-secondaryLight tw-text-sm/5">
            Customer
          </div>
        </div>
        <div id="text" className="tw-leading-6 tw-mt-5">
          <p>{review}</p>
        </div>
        <FontAwesomeIcon icon={faQuoteRight} className="tw-text-3xl tw-mt-5" />
      </div>
    </div>
  );
};

export default TestimonialCard;
