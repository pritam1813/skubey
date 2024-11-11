"use client";
import React from "react";
import { useCartStore } from "@/app/stores";
import useCurrencyStore from "@/app/stores/currencyStore";
import { useStore } from "zustand";

const CartTotal = () => {
  const cartstate = useStore(useCartStore, (state) => state);
  // const currencyState = useStore(useCurrencyStore, (state) => state);
  // if (currencyState.isLoading) return null;
  if (!cartstate) return null;

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <td className="">Sub-Total</td>
          <td className="tw-text-right">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
            }).format(cartstate.getTotalPrice())}
          </td>
        </tr>
        <tr>
          <td className="">GST</td>
          <td className="tw-text-right">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
            }).format(
              Number(((18 / 100) * cartstate.getTotalPrice()).toFixed(2))
            )}
          </td>
        </tr>
        <tr>
          <td className="">Total</td>
          <td className="tw-text-right">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "INR",
            }).format(
              Number(
                cartstate.getTotalPrice() +
                  (18 / 100) * cartstate.getTotalPrice()
              )
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartTotal;
