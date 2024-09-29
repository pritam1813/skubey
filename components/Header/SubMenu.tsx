"use client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { MenuItem, SubmenuType } from "./MenuItems";
import AnimateHeight from "react-animate-height";
import { CategoryWiseToys } from "@/data/categories";
import SubMenu1 from "./SubmenuTypes/SubMenu1";
import SubMenu2 from "./SubmenuTypes/SubMenu2";
import SubMenu3 from "./SubmenuTypes/SubMenu3";
import { PagesSubmenu } from "@/data/pages";
import Link from "next/link";

const SubMenu = ({ item }: { item: MenuItem }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [height, setHeight] = useState<string | number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmenuShow = () => {
    setShowSubmenu(!showSubmenu);
    setHeight(height === 0 ? "auto" : 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSubmenu(false);
        setHeight(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { submenuType } = item;
  const renderSubMenuContent = () => {
    switch (submenuType) {
      case SubmenuType.one:
        return (
          <SubMenu1 ref={dropdownRef} CategoryWiseToys={CategoryWiseToys} />
        );
      case SubmenuType.two:
        return <SubMenu2 ref={dropdownRef} />;
      case SubmenuType.three:
        return <SubMenu3 ref={dropdownRef} />;
      case SubmenuType.default:
      default:
        return (
          <div
            ref={dropdownRef}
            className=" tw-bg-secondary tw-p-5 tw-shadow-headerItems"
          >
            <ul className="tw-m-0 tw-p-0">
              {PagesSubmenu.map((page, index) => (
                <li key={index} className="tw-text-left tw-min-w-40">
                  <Link
                    href={page.href}
                    className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-text-sm/5 tw-font-medium tw-py-1.2 tw-no-underline tw-capitalize"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };
  return (
    <>
      <button
        className="text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold tw-py-[15px] hover:tw-text-secondaryLight hoverUnderlineStyle"
        onClick={handleSubmenuShow}
        ref={buttonRef}
      >
        {item.title}{" "}
        {item.title === "Categories" && (
          <span className="tw-absolute tw-left-2.5 -tw-top-2.5  tw-capitalize tw-text-primary OfferSubmenu"></span>
        )}
        {item.title === "Product" && (
          <span className="tw-absolute tw-left-2.5 -tw-top-2.5  tw-capitalize tw-text-secondary HotSubmenu"></span>
        )}
        <FontAwesomeIcon
          icon={faAngleDown}
          className="tw-text-sm/4 tw-w-[14px] tw-h-[14px] d-inline-block tw-pl-1 "
        />{" "}
      </button>
      <AnimateHeight
        duration={500}
        height={height as number}
        // className={`tw-block tw-absolute tw-right-auto tw-z-20 ${
        //   item.submenuType === 1 || item.submenuType === 5 ? "" : "tw-left-0"
        // }`}
        className={`tw-block tw-absolute tw-right-auto tw-z-20 ${
          item.submenuType == SubmenuType.default ? "" : "tw-left-0"
        }`}
      >
        {showSubmenu && renderSubMenuContent()}
      </AnimateHeight>
    </>
  );
};

export default SubMenu;
