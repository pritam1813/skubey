import React from "react";

import { headers } from "next/headers";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { AddressData } from "@/app/types/formSchema";
import "./checkout.scss";

import CheckoutForm from "@/components/Forms/CheckoutForm";

export interface CheckoutAddressData
  extends Omit<AddressData, "phoneNumber" | "addressTwo" | "company"> {
  id: string;
}

export default async function CheckOut() {
  const response = await fetch(`${getBaseUrl()}/api/auth/user/address`, {
    headers: await headers(),
  });
  const data: CheckoutAddressData[] = await response.json();

  return (
    <div id="checkoutcontent" className="col-sm-9  tw-order-1 lg:tw-order-2">
      {/* Todo: create seperate accordions for address, payment and order review steps */}
      <CheckoutForm addresses={data} />
    </div>
  );
}
