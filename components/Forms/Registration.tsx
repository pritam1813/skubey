import Link from "next/link";
import React from "react";

const Registration = () => {
  const personalDetails = [
    {
      label: "First Name",
      type: "text",
    },
    {
      label: "Last Name",
      type: "text",
    },
    { label: "E-Mail", type: "email" },
    {
      label: "Phone",
      type: "tel",
    },
  ];
  return (
    <form action="" className="tw-block">
      <fieldset id="account">
        <legend className="tw-text-lg tw-border-b tw-border-solid tw-border-borderColor tw-py-[7px] tw-mb-5">
          Your Personal Details
        </legend>
        {personalDetails.map((personaldetail, index) => (
          <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10" key={index}>
            <label
              htmlFor={personaldetail.label}
              className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
            >
              <span className="tw-text-[#f00]">* </span>
              {personaldetail.label}
            </label>
            <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
              <input
                placeholder={personaldetail.label}
                id={personaldetail.label}
                type={personaldetail.type}
                className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
              />
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
              placeholder="Password"
              id="password"
              type="password"
              className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
            />
          </div>
        </div>

        <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10">
          <label
            htmlFor="Confirm password"
            className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
          >
            <span className="tw-text-[#f00]">* </span>
            Confirm Password
          </label>
          <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75  tw-w-full">
            <input
              placeholder="Confirm Password"
              id="Confirm password"
              type="text"
              className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0"
            />
          </div>
        </div>
      </fieldset>
      <fieldset id="newsletter">
        <legend className="tw-text-lg tw-border-b tw-border-solid tw-border-borderColor tw-py-[7px] tw-mb-5">
          Newsletter
        </legend>
        <label
          htmlFor="Subscribe Newsletter"
          className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
        >
          <span className="tw-text-[#f00]">* </span>
          Subscribe
        </label>
        <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75">
          <label
            className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative"
            htmlFor="Yes"
          >
            <input
              id="Yes"
              type="radio"
              name="newsletter"
              className="tw-absolute -tw-ml-5 tw-mt-1"
              value="yes"
            />
            Yes
          </label>

          <label
            className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative tw-ml-2.5"
            htmlFor="No"
          >
            <input
              id="No"
              type="radio"
              name="newsletter"
              className="tw-absolute -tw-ml-5 tw-mt-1"
              value="no"
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
          <input type="checkbox" name="agree" value={1} /> &nbsp;{" "}
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
