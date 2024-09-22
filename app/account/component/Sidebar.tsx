"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimateHeight from "react-animate-height";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const accountMenu = [
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Register",
    link: "/register",
  },
  {
    name: "Forgotten Password",
    link: "/forgotpassword",
  },
  {
    name: "Newsletter",
    link: "/newsletter",
  },
];

const innformatonMenu = [
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
  {
    name: "Privacy Policy",
    link: "/privacypolicy",
  },
  {
    name: "Terms & Conditions",
    link: "/terms",
  },
  {
    name: "Site Map",
    link: "/sitemap",
  },
];

const Sidebar = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

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

  const toggleAccount = () => {
    if (!isLargeScreen) {
      setAccountOpen(!accountOpen);
    }
  };

  const toggleInfo = () => {
    if (!isLargeScreen) {
      setInfoOpen(!infoOpen);
    }
  };

  const renderMenuItems = (menuItems: { name: string; link: string }[]) => (
    <ul className="tw-block tw-p-5 tw-m-0 tw-rounded-none tw-list-none">
      {menuItems.map((item, index) => (
        <li key={index}>
          <Link
            href={item.link}
            className={`${
              index === 0 ? "-tw-mt-1 tw-pb-2" : "tw-py-2"
            } tw-no-underline tw-text-sm tw-capitalize tw-transition-all tw-duration-300 tw-text-secondaryLight hover:tw-text-primary tw-relative tw-block`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside id="sidebarleft" className="col-sm-3 tw-order-2 lg:tw-order-1">
      <div className="tw-mb-7.5 tw-bg-backgroundColor">
        <h3
          className="tw-m-0 tw-py-2.5 tw-px-5 tw-text-base/5 tw-capitalize tw-relative tw-font-normal tw-bg-secondaryHover tw-text-primary tw-flex tw-justify-between tw-items-center tw-cursor-pointer"
          onClick={toggleAccount}
        >
          Account
          {!isLargeScreen &&
            (accountOpen ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            ))}
        </h3>

        <AnimateHeight
          duration={500}
          height={isLargeScreen || accountOpen ? "auto" : 0}
        >
          {renderMenuItems(accountMenu)}
        </AnimateHeight>
      </div>
      <div className="tw-bg-backgroundColor">
        <h3
          className="tw-m-0 tw-py-2.5 tw-px-5 tw-text-base/5 tw-capitalize tw-relative tw-font-normal tw-bg-secondaryHover tw-text-primary tw-flex tw-justify-between tw-items-center tw-cursor-pointer"
          onClick={toggleInfo}
        >
          Information
          {!isLargeScreen &&
            (infoOpen ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            ))}
        </h3>

        <AnimateHeight
          duration={500}
          height={isLargeScreen || infoOpen ? "auto" : 0}
        >
          {renderMenuItems(innformatonMenu)}
        </AnimateHeight>
      </div>
    </aside>
  );
};

export default Sidebar;
