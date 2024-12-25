import React from "react";
import { headers } from "next/headers";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import ThemeButton from "@/components/Buttons/ThemeLinkButton";

export default async function User() {
  const response = await fetch(`${getBaseUrl()}/api/auth/user`, {
    headers: await headers(),
    cache: "no-store",
  });
  const data = await response.json();
  // console.log(data);

  return (
    <div id="content" className="col-sm-6 tw-order-1 lg:tw-order-2 tw-mx-auto">
      <div className="table-responsive">
        <table className="table table-borderless table-responsive">
          <tbody>
            <tr>
              <td className="tw-text-sm tw-text-primary">Name</td>
              <td className="tw-text-sm tw-text-primary">
                {data.result.profile.firstName} {data.result.profile.lastName}
              </td>
            </tr>
            <tr>
              <td className="tw-text-sm tw-text-primary">Email</td>
              <td className="tw-text-sm tw-text-primary">
                {data.result.email}
              </td>
            </tr>
            <tr>
              <td className="tw-text-sm tw-text-primary">Phone</td>
              <td className="tw-text-sm tw-text-primary">
                {data.result.profile.phoneNumber}
              </td>
            </tr>
            <tr>
              <td className="tw-text-sm tw-text-primary">Newsletter</td>
              <td className="tw-text-sm tw-text-primary">
                {data.result.profile.metadata.newsletter}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tw-my-3.5 tw-justify-end tw-flex ">
        <div>
          <ThemeButton href={`/user/edit`} title="Edit Details" />
        </div>
      </div>
    </div>
  );
}
