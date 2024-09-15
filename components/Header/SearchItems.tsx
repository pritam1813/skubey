"use client";
import React, { useState } from "react";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateHeight from "react-animate-height";

const SearchItems = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [height, setHeight] = useState<string | number>(0);

  const handleSearchInputShow = () => {
    setShowSearch(!showSearch);
    setHeight(height === 0 ? "auto" : 0);
  };
  return (
    <div className="tw-relative max-lg:tw-ml-5">
      <button className="tw-flex tw-py-5" onClick={handleSearchInputShow}>
        {showSearch ? (
          <FontAwesomeIcon
            icon={faXmark}
            className="tw-w-5 tw-h-5 tw-text-primary"
          />
        ) : (
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="tw-w-5 tw-h-5 tw-text-primary"
          />
        )}
      </button>
      <AnimateHeight
        duration={500}
        height={height as number}
        className="tw-absolute tw-right-0 tw-z-[9]"
      >
        <div id="headersearch" className={`tw-shadow-headerItems`}>
          <div className=" tw-w-60 tw-flex tw-rounded-none tw-border-0 ">
            <input
              type="text"
              placeholder="Search..."
              className="tw-py-1.2 tw-px-3.75 tw-border-none tw-shadow-none tw-bg-secondary tw-h-10 tw-text-primary tw-rounded-none tw-relative tw-flex-auto tw-w-[1%] tw-min-w-0 tw-outline-none tw-outline-0"
            />
            <span className="">
              <button className="tw-p-[13px] tw-font-normal tw-m-0 tw-relative tw-z-[2] tw-bg-primary tw-text-secondary tw-leading-5 tw-outline-none tw-outline-0 hover:tw-bg-primaryHover hover:tw-text-primary tw-transition-colors tw-duration-500">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="tw-w-3.5 tw-h-3.5 tw-block"
                />
              </button>
            </span>
          </div>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default SearchItems;
