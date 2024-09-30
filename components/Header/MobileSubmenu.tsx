"use client";
import React, { useRef, useState, MouseEvent, useEffect } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AnimateHeight from "react-animate-height";
import { MenuItem } from "./MenuItems";
import { RenderSubMenuContent } from "./SubMenu";

const MobileSubmenu = ({ item }: { item: MenuItem }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [height, setHeight] = useState<string | number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  const handleSubmenuShow = (e: MouseEvent) => {
    e.preventDefault();
    setShowSubmenu(!showSubmenu);
    setHeight(height === 0 ? "auto" : 0);
  };
  return (
    <>
      <Link
        href={item.path}
        passHref
        className="text-decoration-none tw-text-primary tw-flex  tw-justify-between position-relative tw-text-base/5 tw-font-bold lg:tw-py-[15px] hover:tw-text-secondaryLight"
        onClick={handleSubmenuShow}
      >
        {item.title}{" "}
        {item.submenuItems ? (
          <button
            ref={buttonRef}
            className={`tw-w-5 tw-h-5  ${
              showSubmenu
                ? "tw-bg-primaryHover tw-text-primary"
                : "tw-bg-primary tw-text-secondary"
            } `}
            onClick={(e) => handleSubmenuShow(e)}
          >
            <FontAwesomeIcon
              icon={showSubmenu ? faMinus : faPlus}
              className="tw-text-base/4 d-inline-block"
            />
          </button>
        ) : (
          ""
        )}
      </Link>
      <AnimateHeight duration={500} height={height as number}>
        <RenderSubMenuContent
          ref={dropdownRef}
          id={item.id}
          path={item.path}
          title={item.title}
          submenuType={item.submenuType}
        />
      </AnimateHeight>
    </>
  );
};

export default MobileSubmenu;
