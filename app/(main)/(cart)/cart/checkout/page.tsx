import React from "react";
import CartAccordions from "@/components/Cart/CartAccordions";
import { BillingForm } from "@/components/Forms/Checkout";
import { headers } from "next/headers";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { AddressData } from "@/app/types/formSchema";
import "./checkout.scss";
import OrderReviewTable from "@/components/Tables/OrderReviewTable";
import CheckoutForm from "@/components/Forms/CheckoutForm";

export interface CheckoutAddressData
  extends Omit<AddressData, "phoneNumber" | "addressTwo" | "company"> {
  id: string;
}

export default async function CheckOut() {
  const response = await fetch(`${getBaseUrl()}/api/auth/user/address`, {
    headers: headers(),
  });
  const data: CheckoutAddressData[] = await response.json();

  return (
    <div id="checkoutcontent" className="col-sm-9  tw-order-1 lg:tw-order-2">
      {/* Todo: create seperate accordions for address, payment and order review steps */}
      <CheckoutForm addresses={data} />
    </div>
  );
}
