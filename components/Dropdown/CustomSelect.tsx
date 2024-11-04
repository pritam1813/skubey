"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface CustomSelectProps {
  label: string;
  selectId: string;
  options: { text: string; value: string | string[] }[];
  type: "limit" | "sort";
}

const CustomSelect = ({
  label,
  selectId,
  options,
  type,
}: CustomSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleOptionChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      if (type === "sort") {
        params.set("sortBy", value.split(",")[0]);
        params.set("sortOrder", value.split(",")[1]);
      } else {
        params.set(type, value);
      }
    } else {
      params.delete(type);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <label
        htmlFor={selectId}
        className="tw-px-1.2 tw-py-2 tw-text-sm tw-font-light"
      >
        {label}
      </label>
      <select
        onChange={(e) => handleOptionChange(e.target.value)}
        defaultValue={searchParams.get(type)?.toString()}
        id={selectId}
        className="tw-h-7.5 tw-py-[3px] tw-pr-[35px] tw-pl-2.5 tw-bg-secondary tw-text-primary tw-rounded-cardcustom tw-text-xs tw-outline-0"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};

export default CustomSelect;
