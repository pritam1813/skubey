import React from "react";
import AddressForm from "@/components/Forms/AddressForm";

export default function AddAddress() {
  return (
    <div
      id="content"
      className="col-sm-9 tw-relative tw-min-h-[80vh] tw-text-primary tw-order-1 lg:tw-order-2"
    >
      <AddressForm />
    </div>
  );
}
