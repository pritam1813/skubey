"use client";
import { validateCoupon } from "@/app/actions";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <input
      type="submit"
      disabled={pending}
      value={pending ? "Loading..." : "Apply Coupon"}
      className="-tw-ml-px tw-z-[2] tw-text-sm tw-rounded-r-cardcustom tw-relative tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-transition-colors tw-duration-500 tw-ease-in-out tw-py-2.5 tw-px-7.5 tw-outline-0 disabled:tw-cursor-not-allowed"
    />
  );
};

const initialState = {
  message: "",
  success: false,
};
const AddCouponForm = () => {
  const [state, formAction] = useFormState(validateCoupon, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Toaster position="top-center" />
      <label
        htmlFor="coupon"
        className="col-sm-2 tw-relative tw-float-left tw-min-h-px tw-px-3.75 tw-inline-block"
      >
        Enter your coupon here
      </label>
      <div className="tw-relative tw-table tw-border-separate">
        <input
          type="text"
          name="coupon"
          id="coupon"
          placeholder="Enter Your Coupon Code Here"
          className="tw-table-cell tw-py-1.5 tw-px-7.5 tw-h-10 tw-text-sm tw-rounded-l-cardcustom tw-border tw-border-solid tw-border-borderColor tw-outline-0 tw-relative tw-float-left tw-z-[2] tw-w-full"
        />
        <span className="tw-table-cell tw-relative tw-w-[1%] tw-whitespace-nowrap tw-align-middle tw-border-separate">
          <SubmitButton />
        </span>
      </div>
    </form>
  );
};

export default AddCouponForm;
