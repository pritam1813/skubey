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
  const displayedItems = items.slice(0, 3);
  const remainingItemsCount = Math.max(items.length - 3, 0);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
          {items.length > 0 && (
            <span
              id="cartTotal"
              className="tw-pt-[3px] tw-pl-[3px] tw-pb-0.5 tw-pr-0.5 tw-absolute -tw-right-2.5 tw-top-1.2 tw-bg-primary tw-text-primaryHover tw-text-xs/3 tw-rounded-full tw-min-w-[17px] tw-z-[1] tw-text-center"
            >
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
        {headerCartDropDown && items.length > 0 && (
          <div
            ref={dropdownRef}
            id="cartheaderview"
            className="tw-absolute tw-w-72 tw-bg-secondary tw-z-[1000] tw-shadow-headerItems tw-right-0 tw-p-3"
          >
            <ul className="tw-p-0 tw-m-0">
              {displayedItems.map((item) => (
                <li
                  key={item.id}
                  className="tw-py-2.5 tw-px-2 tw-border-b tw-border-solid tw-border-borderColor"
                >
                  <div className="tw-grid tw-grid-rows-2 tw-grid-flow-col tw-gap-1">
                    <div className="tw-row-span-2 tw-justify-self-center">
                      <Link href={`${item.id}`}>
                        <Image
                          src={item.image.url || fallbackImageUrl}
                          alt={item.image.alt}
                          width={72}
                          height={86}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = fallbackImageUrl;
                          }}
                        />
                      </Link>
                    </div>
                    <div className="tw-col-span-2 tw-self-center ">
                      <Link
                        href={item.link}
                        className="tw-no-underline tw-text-primary hover:tw-text-secondaryLight"
                      >
                        {item.name}
                      </Link>
                      <button
                        className="tw-float-end"
                        onClick={() => removeItem(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="tw-w-3 tw-h-3"
                        />
                      </button>
                    </div>
                    <div className="tw-col-span-2 tw-self-center ">
                      <span>Qty: {item.quantity}</span>
                      &#8377; {item.price}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {remainingItemsCount > 0 && (
              <div className="tw-text-center tw-text-gray-600">
                & {remainingItemsCount} more item
                {remainingItemsCount > 1 ? "s" : ""}
              </div>
            )}
            <div className="tw-px-3">
              <table className="tw-w-full">
                <tbody>
                  <tr>
                    <td className="text-start">Price</td>
                    <td className="text-end">&#8377; {getTotalPrice()}</td>
                  </tr>
                  <tr>
                    <td className="text-start">GST{" (18%)"}</td>
                    <td className="text-end">
                      &#8377; {gstontotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-start">Subtotal</td>
                    <td className="text-end">
                      &#8377; {(getTotalPrice() + gstontotal).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tw-w-full tw-flex tw-justify-between tw-px-3 tw-mt-1">
              <Link
                href="/cart"
                className="tw-text-secondary hover:tw-text-primary tw-no-underline tw-rounded-pillcustom tw-bg-primary hover:tw-bg-primaryHover tw-py-2.5 tw-px-5 tw-text-sm/5 tw-transition-all tw-duration-500"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="tw-text-secondary hover:tw-text-primary tw-no-underline tw-rounded-pillcustom tw-bg-primary hover:tw-bg-primaryHover tw-py-2.5 tw-px-5 tw-text-sm/5 tw-transition-all tw-duration-500"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderCart;
