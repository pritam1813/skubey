"use client";
import React, { useActionState } from "react";
import Link from "next/link";
import { createUser } from "@/app/actions";
import { useFormErrors } from "@/app/hooks/useFormErrors";
import FormErrorMessage from "./FormErrorMessage";
import { Toaster } from "react-hot-toast";

const initialState = {
  errors: undefined,
  success: false,
  code: undefined,
};

const Registration = () => {
  const [state, formAction] = useActionState(createUser, initialState);
  const { getFieldError } = useFormErrors(state);

  const personalDetails = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "E-Mail", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
  ];
  // console.log(state);

  return (
    <form className="tw-block" action={formAction}>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <fieldset id="account">
        <legend className="tw-text-lg tw-border-b tw-border-solid tw-border-borderColor tw-py-[7px] tw-mb-5">
          Your Personal Details
        </legend>
        {personalDetails.map((personalDetail, index) => (
          <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10" key={index}>
            <label
              htmlFor={personalDetail.name}
              className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
            >
              <span className="tw-text-[#f00]">* </span>
              {personalDetail.label}
            </label>
            <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
              <input
                name={personalDetail.name}
                placeholder={personalDetail.label}
                id={personalDetail.name}
                type={personalDetail.type}
                className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
              />
              <FormErrorMessage error={getFieldError(personalDetail.name)} />
            </div>
          </div>
        ))}
      </fieldset>
      <fieldset id="userpassword">
        <legend className="tw-text-lg tw-border-b tw-border-solid tw-border-borderColor tw-py-[7px] tw-mb-5">
          Your Password
        </legend>
        <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10">
          <label
            htmlFor="password"
            className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
          >
            <span className="tw-text-[#f00]">* </span>
            Password
          </label>
          <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
            <input
              name="password"
              placeholder="Password"
              id="password"
              type="password"
              className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
            />
            <FormErrorMessage error={getFieldError("password")} />
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
      </fieldset>
      <fieldset id="newsletter">
        <legend className="tw-text-lg tw-border-b tw-border-solid tw-border-borderColor tw-py-[7px] tw-mb-5">
          Newsletter
        </legend>
        <label className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left">
          <span className="tw-text-[#f00]">* </span>
          Subscribe
        </label>
        <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75">
          <label
            className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative"
            htmlFor="newsletter-yes"
          >
            <input
              name="newsletter"
              id="newsletter-yes"
              type="radio"
              value="yes"
              className="tw-absolute -tw-ml-5 tw-mt-1"
              defaultChecked
            />
            Yes
          </label>

          <label
            className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative tw-ml-2.5"
            htmlFor="newsletter-no"
          >
            <input
              name="newsletter"
              id="newsletter-no"
              type="radio"
              value="no"
              className="tw-absolute -tw-ml-5 tw-mt-1"
            />
            No
          </label>
        </div>
      </fieldset>
      <div id="submitbutton" className="tw-my-3.5 tw-block">
        <div className="tw-float-right tw-block tw-text-sm">
          I have read and agree to the{" "}
          <Link
            href="/privacypolicy"
            className="tw-no-underline tw-text-primary tw-font-bold"
          >
            Privacy Policy{" "}
          </Link>
          <input name="agree" type="checkbox" defaultChecked={false} /> &nbsp;{" "}
          <FormErrorMessage error={getFieldError("agree")} />
          <input
            type="submit"
            value="Continue"
            className="tw-block tw-mt-2.5 tw-ml-auto tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-py-2.5 tw-px-7.5 tw-rounded-cardcustom tw-transition-all tw-duration-500 tw-ease-in-out"
          />
        </div>
      </div>
    </form>
  );
};

export default Registration;
