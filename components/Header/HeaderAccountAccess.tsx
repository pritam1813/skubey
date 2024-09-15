"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AnimateHeight from "react-animate-height";
import Link from "next/link";

const HeaderAccountAccess = () => {
  const [showAccountItems, setShowAccountItems] = useState(false);
  const [height, setHeight] = useState<string | number>(0);

  const handleAccountShow = () => {
    setShowAccountItems(!showAccountItems);
    setHeight(height === 0 ? "auto" : 0);
  };
  return (
    <div className="tw-mx-5 lg:tw-mx-7.5 tw-relative">
      <button className="tw-flex tw-py-5" onClick={handleAccountShow}>
        <FontAwesomeIcon
          icon={faUser}
          className="tw-w-5 tw-h-5 tw-text-primary"
        />
        <AnimateHeight
          duration={500}
          height={height as number}
          className="tw-absolute tw-top-16 tw-right-0 tw-left-auto tw-z-20"
        >
          <ul className="tw-bg-secondary tw-px-0 tw-py-2 tw-min-w-40 tw-text-left tw-list-none tw-w-48 tw-shadow-headerItems  ">
            <li>
              <Link
                className="tw-text-left tw-block tw-w-full tw-clear-both tw-whitespace-nowrap tw-text-primary hover:tw-text-secondaryLight tw-no-underline tw-py-[7px] tw-px-3.75 tw-font-medium tw-text-sm/5"
                href="/register"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                className="tw-text-left tw-block tw-w-full tw-clear-both tw-whitespace-nowrap tw-text-primary hover:tw-text-secondaryLight tw-no-underline tw-py-[7px] tw-px-3.75 tw-font-medium tw-text-sm/5"
                href="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </AnimateHeight>
      </button>
    </div>
  );
};

export default HeaderAccountAccess;
