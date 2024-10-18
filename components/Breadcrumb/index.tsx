"use client";
import React from "react";
import Image from "next/image";
import { Nosifer } from "next/font/google";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

const nosifier = Nosifer({
  weight: ["400"],
  subsets: ["latin"],
});

const Breadcrumb = ({
  customTitle = "Not Found",
}: {
  customTitle?: string;
}) => {
  const pathname = usePathname();

  // Don't render breadcrumbs on home page or admin routes
  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbs = pathSegments.map((segment: string, index: number) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <div className="tw-py-5 lg:tw-py-13 xl:tw-py-25 tw-relative tw-mb-13 lg:tw-mb-13 tw-bg-cover">
      <div className="container text-center ">
        <div id="brdcontr">
          <h2
            className={`${nosifier.className} tw-text-primary tw-text-base/none lg:tw-text-3xl/none tw-mb-[7px] lg:tw-mb-[27px] tw-capitalize tw-relative tw-z-10`}
          >
            {/* {customTitle
              ? customTitle
              : breadcrumbs[breadcrumbs.length - 1].label} */}
            {customTitle}
          </h2>
          <ul className="tw-flex tw-m-0 tw-p-0 tw-flex-wrap tw-list-none tw-justify-center tw-gap-2 ">
            <li className="tw-z-10 tw-relative tw-leading-5 tw-whitespace-nowrap">
              <Link
                href="/"
                className="tw-text-primary tw-text-sm lg:tw-text-base tw-no-underline tw-ml-2"
              >
                Home
              </Link>
            </li>
            {breadcrumbs.map((breadcrumb, index) => (
              <li
                key={index}
                className="tw-z-10 tw-relative tw-leading-5 tw-whitespace-nowrap"
              >
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  className="tw-w-2.5 tw-h-2.5 lg:tw-w-3 lg:tw-h-3 breadcrumbsign"
                />
                <Link
                  href={breadcrumb.href}
                  className={`${
                    index === breadcrumbs.length - 1
                      ? "tw-text-secondaryLight"
                      : "tw-text-primary"
                  } tw-text-sm lg:tw-text-base tw-no-underline tw-ml-2`}
                >
                  {index === breadcrumbs.length - 1
                    ? customTitle
                    : breadcrumb.label}
                </Link>
              </li>
            ))}
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
