"use state";
import React, { useEffect, useState } from "react";
import FormErrorMessage from "../FormErrorMessage";
import { getCountries, getStates } from "@/app/utils/countries";
import { useFormState } from "react-dom";
import { addAddress } from "@/app/actions";
import { FormState, useFormErrors } from "@/app/hooks/useFormErrors";

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

type CountryState = {
  code: string;
  name: string;
};

const initialState = {
  errors: undefined,
  success: false,
  code: undefined,
};
const CheckOutAddressForm = ({ state }: { state: FormState }) => {
  const [countries, setCountries] = useState<CountryState[]>([]);
  const [region, setRegion] = useState<CountryState[]>([]);

  const { getFieldError } = useFormErrors(state);

  useEffect(() => {
    getCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    getStates(countryCode).then((region) => {
      setRegion(region);
    });
  };
  return (
    <div>
      {personDetails.map((detail, index) => (
        <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10 " key={index}>
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
  );
};

export default CheckOutAddressForm;
