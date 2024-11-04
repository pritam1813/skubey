"use client";
import React, { useEffect, useRef, useState } from "react";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimateHeight from "react-animate-height";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchItems = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [height, setHeight] = useState<string | number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
        setHeight(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchInputShow = () => {
    setShowSearch(!showSearch);
    setHeight(height === 0 ? "auto" : 0);
  };

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="tw-relative max-lg:tw-ml-5">
      <button
        ref={buttonRef}
        className="tw-flex tw-py-5"
        onClick={handleSearchInputShow}
      >
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
        <div
          ref={dropdownRef}
          id="headersearch"
          className={`tw-shadow-headerItems`}
        >
          <div className=" tw-w-60 tw-flex tw-rounded-none tw-border-0 ">
            <input
              type="text"
              placeholder="Search..."
              className="tw-py-1.2 tw-px-3.75 tw-border-none tw-shadow-none tw-bg-secondary tw-h-10 tw-text-primary tw-rounded-none tw-relative tw-flex-auto tw-w-[1%] tw-min-w-0 tw-outline-none tw-outline-0"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={searchParams.get("search")?.toString()}
            />
            <span className="">
              <button
                onClick={handleSearchInputShow}
                className="tw-p-[13px] tw-font-normal tw-m-0 tw-relative tw-z-[2] tw-bg-primary tw-text-secondary tw-leading-5 tw-outline-none tw-outline-0 hover:tw-bg-primaryHover hover:tw-text-primary tw-transition-colors tw-duration-500"
              >
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
