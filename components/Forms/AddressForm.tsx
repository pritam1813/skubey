"use client";
import React, { useEffect, useRef, useState } from "react";
import { getCountries, getStates } from "@/app/utils/countries";
import { useFormState } from "react-dom";
import { addAddress, updateAddress } from "@/app/actions";
import FormErrorMessage from "./FormErrorMessage";
import { useFormErrors } from "@/app/hooks/useFormErrors";
import { Toaster } from "react-hot-toast";
import { AddressData } from "@/app/types/formSchema";

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

interface EditAddressData extends AddressData {
  id: string;
}

const AddressForm = ({ address }: { address?: EditAddressData }) => {
  const [countries, setCountries] = useState<CountryState[]>([]);
  const [region, setRegion] = useState<CountryState[]>([]);
  const [state, formAction] = useFormState(
    address ? updateAddress : addAddress,
    initialState
  );
  const { getFieldError } = useFormErrors(state);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    if (state?.success && !address) {
      ref.current?.reset();
    }
  }, [state?.success, address]);

  useEffect(() => {
    if (address) {
      getStates(address.country).then((region) => {
        setRegion(region);
      });
    }
  }, [address]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    getStates(countryCode).then((region) => {
      setRegion(region);
    });
  };

  let checkedDefault = false;
  if (address?.isDefault) {
    checkedDefault = true;
  }

  return (
    <form className="tw-block" ref={ref} action={formAction}>
      <Toaster position="top-center" />
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
              defaultValue={address?.[detail.name as keyof typeof address]}
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
            defaultValue={address?.country}
          >
            <option value=""> --- Please Select --- </option>
            {countries.map((country) => (
              <option
                key={country.code}
                value={country.code}
                selected={address?.country === country.code}
              >
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
            defaultValue={address?.state}
          >
            <option value=""> --- Please Select --- </option>
            {region.map((region) => (
              <option
                key={region.code}
                value={region.code}
                selected={address?.state === region.code}
              >
                {region.name}
              </option>
            ))}
          </select>
          <FormErrorMessage error={getFieldError("region")} />
        </div>
      </div>

      <div className="-tw-mx-3.75 tw-block tw-mb-3.75 tw-h-10">
        <label
          htmlFor="isDefault"
          className="col-sm-2 tw-text-sm/5 tw-font-normal tw-max-w-full tw-pt-[7px] tw-px-3.75 tw-text-right tw-inline-block tw-relative tw-float-left"
        >
          <span className="tw-text-[#f00]">* </span>
          Default Address
        </label>
        <div className="col-sm-10 tw-float-left tw-relative tw-px-3.75 tw-w-full">
          <label
            className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative"
            htmlFor="defaultaddress-yes"
          >
            <input
              name="isDefault"
              id="defaultaddress-yes"
              type="radio"
              value="yes"
              className="tw-absolute -tw-ml-5 tw-mt-1"
              defaultChecked={checkedDefault}
            />
            Yes
          </label>

          <label
            className="tw-pt-[7px] tw-text-sm/5 tw-pl-5 tw-align-middle tw-relative tw-ml-2.5"
            htmlFor="defaultaddress-no"
          >
            <input
              name="isDefault"
              id="defaultaddress-no"
              type="radio"
              value="no"
              className="tw-absolute -tw-ml-5 tw-mt-1"
              defaultChecked={!checkedDefault}
            />
            No
          </label>
        </div>
      </div>
      <input type="hidden" name="addressId" value={address?.id} />
      <div id="submit">
        <input
          type="submit"
          value={address ? "Update" : "Continue"}
          className="tw-block tw-mt-2.5 tw-ml-auto tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-py-2.5 tw-px-7.5 tw-rounded-cardcustom tw-transition-all tw-duration-500 tw-ease-in-out"
        />
      </div>
    </form>
  );
};

export default AddressForm;
