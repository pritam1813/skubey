import React from "react";
import SidebarMenu from "@/components/SidebarMenu";
import ProductsThumbnail from "@/components/Products/ProductsThumbnail";
import Link from "next/link";
import "../../account/accountStyle.scss";
import Image from "next/image";
import {
  CategoriesProps,
  CategoryWiseProductThumbnailProps,
} from "@/app/types";

const CategorySidebar = async () => {
  const categories: CategoriesProps[] = await fetch(
    `http://localhost:3000/api/category`
  ).then((res) => res.json());

  const bestsellerProducts: CategoryWiseProductThumbnailProps = await fetch(
    `http://localhost:3000/api/category/bestseller`
  ).then((res) => res.json());

  return (
    <aside id="sidebarleft" className="col-sm-3 tw-order-2">
      <SidebarMenu
        menuTitle="Categories"
        menuItems={categories.map((category, index) => (
          <li key={index}>
            <Link
              href={`/category/${category.categoryName}`}
              className={`${
                index === 0 ? "-tw-mt-1 tw-pb-2" : "tw-py-2"
              } tw-no-underline tw-text-sm tw-capitalize tw-transition-all tw-duration-300 tw-text-secondaryLight hover:tw-text-primary tw-relative tw-block`}
            >
              {category.categoryName}
            </Link>
          </li>
        ))}
      />

      <SidebarMenu
        menuTitle="Bestseller"
        menuItems={bestsellerProducts.products
          .slice(0, 3)
          .map((product, index) => (
            <li key={index} className="tw-my-2.5">
              <ProductsThumbnail product={product} />
            </li>
          ))}
      />

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

export default CategorySidebar;
