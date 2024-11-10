import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductSidebar from "@/components/SidebarMenu/ProductSidebar";
import CartItemsTable from "@/components/Cart/CartItemsTable";
import CartAccordions from "@/components/Cart/CartAccordions";
import AddCouponForm from "@/components/Forms/AddCouponForm";
import CartTotal from "@/components/Cart/CartTotal";
import LinkButtonTwo from "@/components/Buttons/LinkButtonTwo";

export default function CartPage() {
  return (
    <div
      id="category_content"
      className="col-sm-9 tw-w-4/5 tw-order-1 lg:tw-order-2"
    >
      <h1 className="tw-text-base">Shopping Cart</h1>
      <CartItemsTable />
      <h2 className="tw-text-base tw-mb-3.75">
        What would you like to do next?
      </h2>
      <p className="tw-text-sm">
        Choose if you have a discount code or reward points you want to use or
        would like to estimate your delivery cost.
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
    </div>
  );
}
