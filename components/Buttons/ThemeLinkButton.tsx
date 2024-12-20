import React from "react";
import Link from "next/link";

const ThemeButton = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      href={href}
      className="tw-text-sm lg:tw-text-base tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-no-underline tw-py-2.5 tw-px-5 tw-rounded-pillcustom tw-transition-all tw-duration-500 tw-ease-in-out"
    >
      {title}
    </Link>
  );
};

export default ThemeButton;
