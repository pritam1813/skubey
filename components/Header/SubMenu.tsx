"use client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { MenuItem, SubmenuType } from "./MenuItems";
import AnimateHeight from "react-animate-height";
import { CategoryWiseToys } from "@/data/categories";
import {
  SubMenuOne,
  SubMenuTwo,
  SubMenuThree,
  SubMenuDefault,
} from "./SubMenus";

export const RenderSubMenuContent = forwardRef<HTMLDivElement, MenuItem>(
  ({ submenuType }, ref) => {
    switch (submenuType) {
      case SubmenuType.one:
        return <SubMenuOne ref={ref} CategoryWiseToys={CategoryWiseToys} />;
      case SubmenuType.two:
        return <SubMenuTwo ref={ref} />;
      case SubmenuType.three:
        return <SubMenuThree ref={ref} />;
      case SubmenuType.default:
      default:
        return <SubMenuDefault ref={ref} />;
    }
  }
);

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
        {showSubmenu && (
          <RenderSubMenuContent
            ref={dropdownRef}
            submenuType={submenuType}
            id={item.id}
            path={item.path}
            title={item.title}
          />
        )}
      </AnimateHeight>
    </>
  );
};

SubMenu.displayName = "SubMenu";
RenderSubMenuContent.displayName = "RenderSubMenuContent";

export default SubMenu;
