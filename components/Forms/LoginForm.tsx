"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission (e.g., send login request to server)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tw-mb-3.75 tw-mt-3.75">
        <label
          htmlFor="email"
          className="tw-inline-block tw-max-w-full tw-mb-1.2"
        >
          E-mail Address
        </label>

        <input
          {...register("email")}
          placeholder="Your Email"
          id="email"
          type="email"
          className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
        />
        {errors.email && (
          <p className="tw-text-[#f00] tw-text-sm tw-mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="tw-mb-3.75">
        <label
          htmlFor="password"
          className="tw-inline-block tw-max-w-full tw-mb-1.2"
        >
          Password
        </label>

        <input
          {...register("password")}
          placeholder="Password"
          id="password"
          type="password"
          className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
        />
        {errors.password && (
          <p className="tw-text-[#f00] tw-text-sm tw-mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="tw-flex tw-flex-wrap tw-justify-between">
        <Link
          href="/forgotpassword"
          className="tw-py-2.5 tw-no-underline tw-text-primary hover:tw-text-secondaryLight tw-align-middle"
        >
          Forgot Password ?
        </Link>
        <input
          type="submit"
          value="Login"
          className="tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-py-2.5 tw-px-7.5 tw-rounded-cardcustom tw-transition-all tw-duration-500 tw-ease-in-out"
        />
      </div>
    </form>
  );
};

export default LoginForm;
