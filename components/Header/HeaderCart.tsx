"use client";
import React, { useEffect, useRef, useState } from "react";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/app/stores/";
import AnimateHeight from "react-animate-height";
import useCurrencyStore from "@/app/stores/currencyStore";
import { formatCurrency } from "@/app/utils/currency";

const HeaderCart = () => {
  const [headerCartDropDown, setHeaderCartDropDown] = useState(false);
  const [height, setHeight] = useState<string | number>(0);
  //const { items, removeItem, getTotalPrice } = useCartStore((state) => state);
  const { cart, getTotalPrice, removeFromCart } = useCartStore(
    (state) => state
  );
  const { currency, exchangeRates } = useCurrencyStore((state) => state);
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
        setHeight(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartDropdownShow = () => {
    setHeaderCartDropDown(!headerCartDropDown);
    setHeight(height === 0 ? "auto" : 0);
  };

  return (
    <div>
      <div id="cart" className="tw-relative tw-align-middle">
        <button
          className="tw-text-primary tw-py-5"
          onClick={handleCartDropdownShow}
          ref={buttonRef}
        >
          <FontAwesomeIcon icon={faCartShopping} className="tw-w-5 tw-h-5" />
          <span
            id="cartTotal"
            className="tw-pt-[3px] tw-pl-[3px] tw-pb-0.5 tw-pr-0.5 tw-absolute -tw-right-2.5 tw-top-1.2 tw-bg-primary tw-text-primaryHover tw-text-xs/3 tw-rounded-full tw-min-w-[17px] tw-z-[1] tw-text-center"
          >
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>

        <AnimateHeight
          duration={500}
          height={height as number}
          className="tw-absolute tw-top-16 tw-right-0 tw-left-auto tw-z-20"
        >
          <ul
            style={{ minWidth: "unset" }}
            className="tw-w-[300px] tw-z-[1001] tw-p-0 tw-shadow-headerItems tw-bg-[#fff] tw-m-0"
            ref={dropdownRef}
          >
            {cart.length > 0 ? (
              <>
                <li
                  id="cartcontenproduct"
                  className="tw-max-h-[223px] tw-overflow-y-auto tw-overflow-x-hidden tw-px-5"
                >
                  <table className="tw-mb-2.5 tw-border-none tw-w-full">
                    <tbody>
                      {cart.map((item) => (
                        <tr
                          key={item.id}
                          className="tw-my-5 tw-pb-5 tw-relative tw-border-b tw-border-solid tw-border-borderColor tw-block"
                        >
                          <td className="tw-p-0 tw-w-[70px]">
                            <Link href={`product/${item.id}`}>
                              <Image
                                src={item.images[0] || fallbackImageUrl}
                                alt={`${item.name} + thumbnail image`}
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
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency,
                                }).format(
                                  Number(item.price) * exchangeRates[currency]
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="tw-absolute tw-top-0 tw-p-0 tw-right-0">
                            <button onClick={() => removeFromCart(item.id)}>
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
                            {/* &#8377; {getTotalPrice().toFixed(2)} */}
                            {formatCurrency(
                              getTotalPrice(),
                              currency,
                              exchangeRates[currency]
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="tw-text-left">GST{" (18%)"}</td>
                          <td className="tw-text-right">
                            {/* &#8377; {gstontotal.toFixed(2)} */}
                            {formatCurrency(
                              gstontotal,
                              currency,
                              exchangeRates[currency]
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="tw-text-left">Subtotal</td>
                          <td className="tw-text-right">
                            {formatCurrency(
                              getTotalPrice() + gstontotal,
                              currency,
                              exchangeRates[currency]
                            )}
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
                        href="/cart/checkout"
                        className="tw-inline-block tw-text-secondary hover:tw-text-primary tw-no-underline tw-rounded-md tw-bg-primary hover:tw-bg-primaryHover tw-py-2.5 tw-px-6 tw-text-sm/5 tw-transition-all tw-duration-500"
                      >
                        Checkout
                      </Link>
                    </p>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <p className="tw-py-5 tw-text-center tw-m-0">
                  Your shopping cart is empty!
                </p>
              </li>
            )}
          </ul>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default HeaderCart;
