import React from "react";

interface CustomSelectProps {
  label: string;
  selectId: string;
  options: { text: string; value: string }[];
}

const CustomSelect = ({ label, selectId, options }: CustomSelectProps) => {
  return (
    <>
      <label
        htmlFor={selectId}
        className="tw-px-1.2 tw-py-2 tw-text-sm tw-font-light"
      >
        {label}
      </label>
      <select
        name=""
        id={selectId}
        className="tw-h-7.5 tw-py-[3px] tw-pr-[35px] tw-pl-2.5 tw-bg-secondary tw-text-primary tw-rounded-cardcustom tw-text-xs tw-outline-0"
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            defaultValue={options[0].value}
          >
            {option.text}
          </option>
        ))}
      </select>
    </>
  );
};

export default CustomSelect;
