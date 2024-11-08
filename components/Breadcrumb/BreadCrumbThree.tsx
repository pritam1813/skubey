"use client";
import React from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const BreadcrumbItem = ({ href, label }: { href: string; label: string }) => (
  <li className="tw-z-10 tw-relative tw-leading-5 tw-whitespace-nowrap">
    {href ? (
      <>
        <Link href={href} className="tw-text-blue-500 hover:tw-underline">
          {label}
        </Link>
        <FontAwesomeIcon
          icon={faAnglesRight}
          className="tw-w-2.5 tw-h-2.5 lg:tw-w-3 lg:tw-h-3 breadcrumbsign"
        />
        <Link
          href={href}
          className={` tw-text-sm lg:tw-text-base tw-no-underline tw-ml-2 tw-capitalize`}
        >
          {label}
        </Link>
      </>
    ) : (
      <span className="tw-text-sm lg:tw-text-base tw-no-underline tw-ml-2 tw-capitalize">
        {label}
      </span>
    )}
  </li>
);

interface BreadcrumbProps {
  routes: {
    path: string;
    title: string;
  }[];
}

const BreadcrumbThree = ({ routes }: BreadcrumbProps) => {
  const selectedSegments = useSelectedLayoutSegments();
  console.log("breadcrumb", selectedSegments);

  const breadcrumbItems = routes
    .filter((route) => selectedSegments.includes(route.path))
    .map((route, index) => {
      const href = selectedSegments.slice(0, index + 1).join("/");
      return (
        <BreadcrumbItem
          key={route.path}
          href={href || "/"}
          label={route.title || route.path}
        />
      );
    });

  return (
    <div className="tw-py-5 lg:tw-py-13 xl:tw-py-25 tw-relative tw-mb-13 lg:tw-mb-13 tw-bg-cover">
      <div className="container text-center ">
        <div id="brdcontr">
          <ul className="tw-flex tw-m-0 tw-p-0 tw-flex-wrap tw-list-none tw-justify-center tw-gap-2 ">
            {breadcrumbItems}
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

export default BreadcrumbThree;
