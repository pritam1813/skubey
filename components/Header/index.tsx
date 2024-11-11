"use client";
import React, { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import SearchItems from "./SearchItems";
import HeaderAccountAccess from "./HeaderAccountAccess";
import HeaderCart from "./HeaderCart";
import { usePathname } from "next/navigation";
import MenuItems from "./MenuItems";

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > window.innerHeight
        ? setShowHeader(true)
        : setShowHeader(false);
    };
    const savedState = localStorage.getItem("mobileMenuState");
    if (savedState) {
      setToggleMobileMenu(JSON.parse(savedState));
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 991 && window.innerWidth < 1200) {
      setToggleMobileMenu(null);
    }

    localStorage.setItem("mobileMenuState", JSON.stringify(toggleMobileMenu));
  }, [toggleMobileMenu]);

  const handleMobileMenuToggle = () => {
    setToggleMobileMenu(!toggleMobileMenu);
  };

  const pathname = usePathname();

  return (
    <header
      className={` tw-z-[11] tw-left-0 tw-right-0 ${
        showHeader
          ? "animate__animated animate__fadeInDown tw-fixed tw-bg-secondaryHover tw-top-0 tw-right-0  tw-shadow-header"
          : pathname === "/"
          ? "xl:tw-absolute"
          : ""
      } `}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Logo */}
          <div id="logo" className="col-xl-2 col-lg-6 col-sm-6 col">
            <Link href="/" className="">
              <Image
                src="/logo.svg"
                alt="Skubey Logo"
                width={265}
                height={150}
                priority={true}
                className={` tw-w-auto tw-h-auto max-xl:tw-max-w-[120px] max-xl:tw-py-1.2 ${
                  showHeader ? "tw-max-w-[120px] " : ""
                }`}
              />
            </Link>
          </div>

          {/* Menu on Desktop */}
          <div className="tw-hidden xl:tw-flex tw-justify-center text-lg-center col-xl-8 col-lg-12">
            <nav className="tw-relative bg-transparent">
              <div>
                <div id="navheader"></div>
                <div id="menuwrapper">
                  <span id="cross"></span>
                  <div>
                    <div className="container w-auto p-0 tw-max-w-[1500px]">
                      <ul className="tw-m-0 tw-list-none tw-relative tw-p-0 tw-space-x-[25px]">
                        {/* {Menu.map((item, index) => (
                          <li
                            key={index}
                            className="tw-py-[25px] tw-inline-block"
                          >
                            <MenuItems item={item} />
                          </li>
                        ))} */}
                        <MenuItems />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Utilities */}
          <div className="col-xl-2 col-lg-6 col-sm-6 col tw-flex tw-items-center tw-justify-end xl:tw-py-5 order-xl-2">
            <div className="lg:tw-hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="tw-bg-primaryHover tw-m-0 tw-p-1.2 tw-relative tw-rounded-[5px] tw-w-8 tw-h-8 tw-group"
              >
                {/* <FontAwesomeIcon icon={faBars} /> */}

                <div className="tw-grid tw-gap-1 [&>*]:tw-bg-primary [&>*]:tw-h-0.5 [&>*]:tw-rounded-[1px]">
                  <span className="tw-w-[13px]"></span>
                  <span className="tw-w-[18px]"></span>
                  <span className="tw-w-[22px]"></span>
                </div>
              </button>
            </div>
            <SearchItems />
            <HeaderAccountAccess />
            <HeaderCart />
          </div>
        </div>

        {/* Menu on Tablet */}
        <div className="row align-items-center justify-content-center d-none d-lg-flex d-xl-none">
          <div className="col-lg-12 text-lg-center">
            <nav
              className={`xl:tw-hidden tw-border-t tw-border-borderColor tw-py-1.2 tw-border-solid ${
                showHeader ? "tw-bg-secondaryHover" : "tw-bg-secondary"
              } `}
            >
              <div>
                <div id="navheader"></div>
                <div id="menuwrapper">
                  <div>
                    <div className="container w-auto p-0 tw-max-w-[1500px]">
                      <ul className="tw-m-0 tw-list-none tw-relative tw-p-0 tw-space-x-[25px]">
                        {/* {Menu.map((item, index) => (
                          <li key={index} className="tw-inline-block">
                            <MenuItems item={item} />
                          </li>
                        ))} */}
                        <MenuItems />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Menu on Mobile */}
        <div className="row align-items-center justify-content-center d-lg-none">
          <div className="col-lg-12 text-lg-center">
            <nav
              className={`lg:tw-hidden  tw-block tw-py-5 tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-w-72 tw-z-50 tw-bg-secondary tw-overflow-x-hidden tw-overflow-y-auto  ${
                toggleMobileMenu == null
                  ? "tw-hidden"
                  : toggleMobileMenu == true
                  ? "animate__animated animate__slideInLeft tw-h-screen tw-shadow-mobileHeader tw-pb-16 tw-duration-500"
                  : "animate__animated animate__slideOutLeft tw-h-screen tw-shadow-mobileHeader tw-pb-16 tw-duration-500"
              }`}
            >
              <div>
                <div id="navheader"></div>
                <div id="menuwrapper">
                  <span
                    id="cross"
                    className="tw-block lg:tw-hidden tw-py-2.5 tw-px-3.75 tw-text-right tw-leading-4"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="tw-h-3.5 tw-cursor-pointer"
                      onClick={handleMobileMenuToggle}
                    />
                  </span>

                  <div>
                    <div className="container w-auto p-0 tw-max-w-[720px]">
                      <ul className="tw-m-0 tw-list-none tw-relative tw-p-0">
                        {/* {Menu.map((item, index) => (
                          <li
                            key={index}
                            className="tw-border-b tw-border-borderColor tw-border-solid tw-block tw-py-2.5 tw-px-3.75 tw-float-none tw-w-auto tw-relative -tw-ml-[1px]"
                          >
                            <MobileSubmenu item={item} />
                          </li>
                        ))} */}

                        <MenuItems isMobileScreen={true} />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
