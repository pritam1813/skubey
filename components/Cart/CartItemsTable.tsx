"use client";
import React from "react";
import { useCartStore } from "@/app/stores";
import Link from "next/link";
import Image from "next/image";
import useCurrencyStore from "@/app/stores/currencyStore";
import CartTableActions from "./CartTableActions";

const CartItemsTable = () => {
  const { cart } = useCartStore((state) => state);
  const { currency } = useCurrencyStore();
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr className="[&>*]:tw-text-center">
            <th>Image</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="[&>*]:tw-align-middle">
              <td className="text-center">
                <Link href={`/product/${item.id}`} className="tw-no-underline">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={60}
                    height={71}
                    className="tw-inline-block"
                  />
                </Link>
              </td>
              <td>
                <Link
                  href={`/product/${item.id}`}
                  className="tw-no-underline tw-text-primary tw-inline-block"
                >
                  {item.name}
                </Link>
              </td>
              <td>
                <div className="tw-relative tw-table tw-border-separate tw-w-full tw-max-w-52">
                  <CartTableActions
                    initialQuantity={item.quantity}
                    product={item}
                  />
                </div>
              </td>
              <td>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                }).format(Number(item.price))}
              </td>
              <td>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                }).format(Number(item.price) * item.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItemsTable;
