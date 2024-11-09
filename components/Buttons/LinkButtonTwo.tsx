import React from "react";
import Link from "next/link";

type Variant = "primary" | "danger";

const LinkButtonTwo = ({
  title,
  href = "/",
  varient = "primary",
  type = "link",
  onClick,
}: {
  title: string;
  href?: string;
  varient?: Variant;
  type?: "button" | "link";
  onClick?: () => void;
}) => {
  return type === "link" ? (
    <Link
      href={href}
      className={`tw-text-sm tw-capitalize tw-no-underline tw-py-2.5 tw-px-7.5 tw-rounded-pillcustom ${
        varient === "primary"
          ? "tw-bg-primary hover:tw-bg-primaryHover tw-text-secondary hover:tw-text-primary tw-transition-all tw-duration-500 tw-ease-in-out"
          : "tw-text-secondary tw-bg-[#da4f49] tw-bg-gradient-to-b tw-from-[#ee5f5b] tw-to-[#bd362f]"
      }`}
    >
      {title}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`tw-text-sm tw-capitalize tw-no-underline tw-py-2.5 tw-px-7.5 tw-rounded-pillcustom ${
        varient === "primary"
          ? "tw-bg-primary hover:tw-bg-primaryHover tw-text-secondary hover:tw-text-primary"
          : "tw-text-secondary tw-bg-[#da4f49] tw-bg-gradient-to-b tw-from-[#ee5f5b] tw-to-[#bd362f]"
      }`}
    >
      {title}
    </button>
  );
};

export default LinkButtonTwo;
