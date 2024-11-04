import React from "react";
import SidebarMenu from ".";
import { MiscMenu } from "@/data/menu";
import Link from "next/link";

const InformationSidebar = () => {
  return (
    <SidebarMenu
      menuTitle="Information"
      menuItems={MiscMenu.map((item, index) => (
        <li key={item.id}>
          <Link
            href={item.path}
            className={`${
              index === 0 ? "-tw-mt-1 tw-pb-2" : "tw-py-2"
            } tw-no-underline tw-text-sm tw-capitalize tw-transition-all tw-duration-300 tw-text-secondaryLight hover:tw-text-primary tw-relative tw-block`}
          >
            {item.title}
          </Link>
        </li>
      ))}
    />
  );
};

export default InformationSidebar;
