"use client";
import { useCartStore } from "@/app/stores";
import useCurrencyStore from "@/app/stores/currencyStore";
import React from "react";
import { useStore } from "zustand";

const CartTotal = () => {
  const state = useStore(useCartStore, (state) => state);
  const currencyState = useStore(useCurrencyStore, (state) => state);
  if (currencyState.isLoading) return null;
  if (!state) return null;

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <td className="">Sub-Total</td>
          <td className="tw-text-right">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currencyState.currency,
            }).format(state.getTotalPrice())}
          </td>
        </tr>
        <tr>
          <td className="">GST</td>
          <td className="tw-text-right">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currencyState.currency,
            }).format(Number(((18 / 100) * state.getTotalPrice()).toFixed(2)))}
          </td>
        </tr>
        <tr>
          <td className="">Total</td>
          <td className="tw-text-right">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currencyState.currency,
            }).format(
              Number(state.getTotalPrice() + (18 / 100) * state.getTotalPrice())
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartTotal;
