"use client";

import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nosifer } from "next/font/google";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";

const nosifier = Nosifer({
  weight: ["400"],
  subsets: ["latin"],
});

// Merge main breadcrumb component or Improve

export default function Bradcrumb() {
  const segments = useSelectedLayoutSegments();

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
            {segments[segments.length - 1]}
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
            {segments.map((segment, index) => (
              <li
                key={index}
                className="tw-z-10 tw-relative tw-leading-5 tw-whitespace-nowrap"
              >
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  className="tw-w-2.5 tw-h-2.5 lg:tw-w-3 lg:tw-h-3 breadcrumbsign"
                />
                <Link
                  href={`/${segment}`}
                  className={`${
                    index === segments.length - 1
                      ? "tw-text-secondaryLight"
                      : "tw-text-primary"
                  } tw-text-sm lg:tw-text-base tw-no-underline tw-ml-2`}
                >
                  {segment}
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
}