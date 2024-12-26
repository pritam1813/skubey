import React, { Suspense } from "react";
import { type Product } from "@/app/types/product";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import Breadcrumb from "@/components/Breadcrumb";
import ProductSidebar from "@/components/SidebarMenu/ProductSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "@/components/Dropdown/CustomSelect";
import ProductCard from "@/components/ProductCard";
import PaginationMain from "@/components/PaginationMain";

const sortOptions = [
  { text: "Price: Low to High", value: ["price", "asc"] },
  { text: "Price: High to Low", value: ["price", "desc"] },
  { text: "Name: A to Z", value: ["name", "asc"] },
  { text: "Name: Z to A", value: ["name", "desc"] },
];

const limitOptions = [
  { text: "9", value: "9" },
  { text: "24", value: "24" },
  { text: "36", value: "36" },
];

export default async function Product(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const queryString = new URLSearchParams();
  const currentPage = Number(searchParams?.page) || 1;
  const currentLimit = Number(searchParams?.limit) || 9;

  // Adding each search parameter to the query string
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryString.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => queryString.append(key, v));
    }
  });

  console.log("Product Page Base URL: ", getBaseUrl());

  const response = await fetch(
    `${getBaseUrl()}/api/products?${queryString.toString()}`
  );

  const data: {
    products: Product[];
    total: number;
    pages: number;
  } = await response.json();

  return (
    <main id="Product Page Main">
      <Breadcrumb customTitle="Products" />
      <div className="container">
        <div className="row">
          <ProductSidebar />

          <div
            id="category_content"
            className="col-sm-9 tw-w-4/5 tw-order-1 lg:tw-order-2"
          >
            <div
              id="category_info"
              className="tw-bg-secondaryHover tw-mb-7.5 tw-px-3.75 tw-py-2.5"
            >
              <div className="row">
                <div className="col-sm-2 col-xs-5 category_list_grid">
                  <div className="btn-group btn-group-sm tw-align-bottom">
                    <button
                      id="switchtogriddisplay"
                      className="tw-w-7.5 tw-h-7.5 tw-relative tw-float-left tw-leading-6 tw-transition-all tw-duration-700 tw-text-primary hover:tw-text-primaryHover"
                    >
                      <FontAwesomeIcon
                        icon={faTh}
                        className="tw-w-7.5 tw-h-7.5"
                      />
                    </button>
                    <button
                      id="swithtolistdisplay"
                      className="tw-relative tw-float-left tw-leading-6 tw-ml-3.75 tw-w-7.5 tw-h-7.5 tw-transition-all tw-duration-700 tw-text-primary hover:tw-text-primaryHover"
                    >
                      <FontAwesomeIcon
                        icon={faList}
                        className="tw-w-7.5 tw-h-7.5"
                      />
                    </button>
                  </div>
                </div>

                <div className="col-sm-3 col-xs-5 category_compare tw-text-right">
                  Product Compare
                </div>
                <div className="col-sm-7 col-xs-12 tw-float-right tw-text-right tw-inline-block tw-relative">
                  <div
                    id="sort"
                    className="tw-inline-block tw-align-middle tw-mr-2.5"
                  >
                    <CustomSelect
                      label="Sort By : "
                      selectId="sort"
                      options={sortOptions}
                      type="sort"
                    />
                  </div>
                  <div id="limit" className="tw-inline-block tw-align-middle">
                    <CustomSelect
                      label="Show : "
                      selectId="limit_items"
                      options={limitOptions}
                      type="limit"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Suspense
              key={queryString.toString() + currentPage}
              fallback={<div>loading</div>}
            >
              <div id="category_row" className="row">
                {data.products.length === 0 && (
                  <div className="tw-text-center tw-mb-4">
                    Product not found
                  </div>
                )}
                {data.products.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={index}
                    columnsStyle="col-lg-4 col-md-6 col-sm-4 col-xs-4"
                  />
                ))}
              </div>
            </Suspense>

            <div
              id="pagination_Main"
              className="tw-py-2.5 tw-px-3.75 tw-bg-backgroundColor"
            >
              <div className="tw-flex tw-justify-between">
                {currentPage <= data.pages ? (
                  <div className="tw-py-2.5">
                    Showing {(currentPage - 1) * currentLimit + 1} to{" "}
                    {Math.min(currentPage * currentLimit, data.total)} of{" "}
                    {data.total} products
                  </div>
                ) : (
                  <div className="tw-py-2.5">
                    Showing 0 to 0 of {data.total} products
                  </div>
                )}
                {currentPage <= data.pages && (
                  <PaginationMain totalPages={data.pages} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
