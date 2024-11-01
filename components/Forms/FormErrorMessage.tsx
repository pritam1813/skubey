import React from "react";

const FormErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="tw-text-[#f00] tw-text-sm tw-mt-1">{error}</p>;
};

export default FormErrorMessage;
