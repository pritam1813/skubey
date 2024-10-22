import React from "react";
import { Product } from "@/app/types";
import CustomSelect from "@/components/Dropdown/CustomSelect";

import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsCard from "@/components/Products/ProductsCard";

const sortOptions = [
  { text: "Price: Low to High", value: "price_asc" },
  { text: "Price: High to Low", value: "price_desc" },
  { text: "Name: A to Z", value: "name_asc" },
  { text: "Name: Z to A", value: "name_desc" },
];
const limitOptions = [
  { text: "9", value: "12" },
  { text: "24", value: "24" },
  { text: "36", value: "36" },
];

function PaginationButton({
  isCurrentPage,
  children,
}: {
  isCurrentPage: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`${
        isCurrentPage
          ? "tw-bg-primaryHover tw-text-primary"
          : "tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary"
      } tw-w-10 tw-h-10 tw-leading-10 tw-text-center tw-rounded-cardcustom tw-block hover:tw-cursor-pointer`}
    >
      {children}
    </span>
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = await fetch("http://localhost:3000/api/product");
  const data = await result.json();
  // console.log(data);

  return (
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
                <FontAwesomeIcon icon={faTh} className="tw-w-7.5 tw-h-7.5" />
              </button>
              <button
                id="swithtolistdisplay"
                className="tw-relative tw-float-left tw-leading-6 tw-ml-3.75 tw-w-7.5 tw-h-7.5 tw-transition-all tw-duration-700 tw-text-primary hover:tw-text-primaryHover"
              >
                <FontAwesomeIcon icon={faList} className="tw-w-7.5 tw-h-7.5" />
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
              />
            </div>
            <div id="limit" className="tw-inline-block tw-align-middle">
              <CustomSelect
                label="Show : "
                selectId="limit_items"
                options={limitOptions}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="category_row" className="row">
        {data.slice(0, 9).map((product: Product, index: number) => (
          <ProductsCard
            product={product}
            key={index}
            columnsStyle="col-lg-4 col-md-6 col-sm-4 col-xs-4"
          />
        ))}
      </div>

      <div
        id="pagination_Main"
        className="tw-py-2.5 tw-px-3.75 tw-bg-backgroundColor"
      >
        <div className="tw-flex tw-justify-between">
          <div className="tw-py-2.5">showing 1of 10</div>
          <ul className="tw-m-0 tw-p-0 tw-space-x-2 tw-flex">
            <li id="previous_page">
              <PaginationButton isCurrentPage={true}>1</PaginationButton>
            </li>
            <li id="current_page">
              <PaginationButton isCurrentPage={false}>2</PaginationButton>
            </li>
            <li id="next_page">
              <PaginationButton isCurrentPage={false}>{">"}</PaginationButton>
            </li>
            <li id="last_page">
              <PaginationButton isCurrentPage={false}>{">|"}</PaginationButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
