"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface DropDownProps {
  title: string;
  children?: React.ReactNode[];
}

const DropDown = ({ title, children }: DropDownProps) => {
  const [dropdownShow, setDropdownShow] = useState(false);
  const [height, setHeight] = useState<string | number>(0);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDropdownShow = useCallback(() => {
    setDropdownShow(!dropdownShow);
    setHeight(height === 0 ? "auto" : 0);
  }, [dropdownShow, height]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownShow(false);
        setHeight(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDropdownShow]);

  return (
    <div className="tw-relative">
      <button
        onClick={handleDropdownShow}
        ref={buttonRef}
        className="text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold  hover:tw-text-secondaryLight"
      >
        {title}
        <FontAwesomeIcon
          icon={faAngleDown}
          className="tw-text-sm/4 tw-w-[14px] tw-h-[14px] d-inline-block tw-pl-1 "
        />
      </button>
      <AnimateHeight
        duration={500}
        height={height as number}
        className="tw-absolute tw-top-10 tw-right-0 tw-left-auto tw-z-20"
      >
        <ul
          ref={dropdownRef}
          className="tw-bg-secondary  tw-px-0 tw-py-2 tw-min-w-40 tw-text-left tw-list-none tw-w-48 tw-shadow-headerItems  "
        >
          {children}
        </ul>
      </AnimateHeight>
    </div>
  );
};

export default DropDown;
