"use client";
import React from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormErrors } from "@/app/hooks/useFormErrors";
import { login } from "@/app/actions";
import FormErrorMessage from "./FormErrorMessage";
import { Toaster } from "react-hot-toast";

const initialState = {
  errors: undefined,
  success: false,
  code: undefined,
};

const LoginForm = () => {
  const [state, formAction] = useFormState(login, initialState);
  const { getFieldError } = useFormErrors(state);

  return (
    <form action={formAction}>
      <Toaster position="top-center" />
      <div className="tw-mb-3.75 tw-mt-3.75">
        <label
          htmlFor="email"
          className="tw-inline-block tw-max-w-full tw-mb-1.2"
        >
          E-mail Address
        </label>

        <input
          placeholder="Your Email"
          id="email"
          type="email"
          name="email"
          className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
        />
        <FormErrorMessage error={getFieldError("email")} />
      </div>
      <div className="tw-mb-3.75">
        <label
          htmlFor="password"
          className="tw-inline-block tw-max-w-full tw-mb-1.2"
        >
          Password
        </label>

        <input
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
        />
        <FormErrorMessage error={getFieldError("password")} />
      </div>
      <div className="tw-flex tw-flex-wrap tw-justify-between">
        <Link
          href="/forgotpassword"
          className="tw-py-2.5 tw-no-underline tw-text-primary hover:tw-text-secondaryLight tw-align-middle"
        >
          Forgot Password ?
        </Link>
        <button
          type="submit"
          value="Login"
          className="tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-py-2.5 tw-px-7.5 tw-rounded-cardcustom tw-transition-all tw-duration-500 tw-ease-in-out"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
