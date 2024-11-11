import React from "react";
import SidebarMenu from ".";
import ProductsThumbnail from "../Products/ProductsThumbnail";
import "./accountStyle.scss";
import Image from "next/image";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { Category } from "@/app/types/category";
import { Product } from "@/app/types/product";
import CategorySidebarMenuItems from "./CategorySidebarMenuItems";

interface CategoryMenu extends Category {
  children: CategoryMenu[];
}

const ProductSidebar = async () => {
  const res = await fetch(`${getBaseUrl()}/api/category`);
  if (!res.ok) {
    return <div>Failed to fetch data</div>;
  }
  const { categories }: { categories: CategoryMenu[] } = await res.json();

  // Fetching Only 3 bestseller
  const data = await fetch(
    `${getBaseUrl()}/api/products?categoryId=${
      categories.find((cat) => cat.slug === "bestseller")?.id
    }&limit=3`
  );
  const { products }: { products: Product[] } = await data.json();

  return (
    <aside id="sidebarleft" className="col-sm-3 tw-order-2 lg:tw-order-1">
      {categories && (
        <SidebarMenu
          menuTitle="Categories"
          menuItems={<CategorySidebarMenuItems categories={categories} />}
        />
      )}

      {products && (
        <SidebarMenu
          menuTitle="Bestseller"
          menuItems={products.slice(0, 3).map((product, index) => (
            <li key={index} className="tw-my-2.5">
              <ProductsThumbnail product={product} />
            </li>
          ))}
        />
      )}

      <div className="tw-relative tw-h-96 tw-hidden lg:tw-block">
        <Image
          src="/images/banners/category_banner2.jpg"
          alt="Sidebar banner"
          fill={true}
          sizes="(min-width: 808px) 50vw, 100vw"
          className="tw-object-cover"
        />
      </div>
    </aside>
  );
};

export default ProductSidebar;
