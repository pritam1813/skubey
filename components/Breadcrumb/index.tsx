"use client";
import React from "react";
import Image from "next/image";
import { Nosifer } from "next/font/google";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

const nosifier = Nosifer({
  weight: ["400"],
  subsets: ["latin"],
});

const Breadcrumb = () => {
  const pathname = usePathname();

  let title = pathname.split("/")[1];

  switch (title) {
    case "about":
      title = "About Us";
      break;
    case "contact":
      title = "Contact Us";
      break;
    case "privacypolicy":
      title = "Privacy Policy";
      break;
    case "terms":
      title = "Terms & Conditions";
      break;
    default:
      title = "Home";
  }
  return (
    <div className="tw-py-5 lg:tw-py-13 xl:tw-py-25 tw-relative tw-mb-13 lg:tw-mb-13 tw-bg-cover">
      <div className="container text-center ">
        <div id="brdcontr">
          <h2
            className={`${nosifier.className} tw-text-primary tw-text-base/none lg:tw-text-3xl/none tw-mb-[7px] lg:tw-mb-[27px] tw-capitalize tw-relative tw-z-10`}
          >
            {title}
          </h2>
          <ul className="tw-flex tw-m-0 tw-p-0 tw-flex-wrap tw-list-none tw-justify-center tw-gap-2 ">
            <li className="tw-z-10">
              <Link href="/" className="tw-text-primary">
                <FontAwesomeIcon
                  icon={faHome}
                  className="tw-w-3.5 tw-h-3.5 lg:tw-w-[18px] lg:tw-h-[18px]"
                />
              </Link>
            </li>
            <li className="tw-z-10">
              <FontAwesomeIcon
                icon={faAnglesRight}
                className="tw-w-3.5 tw-h-3.5 lg:tw-w-[18px] lg:tw-h-[18px]"
              />
              <Link
                href={pathname}
                className="tw-text-secondaryLight tw-text-sm lg:tw-text-base tw-no-underline tw-ml-2"
              >
                {title}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Image
        src="/images/banners/breadcrumb.jpg"
        alt="breadcrumb background image"
        fill
        priority={true}
        className="tw-object-cover"
      />
    </div>
  );
};

export default Breadcrumb;
