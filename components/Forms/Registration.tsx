"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    newsletter: z.enum(["yes", "no"]).default("yes"),
    agree: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the Privacy Policy" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newsletter: "yes",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  const personalDetails = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "E-Mail", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
  ];

  return (
    <form className="tw-block" onSubmit={handleSubmit(onSubmit)}>
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
                {...register(personalDetail.name as keyof FormData)}
                placeholder={personalDetail.label}
                id={personalDetail.name}
                type={personalDetail.type}
                className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
              />
              {errors[personalDetail.name as keyof FormData] && (
                <p className="tw-text-[#f00] tw-text-sm tw-mt-1">
                  {errors[personalDetail.name as keyof FormData]?.message}
                </p>
              )}
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
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              id="confirmPassword"
              type="password"
              className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
            />
            {errors.confirmPassword && (
              <p className="tw-text-[#f00] tw-text-sm tw-mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
              {...register("newsletter")}
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
              {...register("newsletter")}
              id="newsletter-no"
              type="radio"
              value="no"
              className="tw-absolute -tw-ml-5 tw-mt-1"
            />
            No
          </label>
          {errors.newsletter && (
            <p className="tw-text-[#f00] tw-text-sm tw-mt-1">
              {errors.newsletter.message}
            </p>
          )}
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
          <input {...register("agree")} type="checkbox" /> &nbsp;{" "}
          {errors.agree && (
            <p className="tw-text-[#f00] tw-text-sm tw-mt-1">
              {errors.agree.message}
            </p>
          )}
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
