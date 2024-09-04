"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SliderButton = ({
  previous,
  next,
}: {
  previous?: () => void;
  next?: () => void;
}) => {
  return (
    <div className="tw-inline-block tw-space-x-[5px] lg:tw-space-x-5">
      <button
        className="tw-bg-primaryHover tw-w-[30px] tw-h-[30px] lg:tw-h-[50px] lg:tw-w-[50px] tw-text-[18px] lg:tw-text-[20px] tw-rounded-full tw-text-primary hover:tw-bg-primary hover:tw-text-secondary hover:tw-ease-linear hover:tw-duration-700"
        onClick={previous}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        className="tw-bg-primaryHover tw-w-[30px] tw-h-[30px] lg:tw-h-[50px] lg:tw-w-[50px] tw-text-[18px] lg:tw-text-[20px] tw-rounded-full tw-text-primary hover:tw-bg-primary hover:tw-text-secondary hover:tw-ease-linear hover:tw-duration-700"
        onClick={next}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default SliderButton;
