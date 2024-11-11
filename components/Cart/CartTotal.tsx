"use client";
import React from "react";
import { useCartStore } from "@/app/stores";
import useCurrencyStore from "@/app/stores/currencyStore";
import useStore from "@/app/stores/useStore";
import { formatCurrency } from "@/app/utils/currency";

const CartTotal = () => {
  const cartstate = useStore(useCartStore, (state) => state);
  const currencyState = useStore(useCurrencyStore, (state) => state);

  if (!cartstate || !currencyState) return null;

  const { currency, exchangeRates } = currencyState;
  const exchangeRate = exchangeRates[currency];
  const subtotal = cartstate.getTotalPrice();
  const gst = Number((18 / 100) * subtotal);
  const total = subtotal + gst;

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <td className="">Sub-Total</td>
          <td className="tw-text-right">
            {formatCurrency(subtotal, currency, exchangeRate)}
          </td>
        </tr>
        <tr>
          <td className="">GST</td>
          <td className="tw-text-right">
            {formatCurrency(gst, currency, exchangeRate)}
          </td>
        </tr>
        <tr>
          <td className="">Total</td>
          <td className="tw-text-right">
            {formatCurrency(total, currency, exchangeRate)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartTotal;
