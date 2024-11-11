// import React from "react";
// import Link from "next/link";
// import SubMenuDropdownButton from "../Buttons/SubMenuDropdownButton";
// import { HeaderMenu } from "@/data/headermenu";
// import SubMenuDropdownButton from "../Buttons/SubMenuDropdownButton2";

// const MenuItems = ({
//   isMobileScreen = false,
// }: {
//   isMobileScreen?: boolean;
// }) => {
//   const categoryWiseToys = ["featured", "latest", "bestseller"];
//   return (
//     <>
//       {HeaderMenu.map((item, index) => (
//         <li
//           className={`${
//             isMobileScreen
//               ? "tw-border-b tw-border-borderColor tw-border-solid tw-block tw-py-2.5 tw-px-3.75 tw-float-none tw-w-auto tw-relative -tw-ml-[1px]"
//               : "tw-py-[25px] tw-inline-block"
//           }`}
//           key={index}
//         >
//           {item.type === "link" ? (
//             isMobileScreen ? (
//               <SubMenuDropdownButton2 title={item.title} isMobileScreen />
//             ) : (
//               <Link
//                 href={item.path || "/"}
//                 className="text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold tw-py-[15px] hover:tw-text-secondaryLight hoverUnderlineStyle"
//               >
//                 {item.title}
//               </Link>
//             )
//           ) : isMobileScreen ? (
//             <SubMenuDropdownButton2
//               title={item.title}
//               categories={categoryWiseToys}
//               isMobileScreen
//             >
//               {item.content && <item.content />}
//             </SubMenuDropdownButton2>
//           ) : (
//             <SubMenuDropdownButton2
//               title={item.title}
//               categories={categoryWiseToys}
//               hasLabel={item.title === "Categories" || item.title === "Product"}
//               LabelStyle={
//                 item.title === "Categories"
//                   ? "tw-text-primary OfferSubmenu"
//                   : "tw-text-secondary HotSubmenu"
//               }
//             >
//               {item.content && <item.content />}
//             </SubMenuDropdownButton2>
//           )}
//         </li>
//       ))}
//     </>
//   );
// };

// export default MenuItems;

import React from "react";
import Link from "next/link";
import { HeaderMenu } from "@/data/headermenu";
import SubMenuDropdownButton from "../Buttons/SubMenuDropdownButton";

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

const MenuItems = ({
  isMobileScreen = false,
}: {
  isMobileScreen?: boolean;
}) => {
  const categoryWiseToys = ["featured", "latest", "bestseller"];

  const getMenuItemStyle = () =>
    isMobileScreen
      ? "tw-border-b tw-border-borderColor tw-border-solid tw-block tw-py-2.5 tw-px-3.75 tw-float-none tw-w-auto tw-relative -tw-ml-[1px]"
      : "tw-py-[25px] tw-inline-block";

  const renderMenuItem = (item: any) => {
    if (item.type === "link") {
      return isMobileScreen ? (
        <SubMenuDropdownButton title={item.title} isMobileScreen />
      ) : (
        <Link
          href={item.path || "/"}
          className="text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold tw-py-[15px] hover:tw-text-secondaryLight hoverUnderlineStyle"
        >
          {item.title}
        </Link>
      );
    }

    const labelStyle =
      item.title === "Categories"
        ? "tw-text-primary OfferSubmenu"
        : "tw-text-secondary HotSubmenu";

    return (
      <SubMenuDropdownButton
        title={item.title}
        categories={categoryWiseToys}
        isMobileScreen={isMobileScreen}
        hasLabel={
          !isMobileScreen &&
          (item.title === "Categories" || item.title === "Product")
        }
        LabelStyle={labelStyle}
      >
        {item.content && <item.content />}
      </SubMenuDropdownButton>
    );
  };

  return (
    <>
      {HeaderMenu.map((item, index) => (
        <li className={getMenuItemStyle()} key={index}>
          {renderMenuItem(item)}
        </li>
      ))}
    </>
  );
};

export default MenuItems;
