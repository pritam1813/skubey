import React from "react";
import AddressForm from "@/components/Forms/AddressForm";
import { getBaseUrl } from "@/app/utils/getBaseUrl";

export default async function EditAddress({
  params,
}: {
  params: { addressId: string };
}) {
  const data = await fetch(
    `${getBaseUrl()}/api/auth/user/address/${params.addressId}`,
    { cache: "no-store" }
  );

  const address = await data.json();

  return (
    <div
      id="content"
      className="col-sm-9 tw-relative tw-min-h-[80vh] tw-text-primary tw-order-1 lg:tw-order-2"
    >
      <AddressForm address={address} />
    </div>
  );
}
