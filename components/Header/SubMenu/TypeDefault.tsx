import React from "react";
import { PagesSubmenu } from "@/data/pages";
import Link from "next/link";

const TypeDefault = () => {
  return (
    <div className=" tw-bg-secondary lg:tw-p-5 max-lg:tw-pt-3 lg:tw-shadow-headerItems">
      <ul className="tw-m-0 tw-p-0">
        {PagesSubmenu.map((page, index) => (
          <li key={index} className="tw-text-left tw-min-w-40">
            <Link
              href={page.href}
              className="tw-block tw-text-secondaryLight hover:tw-text-primary tw-text-sm/5 tw-font-medium tw-py-1.2 tw-no-underline tw-capitalize"
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeDefault;
