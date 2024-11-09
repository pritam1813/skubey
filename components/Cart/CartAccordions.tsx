"use client";
import React, { useState, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AnimateHeight from "react-animate-height";

interface CartAccordionProps {
  title: string;
  children: ReactNode;
}

const CartAccordions = ({ title, children }: CartAccordionProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="tw-mb-5 tw-bg-backgroundColor">
      <h3
        className="tw-m-0 tw-py-2.5 tw-px-5 tw-text-base/5 tw-capitalize tw-relative tw-font-normal tw-bg-secondaryHover tw-text-primary tw-flex tw-justify-between tw-items-center tw-cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {title}
        {menuOpen ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </h3>

      <AnimateHeight duration={500} height={menuOpen ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
};

export default CartAccordions;
