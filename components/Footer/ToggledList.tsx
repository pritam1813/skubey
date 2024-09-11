"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AnimateHeight from "react-animate-height";
import Link from "next/link";

interface footerItemProp {
  footerItem: {
    title: string;
    listItems: {
      link: any;
      itemName: string;
    }[];
  };
}

const ToggledList = ({ footerItem }: footerItemProp) => {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState<string | number>(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true); // Detect screen size

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 991); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = () => {
    console.log(toggle);

    setToggle(!toggle);
    setHeight(isLargeScreen ? "auto" : height === 0 ? "auto" : 0);
  };

  return (
    <>
      <h2 className="tw-text-base/[1.2] lg:tw-text-xl/[1.2] tw-mb-1 lg:tw-mb-2.5 tw-font-medium tw-capitalize tw-relative tw-text-primary">
        {footerItem.title}
        <button
          onClick={handleToggle}
          className="tw-absolute tw-right-0 lg:tw-hidden"
        >
          {!toggle ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="tw-w-3.5 tw-h-3.5"
            />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} className="tw-w-3.5 tw-h-3.5" />
          )}
        </button>
      </h2>
      {isLargeScreen ? (
        <ul className="list-unstyled">
          {footerItem.listItems.map((item, index) => (
            <li key={index} className="tw-text-sm ">
              {footerItem.title === "Contact" ? (
                <div className="tw-flex tw-py-2 tw-text-sm">
                  <div className="tw-pr-2.5">
                    <FontAwesomeIcon
                      icon={item.link}
                      className="tw-h-3.5 tw-w-3.5"
                    />
                  </div>
                  <div>{item.itemName}</div>
                </div>
              ) : (
                <Link
                  className="tw-no-underline tw-text-secondaryLight tw-py-2 tw-inline-block"
                  href={item.link}
                >
                  {item.itemName}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <AnimateHeight duration={500} height={height as number}>
          <ul
            className={`list-unstyled animate__animated  ${
              toggle ? "animate__fadeInLeft" : "animate__fadeOutLeft"
            } `}
          >
            {footerItem.listItems.map((item, index) => (
              <li key={index} className="tw-text-sm ">
                {footerItem.title === "Contact" ? (
                  <div className="tw-flex tw-py-2 tw-text-sm">
                    <div className="tw-pr-2.5">
                      <FontAwesomeIcon
                        icon={item.link}
                        className="tw-h-3.5 tw-w-3.5"
                      />
                    </div>
                    <div>{item.itemName}</div>
                  </div>
                ) : (
                  <Link
                    className="tw-no-underline tw-text-secondaryLight tw-py-2 tw-inline-block"
                    href={item.link}
                  >
                    {item.itemName}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </AnimateHeight>
      )}
    </>
  );
};

export default ToggledList;
