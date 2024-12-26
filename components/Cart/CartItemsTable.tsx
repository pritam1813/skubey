"use client";
import React from "react";
import { useCartStore } from "@/app/stores/cartStore";
import Link from "next/link";
import Image from "next/image";

import CartTableActions from "./CartTableActions";
import useStore from "@/app/stores/useStore";
import useCurrencyStore, {
  defaultExchangeRates,
} from "@/app/stores/currencyStore";
import { formatCurrency } from "@/app/utils/currency";
import supabaseLoader from "@/supabase-image-loader";

const CartItemsTable = () => {
  const items = useCartStore((state) => state.items);

  const currencyState = useStore(useCurrencyStore, (state) => state);
  let currency = currencyState?.currency || "INR";
  let exchangeRates = currencyState?.exchangeRates || defaultExchangeRates;
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
          {items.map((item) => (
            <tr
              key={item.id}
              className="[&>*]:tw-align-middle [&>*]:tw-text-center"
            >
              <td>
                <Link href={`/product/${item.id}`} className="tw-no-underline">
                  <Image
                    src={supabaseLoader({
                      src: `products/${item.imageUrl}` || "/products/1.jpg",
                    })}
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
                <div className="tw-relative tw-table tw-border-separate tw-w-full tw-max-w-52 tw-mx-auto">
                  <CartTableActions
                    initialQuantity={item.quantity}
                    product={item}
                  />
                </div>
              </td>
              <td>
                {formatCurrency(
                  Number(item.price),
                  currency,
                  exchangeRates[currency]
                )}
              </td>
              <td>
                {formatCurrency(
                  Number(item.price) * Number(item.quantity),
                  currency,
                  exchangeRates[currency]
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItemsTable;
