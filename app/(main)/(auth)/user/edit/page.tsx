import { getBaseUrl } from "@/app/utils/getBaseUrl";
import ProfileUpdateForm from "@/components/Forms/ProfileUpdateForm";
import { headers } from "next/headers";
import React from "react";

export default async function UserEdit() {
  const response = await fetch(`${getBaseUrl()}/api/auth/user`, {
    headers: await headers(),
    cache: "no-store",
  });
  const data = await response.json();
  return (
    <div className="col-sm-6 tw-order-1 lg:tw-order-2 tw-mx-auto">
      <ProfileUpdateForm id={data.result.id} />
    </div>
  );
}
