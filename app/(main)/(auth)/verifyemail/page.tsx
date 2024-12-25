import React from "react";
import { ResendVerifyForm, VerifyEmailForm } from "@/components/Forms";

export default async function VerifyEmail(
  props: {
    searchParams: Promise<{ [key: string]: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const { email } = searchParams;

  return (
    <div id="content" className="col-sm-6 tw-order-1 lg:tw-order-2 tw-mx-auto">
      <div className="tw-p-5 tw-mb-5 tw-bg-backgroundColor">
        <VerifyEmailForm />
        <ResendVerifyForm email={email} />
      </div>
    </div>
  );
}
