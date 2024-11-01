import React from "react";
import { ResendVerifyForm, VerifyEmailForm } from "@/components/Forms";

export default function VerifyEmail({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
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
