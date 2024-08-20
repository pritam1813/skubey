export const Menu = [
  {
    id: 1,
    title: "Home",
    path: "/",
    submenu: false,
  },
  {
    id: 2,
    title: "Shop",
    path: "/shop",
    submenu: true,
    submenuItems: [
      {
        id: 1,
        title: "Submenu 1",
        path: "/submenu1",
      },
      {
        id: 2,
        title: "Submenu 2",
        path: "/submenu2",
      },
    ],
  },
  {
    id: 3,
    title: "Categories",
    path: "/categories",
    submenu: true,
    submenuItems: [],
  },
  {
    id: 4,
    title: "Products",
    path: "/products",
    submenu: true,
    submenuItems: [],
  },
  {
    id: 5,
    title: "Pages",
    path: "/pages",
    submenu: true,
    submenuItems: [],
  },
  {
    id: 6,
    title: "Blog",
    path: "/blog",
    submenu: false,
  },
];
