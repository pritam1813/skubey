"use client";
import React, { useEffect, useRef, useActionState } from "react";
import { updatePassword } from "@/app/actions";
import { useFormErrors } from "@/app/hooks/useFormErrors";
import FormErrorMessage from "./FormErrorMessage";
import { Toaster } from "react-hot-toast";

const initialState = {
  errors: undefined,
  success: false,
  code: undefined,
};

const ChangePasswordForm = () => {
  const [state, formAction] = useActionState(updatePassword, initialState);
  const { getFieldError } = useFormErrors(state);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);
  return (
    <form ref={formRef} action={formAction}>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10">
        <label
          htmlFor="password"
          className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
        >
          <span className="tw-text-[#f00]">* </span>
          New Password
        </label>
        <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
          <input
            name="newPassword"
            placeholder="Password"
            id="password"
            type="password"
            className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
          />
          <FormErrorMessage error={getFieldError("newPassword")} />
        </div>
      </div>

      <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10">
        <label
          htmlFor="confirmPassword"
          className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
        >
          <span className="tw-text-[#f00]">* </span>
          Confirm Password
        </label>
        <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75  tw-w-full">
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            id="confirmPassword"
            type="password"
            className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
          />
          <FormErrorMessage error={getFieldError("confirmPassword")} />
        </div>
      </div>

      <div id="submitbutton" className="tw-my-3.5 tw-block">
        <div className="tw-float-right tw-block tw-text-sm">
          <input
            type="submit"
            value="Update Password"
            className="tw-block tw-mt-2.5 tw-ml-auto tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-py-2.5 tw-px-7.5 tw-rounded-cardcustom tw-transition-all tw-duration-500 tw-ease-in-out"
          />
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
