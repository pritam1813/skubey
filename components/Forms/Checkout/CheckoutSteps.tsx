"use client";

import React from "react";
import { CheckoutAddressData } from "@/app/types/formSchema";
import CartAccordions from "@/components/Cart/CartAccordions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddressFormProps {
  onComplete: () => void;
  addresses: CheckoutAddressData[];
}

const PaymentForm = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <form>
      {/* Payment Method Radio Butons Card Or Cash */}
      <div className="radio">
        <label htmlFor="card">
          <input type="radio" id="card" value="card" name="paymentMethod" />{" "}
          Card
        </label>
      </div>
      <div className="radio">
        <label htmlFor="cash">
          <input type="radio" id="cash" value="cash" name="paymentMethod" />{" "}
          Cash
        </label>
      </div>

      <button type="button" onClick={onComplete}>
        Next Step
      </button>
    </form>
  );
};

const OrderReview = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <form>
      {/* Your order review fields */}
      <input type="text" placeholder="nw" />
      <button type="button" onClick={onComplete}>
        Next Step
      </button>
    </form>
  );
};

export default function CheckoutSteps({
  data,
}: {
  data: CheckoutAddressData[];
}) {
  return (
    <div>
      <CartAccordions title="Step 1: Address" step={1}>
        form 1
      </CartAccordions>
    </div>
  );
}
