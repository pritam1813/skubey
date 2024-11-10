"use client";
import { useCartStore } from "@/app/stores";
import useStore from "@/app/stores/useStore";
import React from "react";

const OrderReviewTable = () => {
  const cartStore = useStore(useCartStore, (state) => state);
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
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(item.price))}
                </td>
                <td className="tw-text-right">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(item.price) * item.quantity)}
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
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(Number(cartStore?.getTotalPrice()))}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="tw-text-right">
                GST:
              </td>
              <td className="tw-text-right">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format((18 / 100) * Number(cartStore?.getTotalPrice()))}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="tw-text-right">
                Shipping Charges:
              </td>
              <td className="tw-text-right">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(0)}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="tw-text-right">
                Total:
              </td>
              <td className="tw-text-right">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(
                  (18 / 100) * Number(cartStore?.getTotalPrice()) +
                    Number(cartStore?.getTotalPrice())
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderReviewTable;
