"use client";
import React from "react";
import { useCartStore } from "@/app/stores";
import useStore from "@/app/stores/useStore";
import CartItemsTable from "@/components/Cart/CartItemsTable";
import CartAccordions from "@/components/Cart/CartAccordions";
import AddCouponForm from "@/components/Forms/AddCouponForm";
import CartTotal from "@/components/Cart/CartTotal";
import LinkButtonTwo from "@/components/Buttons/LinkButtonTwo";

const CartPageItems = () => {
  const cart = useStore(useCartStore, (state) => state.cart);

  return (
    <>
      {cart?.length! > 0 ? (
        <>
          <h1 className="tw-text-base">Shopping Cart</h1>
          <CartItemsTable />
          <h2 className="tw-text-base tw-mb-3.75">
            What would you like to do next?
          </h2>
          <p className="tw-text-sm">
            Choose if you have a discount code or reward points you want to use
            or would like to estimate your delivery cost.
          </p>
          <div>
            <CartAccordions title="Use Coupon" step={1}>
              <div className="tw-p-3.75">
                <AddCouponForm />
              </div>
            </CartAccordions>
            <CartAccordions title="Estimate Shipping & Taxes" step={2}>
              <div className="tw-p-3.75">Free Shipping</div>
            </CartAccordions>
          </div>
          <div className="row">
            <div className="col-sm-4 offset-8">
              <CartTotal />
            </div>
          </div>
          <div className="tw-my-3.5 tw-flex tw-justify-between">
            <LinkButtonTwo title="Continue Shopping" />
            <LinkButtonTwo title="Checkout" href="/cart/checkout" />
          </div>
        </>
      ) : (
        <>
          <p>Your shopping cart is empty!</p>
          <div className="tw-my-3.5 tw-flex tw-float-right">
            <LinkButtonTwo title="Continue" href="/" />
          </div>
        </>
      )}
    </>
  );
};

export default CartPageItems;
