import React from "react";
import Link from "next/link";
import SubMenu from "./SubMenu";

export enum SubmenuType {
  "one" = 1,
  "two" = 2,
  "three" = 3,
  "default" = 4,
}

export type MenuItem = {
  id: number;
  path: string;
  title: string;
  submenu?: boolean;
  submenuItems?: {
    id: number;
    path: string;
    title: string;
  }[];
  submenuType: SubmenuType;
};

const MenuItems = ({ item }: { item: MenuItem }) => {
  return (
    <>
      {item.submenu ? (
        <SubMenu item={item} />
      ) : (
        <Link
          href={item.path}
          className="text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold tw-py-[15px] hover:tw-text-secondaryLight hoverUnderlineStyle"
        >
          {" "}
          {item.title}{" "}
        </Link>
      )}
    </>
  );
};

export default MenuItems;
