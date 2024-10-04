"use client";
import React, { useEffect, useRef, useState } from "react";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartStore } from "@/app/stores/CartStore";
import Link from "next/link";
import Image from "next/image";

const HeaderCart = () => {
  const [headerCartDropDown, setHeaderCartDropDown] = useState(false);
  const { items, removeItem, getTotalPrice } = useCartStore((state) => state);
  const fallbackImageUrl = "/products/1.jpg";
  const gstontotal = (18 / 100) * getTotalPrice();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setHeaderCartDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div id="cart" className="tw-relative tw-align-middle">
        <button
          className="tw-text-primary tw-py-5"
          onClick={() => setHeaderCartDropDown(!headerCartDropDown)}
          ref={buttonRef}
        >
          <FontAwesomeIcon icon={faCartShopping} className="tw-w-5 tw-h-5" />
          <span
            id="cartTotal"
            className="tw-pt-[3px] tw-pl-[3px] tw-pb-0.5 tw-pr-0.5 tw-absolute -tw-right-2.5 tw-top-1.2 tw-bg-primary tw-text-primaryHover tw-text-xs/3 tw-rounded-full tw-min-w-[17px] tw-z-[1] tw-text-center"
          >
            {items.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>
        {headerCartDropDown && items.length > 0 && (
          <ul
            style={{ minWidth: "unset" }}
            className="tw-w-[300px] tw-z-[1001] tw-p-0 tw-right-0 tw-left-auto tw-absolute tw-top-full tw-shadow-headerItems tw-bg-[#fff] tw-m-0"
            ref={dropdownRef}
          >
            <li
              id="cartcontenproduct"
              className="tw-max-h-[223px] tw-overflow-y-auto tw-overflow-x-hidden tw-px-5"
            >
              <table className="tw-mb-2.5 tw-border-none tw-w-full">
                <tbody>
                  {items.map((item) => (
                    <tr className="tw-my-5 tw-pb-5 tw-relative tw-border-b tw-border-solid tw-border-borderColor tw-block">
                      <td className="tw-p-0 tw-w-[70px]">
                        <Link href={`product/${item.id}`}>
                          <Image
                            src={
                              `${process.env
                                .NEXT_PUBLIC_SUPABASE_PROJECT_ID_DEV!}/${
                                item.image.url
                              }` || fallbackImageUrl
                            }
                            alt={item.image.alt}
                            width={60}
                            height={71}
                            className="tw-border-solid tw-border-2 tw-border-primaryHover tw-rounded-md"
                          />
                        </Link>
                      </td>
                      <td className="tw-px-2.5 tw-py-1.2 tw-text-sm">
                        <Link
                          href={`product/${item.id}`}
                          className="tw-font-medium tw-inline-block tw-no-underline tw-text-primary"
                        >
                          {item.name}
                        </Link>
                        <div className="tw-mt-1.2">
                          <span className="tw-inline-block">
                            {item.quantity} x{" "}
                          </span>
                          <span className="tw-font-medium tw-text-secondaryLight">
                            {" "}
                            &#8377; {item.price}
                          </span>
                        </div>
                      </td>
                      <td className="tw-absolute tw-top-0 tw-p-0 tw-right-0">
                        <button onClick={() => removeItem(item.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="tw-w-3 tw-h-3"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
            <li className=" tw-relative tw-border-t tw-border-solid tw-border-borderColor tw-pt-2.5 tw-mx-5">
              <div className="">
                <table className="tw-mb-2.5 tw-border-none tw-w-full tw-m-0">
                  <tbody>
                    <tr>
                      <td className="tw-text-left">Price</td>
                      <td className="tw-text-right">
                        &#8377; {getTotalPrice().toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="tw-text-left">GST{" (18%)"}</td>
                      <td className="tw-text-right">
                        &#8377; {gstontotal.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="tw-text-left">Subtotal</td>
                      <td className="tw-text-right">
                        &#8377; {(getTotalPrice() + gstontotal).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="tw-m-0 tw-pb-5 tw-flex tw-justify-between">
                  <Link
                    href="/cart"
                    className="tw-inline-block tw-text-secondary hover:tw-text-primary tw-no-underline tw-rounded-md tw-bg-primary hover:tw-bg-primaryHover tw-py-2.5 tw-px-6 tw-text-sm/5 tw-transition-all tw-duration-500"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    className="tw-inline-block tw-text-secondary hover:tw-text-primary tw-no-underline tw-rounded-md tw-bg-primary hover:tw-bg-primaryHover tw-py-2.5 tw-px-6 tw-text-sm/5 tw-transition-all tw-duration-500"
                  >
                    Checkout
                  </Link>
                </p>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeaderCart;
