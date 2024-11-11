"use client";
import React from "react";

import { generatePagination } from "@/app/utils/generatePagination";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const PaginationMain = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages === undefined) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);
  return (
    <div className="tw-m-0 tw-p-0 tw-space-x-2 tw-flex">
      <PaginationButton
        title="Previous Page"
        href={createPageURL(currentPage - 1)}
        isActive={currentPage <= 1}
      >
        {"<"}
      </PaginationButton>

      {allPages.map((page, index) => {
        let position: "first" | "last" | "single" | "middle" | undefined;

        if (index === 0) position = "first";
        if (index === allPages.length - 1) position = "last";
        if (allPages.length === 1) position = "single";
        if (page === "...") position = "middle";

        return (
          <PaginationButton
            key={page}
            title={`Page ${page}`}
            href={createPageURL(page)}
            position={position}
            isActive={currentPage === page}
          >
            {page}
          </PaginationButton>
        );
      })}

      <PaginationButton
        title="Next Page"
        href={createPageURL(currentPage + 1)}
        isActive={currentPage >= totalPages}
      >
        {">"}
      </PaginationButton>
    </div>
  );
};

function PaginationButton({
  title,
  isActive,
  children,
  position,
  href,
}: {
  title?: string;
  page?: number | string;
  isActive: boolean;
  children: React.ReactNode;
  position?: "first" | "last" | "middle" | "single";
  href: string;
}) {
  return isActive || position === "middle" ? (
    <span
      title={title}
      className={`${
        isActive
          ? "tw-bg-primaryHover tw-text-primary"
          : "tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary"
      } tw-w-10 tw-h-10 tw-leading-10 tw-text-center tw-rounded-cardcustom tw-block hover:tw-cursor-pointer`}
    >
      {children}
    </span>
  ) : (
    <Link
      title={title}
      href={href}
      className={`${
        isActive
          ? "tw-bg-primaryHover tw-text-primary"
          : "tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary"
      } tw-w-10 tw-h-10 tw-leading-10 tw-text-center tw-rounded-cardcustom tw-block tw-no-underline hover:tw-cursor-pointer`}
    >
      {children}
    </Link>
  );
}

export default PaginationMain;
