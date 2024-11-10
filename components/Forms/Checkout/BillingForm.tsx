"use client";
import React, { useEffect, useState } from "react";
import "./checkout.scss";
import { CheckoutAddressData } from "@/app/(main)/(cart)/cart/checkout/page";
import { useFormState } from "react-dom";
import { BillingAddress } from "@/app/actions";
import { useFormErrors } from "@/app/hooks/useFormErrors";
import FormErrorMessage from "../FormErrorMessage";
import { getCountries, getStates } from "@/app/utils/countries";
import LinkButtonTwo from "@/components/Buttons/LinkButtonTwo";
import { useAccStore } from "@/components/Cart/CartAccordions";

const personDetails = [
  { label: "First Name", name: "firstName", type: "text", required: true },
  { label: "Last Name", name: "lastName", type: "text", required: true },
  { label: "Company", name: "company", type: "text", required: false },
  { label: "Phone", name: "phoneNumber", type: "tel", required: true },
  { label: "Address 1", name: "addressOne", type: "text", required: true },
  { label: "Address 2", name: "addressTwo", type: "text", required: false },
  { label: "City", name: "city", type: "text", required: true },
  { label: "Post code", name: "postalCode", type: "text", required: true },
];

const initialState = {
  errors: undefined,
  success: false,
  code: undefined,
};

type CountryState = {
  code: string;
  name: string;
};

const BillingForm = ({ addresses }: { addresses: CheckoutAddressData[] }) => {
  const [addressType, setAddressType] = useState(
    addresses.length > 0 ? "existing" : "new"
  );
  const [countries, setCountries] = useState<CountryState[]>([]);
  const [region, setRegion] = useState<CountryState[]>([]);
  const { inc } = useAccStore((state) => state);

  const [state, formAction] = useFormState(BillingAddress, initialState);
  const { getFieldError } = useFormErrors(state);

  useEffect(() => {
    getCountries().then((countries) => {
      setCountries(countries);
    });
  }, [getCountries]);

  useEffect(() => {
    if (state?.success) {
      inc();
    }
  }, [state?.success]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    getStates(countryCode).then((region) => {
      setRegion(region);
    });
  };

  return (
    <form action={formAction}>
      <div className="radio">
        <label htmlFor="existing">
          <input
            type="radio"
            id="existing"
            name="addressType"
            checked={addressType === "existing"}
            onChange={(e) => setAddressType(e.target.value)}
            value="existing"
          />{" "}
          I want to use an existing address
        </label>
      </div>
      {addressType === "existing" && (
        <div id="option1">
          <select
            name="existingAddress"
            className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0 tw-my-2"
            defaultValue={
              addresses.length > 0
                ? addresses.find((address) => address.isDefault)?.id
                : ""
            }
          >
            {addresses.map((address, index) => (
              <option key={index} value={address.id}>
                {address.firstName} {address.lastName}, {address.postalCode},{" "}
                {address.city}, {address.state}, {address.country}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="radio">
        <label htmlFor="newaddress">
          <input
            type="radio"
            id="newaddress"
            value="new"
            name="addressType"
            checked={addressType === "new"}
            onChange={(e) => setAddressType(e.target.value)}
          />{" "}
          I want to use a new address
        </label>
      </div>
      {addressType === "new" && (
        <div id="option2">
          {personDetails.map((detail, index) => (
            <div
              className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10 "
              key={index}
            >
              <label
                htmlFor={detail.name}
                className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
              >
                {detail.required && <span className="tw-text-[#f00]">* </span>}
                {detail.label}
              </label>
              <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
                <input
                  name={detail.name}
                  placeholder={detail.label}
                  id={detail.name}
                  type={detail.type}
                  className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0 tw-my-2"
                />
                <FormErrorMessage error={getFieldError(detail.name)} />
              </div>
            </div>
          ))}

          <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10">
            <label
              htmlFor="country"
              className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
            >
              <span className="tw-text-[#f00]">* </span>
              Country
            </label>
            <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
              <select
                name="country"
                className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0 tw-my-2"
                onChange={handleCountryChange}
              >
                <option value=""> --- Please Select --- </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <FormErrorMessage error={getFieldError("country")} />
            </div>
          </div>

          <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10">
            <label
              htmlFor="state"
              className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
            >
              <span className="tw-text-[#f00]">* </span>
              Region / State
            </label>
            <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
              <select
                name="state"
                className="tw-py-1.5 tw-px-2.5 lg:tw-px-7.5 tw-rounded-[20px] lg:tw-rounded-cardcustom tw-leading-6 tw-h-10 tw-border-solid tw-border tw-border-borderColor tw-block tw-w-full tw-outline-0 tw-my-2"
              >
                <option value=""> --- Please Select --- </option>
                {region.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>
              <FormErrorMessage error={getFieldError("region")} />
            </div>
          </div>
        </div>
      )}

      {/* TODO: Create Seperate forms from here */}

      <div id="payment type" className="tw-px-2">
        <legend className="tw-text-lg tw-border-b tw-border-solid tw-border-borderColor tw-py-[7px] tw-mb-5">
          Payment Method
        </legend>
        <label
          className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative"
          htmlFor="cod"
        >
          <input
            name="paymentmethod"
            id="cod"
            type="radio"
            value="cod"
            className="tw-absolute -tw-ml-5 tw-mt-1"
            defaultChecked
          />
          Cash On Delivery {"(COD)"}
        </label>
        <label
          className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative md:tw-ml-4"
          htmlFor="online"
        >
          <input
            name="paymentmethod"
            id="online"
            type="radio"
            value="online"
            className="tw-absolute -tw-ml-5 tw-mt-1"
          />
          UPI / Internet Banking / Credit Card / Debit Card
        </label>
      </div>

      <div className="tw-my-3.5 clearfix">
        <LinkButtonTwo
          buttonType="button"
          title="Continue"
          type="button"
          className="tw-float-right"
        />
      </div>
    </form>
  );
};

export default BillingForm;
