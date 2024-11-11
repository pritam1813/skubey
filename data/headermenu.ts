import TypeDefault from "@/components/Header/SubMenu/TypeDefault";
import TypeOne from "@/components/Header/SubMenu/TypeOne";
import TypeThree from "@/components/Header/SubMenu/TypeThree";
import TypeTwo from "@/components/Header/SubMenu/TypeTwo";

export const HeaderMenu = [
  {
    title: "Home",
    type: "link",
    path: "/",
  },
  {
    title: "Shop",
    type: "Dropdown",
    content: TypeOne,
  },
  {
    title: "Categories",
    type: "Dropdown",
    content: TypeTwo,
  },
  {
    title: "Product",
    type: "Dropdown",
    content: TypeThree,
  },
  {
    title: "Pages",
    type: "Dropdown",
    content: TypeDefault,
  },
  {
    title: "About",
    type: "link",
    path: "/about",
  },
];
