"use client";
import React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { verifyEmailOTP } from "@/app/actions";
import { Toaster } from "react-hot-toast";
import { useFormState } from "react-dom";
import { useFormErrors } from "@/app/hooks/useFormErrors";
import { useSearchParams } from "next/navigation";

const initialState = {
  success: false,
  message: "",
};

const VerifyEmailForm = () => {
  const [state, formAction] = useFormState(verifyEmailOTP, initialState);
  useFormErrors(state);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <form action={formAction}>
      <Toaster position="top-center" />
      <div className="tw-mb-3.75 tw-mt-3.75 tw-text-center">
        <label className="tw-mb-2" htmlFor="otp">
          One-Time Password
        </label>

        <div className="tw-mx-auto">
          <InputOTP
            maxLength={6}
            containerClassName="tw-mx-auto tw-flex tw-justify-center"
            name="otp"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {email && <input type="hidden" name="email" value={email} />}
        <p className="tw-text-sm tw-mt-3">
          Please enter the OTP sent to your email, or click on the verification
          link.
        </p>
        <button
          type="submit"
          value="Login"
          className="tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-py-2 tw-px-7 tw-rounded-cardcustom tw-transition-all tw-duration-500 tw-ease-in-out tw-mt-4"
        >
          Verify
        </button>
      </div>
    </form>
  );
};

export default VerifyEmailForm;
