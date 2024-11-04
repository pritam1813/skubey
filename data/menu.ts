export const Menu = [
  {
    id: 1,
    title: "Home",
    path: "/",
    submenu: false,
    submenuType: 4,
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
    submenuType: 1,
  },
  {
    id: 3,
    title: "Categories",
    path: "/categories",
    submenu: true,
    submenuItems: [],
    submenuType: 2,
  },
  {
    id: 4,
    title: "Product",
    path: "/products",
    submenu: true,
    submenuItems: [],
    submenuType: 3,
  },
  {
    id: 5,
    title: "Pages",
    path: "/pages",
    submenu: true,
    submenuItems: [],
    submenuType: 4,
  },
  {
    id: 6,
    title: "Blog",
    path: "/blog",
    submenu: false,
    submenuType: 4,
  },
];

export const MiscMenu = [
  {
    id: 1,
    title: "About Us",
    path: "/about",
  },
  {
    id: 2,
    title: "Contact Us",
    path: "/contact",
  },
  {
    id: 3,
    title: "FAQs",
    path: "/faqs",
  },
  {
    id: 4,
    title: "Privacy Policy",
    path: "/privacy",
  },
  {
    id: 5,
    title: "Terms & Conditions",
    path: "/terms",
  },
];

export const AuthMenu = [
  {
    title: "Login",
    path: "/login",
    isAuthRequired: false,
    showOnHeader: true,
    showAfterAuth: false,
  },
  {
    title: "Register",
    path: "/signup",
    isAuthRequired: false,
    showOnHeader: true,
    showAfterAuth: false,
  },
  {
    title: "Forgot Password",
    path: "/forgotpassword",
    isAuthRequired: false,
    showOnHeader: false,
    showAfterAuth: false,
  },
  {
    title: "My Account",
    path: "/user",
    isAuthRequired: true,
    showOnHeader: true,
    showAfterAuth: true,
  },
  {
    title: "Address Book",
    path: "/addressbook",
    isAuthRequired: true,
    showOnHeader: false,
    showAfterAuth: true,
  },
  {
    title: "Wish List",
    path: "/wishlist",
    isAuthRequired: true,
    showOnHeader: false,
    showAfterAuth: true,
  },
  {
    title: "Order History",
    path: "/orderhistory",
    isAuthRequired: true,
    showOnHeader: true,
    showAfterAuth: true,
  },
  {
    title: "Returns",
    path: "/returns",
    isAuthRequired: true,
    showOnHeader: false,
    showAfterAuth: true,
  },
  {
    title: "Transactions",
    path: "/transactions",
    isAuthRequired: true,
    showOnHeader: true,
    showAfterAuth: true,
  },
  {
    title: "Newsletter",
    path: "/newsletter",
    isAuthRequired: false,
    showOnHeader: false,
    showAfterAuth: true,
  },
  {
    title: "Logout",
    path: "/logout",
    isAuthRequired: true,
    showOnHeader: true,
    showAfterAuth: true,
  },
];
