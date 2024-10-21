"use client";
import React, { useEffect, useState, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AnimateHeight from "react-animate-height";

interface SidebarMenuProps {
  menuTitle: string;
  menuItems: ReactNode;
}

const SidebarMenu = ({ menuTitle, menuItems }: SidebarMenuProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 991);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    if (!isLargeScreen) {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <div className="tw-mb-5 lg:tw-mb-10 tw-bg-backgroundColor">
      <h3
        className="tw-m-0 tw-py-2.5 tw-px-5 tw-text-base/5 tw-capitalize tw-relative tw-font-normal tw-bg-secondaryHover tw-text-primary tw-flex tw-justify-between tw-items-center tw-cursor-pointer"
        onClick={toggleMenu}
      >
        {menuTitle}
        {!isLargeScreen &&
          (menuOpen ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          ))}
      </h3>

      <AnimateHeight
        duration={500}
        height={isLargeScreen || menuOpen ? "auto" : 0}
      >
        <ul className="tw-block tw-p-5 tw-m-0 tw-rounded-none tw-list-none">
          {menuItems}
        </ul>
      </AnimateHeight>
    </div>
  );
};

export default SidebarMenu;
