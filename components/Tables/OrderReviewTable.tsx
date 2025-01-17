"use client";
import React from "react";
import { useCartStore } from "@/app/stores";
import useCurrencyStore, {
  defaultExchangeRates,
} from "@/app/stores/currencyStore";
import useStore from "@/app/stores/useStore";
import { formatCurrency } from "@/app/utils/currency";

const OrderReviewTable = () => {
  const cartStore = useStore(useCartStore, (state) => state);
  const currencyState = useStore(useCurrencyStore, (state) => state);
  let currency = currencyState?.currency || "INR";
  let exchangeRates = currencyState?.exchangeRates || defaultExchangeRates;
  let rate = exchangeRates[currency] || 1;
  return (
    <div className="tw-p-3.75">
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th className="tw-text-right">Unit Price</th>
              <th className="tw-text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartStore?.cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td className="tw-text-right">
                  {formatCurrency(Number(item.price), currency, rate)}
                </td>
                <td className="tw-text-right">
                  {formatCurrency(
                    Number(item.price) * Number(item.quantity),
                    currency,
                    rate
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="tw-text-right">
                Sub Total:
              </td>
              <td className="tw-text-right">
                {formatCurrency(
                  Number(cartStore?.getTotalPrice()),
                  currency,
                  rate
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="tw-text-right">
                GST:
              </td>
              <td className="tw-text-right">
                {/* {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format((18 / 100) * Number(cartStore?.getTotalPrice()))} */}
                {formatCurrency(
                  (18 / 100) * Number(cartStore?.getTotalPrice()),
                  currency,
                  rate
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="tw-text-right">
                Shipping Charges:
              </td>
              <td className="tw-text-right">
                {/* {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(0)} */}
                {formatCurrency(0, currency, rate)}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="tw-text-right">
                <strong>Total:</strong>
              </td>
              <td className="tw-text-right">
                <strong>
                  {/* {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(
                    (18 / 100) * Number(cartStore?.getTotalPrice()) +
                      Number(cartStore?.getTotalPrice())
                  )} */}
                  {formatCurrency(
                    (18 / 100) * Number(cartStore?.getTotalPrice()) +
                      Number(cartStore?.getTotalPrice()),
                    currency,
                    rate
                  )}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderReviewTable;
