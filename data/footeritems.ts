import {
  faEnvelope,
  faFax,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export const FooterItems = [
  {
    title: "Contact",
    listItems: [
      {
        link: faLocationDot,
        itemName: "National park,d1 588436,United States",
      },
      { link: faPhone, itemName: "+91 123 456 789" },
      { link: faFax, itemName: "0123-456-789" },
      { link: faEnvelope, itemName: "contact@skubey.com" },
    ],
  },
  {
    title: "Information",
    listItems: [
      { link: "/terms", itemName: "Terms & Conditions" },
      { link: "/delivery", itemName: "Delivery Information" },
      { link: "/about", itemName: "About Us" },
      { link: "/privacypolicy", itemName: "Privacy Policy" },
      { link: "/contact", itemName: "Contact Us" },
    ],
  },
  {
    title: "Extras",
    listItems: [
      { link: "/brands", itemName: "Brands" },
      { link: "/giftcertificates", itemName: "Gift Certificates" },
      { link: "/affiliates", itemName: "Affiliate" },
      { link: "/specials", itemName: "Specials" },
      { link: "/sitemap", itemName: "Site Map" },
    ],
  },

  {
    title: "My Account",
    listItems: [
      { link: "/account", itemName: "My Account" },
      { link: "/orderhistory", itemName: "Order History" },
      { link: "/wishlist", itemName: "Wish List" },
      { link: "/newsletter", itemName: "Newsletter" },
      { link: "/returns", itemName: "Returns" },
    ],
  },
];
