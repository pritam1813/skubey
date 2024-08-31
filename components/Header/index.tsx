import React from "react";
import {
  faAngleDown,
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "@/data/menu";

const Header = () => {
  return (
    <header className="xl:tw-absolute tw-z-[11] tw-left-0 tw-right-0">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          {/* Logo */}
          <div className="col-xl-2 col-lg-6 col-sm-6 col">
            <Link href="/" className="">
              <Image
                src="logo.svg"
                alt="skubey logo"
                width={250}
                height={150}
                className="tw-max-w-[120px] xl:tw-max-w-full tw-py-1 xl:tw-py-0"
              />
            </Link>
          </div>

          {/* Utilities */}
          <div className="col-xl-2 col-lg-6 col-sm-6 col order-xl-2 d-flex justify-content-end align-items-center tw-space-x-4 md:tw-space-x-5 lg:tw-space-x-7 tw-py-5">
            <button
              id="navbartoggle"
              className="d-block d-lg-none tw-m-0 tw-bg-primaryHover tw-p-[5px]"
            >
              <FontAwesomeIcon icon={faBars} className="tw-w-5 tw-h-5" />
            </button>
            <Link href="/search" className="tw-text-primary">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="tw-w-5 tw-h-5"
              />
            </Link>
            <Link href="/user" className="tw-text-primary">
              <FontAwesomeIcon icon={faUser} className="tw-w-5 tw-h-5" />
            </Link>
            <Link href="/cart" className="tw-text-primary">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="tw-w-5 tw-h-5"
              />
            </Link>
          </div>

          {/* Menu for xl screens and above */}
          <div className=" col-xl-8 col-lg-12 col-0 d-none d-lg-flex  order-xl-1 text-lg-center justify-content-center">
            <div className="container d-flex justify-content-center tw-border-t tw-border-t-borderColor xl:tw-border-0 tw-py-[5px]">
              <nav className="position-relative">
                <ul className="d-flex tw-space-x-6 align-items-center p-0 m-0 list-unstyled ">
                  {Menu.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.path}
                        className="text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold tw-py-[15px] hover:tw-text-secondaryLight hoverUnderlineStyle"
                      >
                        {item.title}
                        {item.submenuItems ? (
                          <FontAwesomeIcon
                            icon={faAngleDown}
                            className="tw-text-sm/4 tw-w-[14px] tw-h-[14px] d-inline-block tw-pl-1 "
                          />
                        ) : (
                          ""
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
