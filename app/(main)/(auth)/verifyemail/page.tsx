import React from "react";
import { ResendVerifyForm, VerifyEmailForm } from "@/components/Forms";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { redirect } from "next/navigation";

export default async function VerifyEmail(props: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const { email } = searchParams;

  const checkEmailVerification = await fetch(
    `${getBaseUrl()}/api/auth/isemailverified?email=${email}`
  );
  const res = await checkEmailVerification.json();

  if (res.error) {
    console.log(res.error);
    redirect("/login");
  }

  return (
    <div id="content" className="col-sm-6 tw-order-1 lg:tw-order-2 tw-mx-auto">
      <div className="tw-p-5 tw-mb-5 tw-bg-backgroundColor">
        <VerifyEmailForm />
        <ResendVerifyForm email={email} />
      </div>
    </div>
  );
}
