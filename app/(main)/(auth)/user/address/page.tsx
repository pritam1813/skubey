import { getBaseUrl } from "@/app/utils/getBaseUrl";

import { headers } from "next/headers";
import React from "react";
import type { AddressData } from "@/app/types/formSchema";
import ThemeButton from "@/components/Buttons/ThemeLinkButton";
import LinkButtonTwo from "@/components/Buttons/LinkButtonTwo";
import { getCountryByCode, getStateByCode } from "@/app/utils/countries";
import DeleteAddressButton from "@/components/Buttons/DeleteAddressButton";

interface EditAddressProps extends AddressData {
  id: string;
}

export default async function AddressBook() {
  const response = await fetch(`${getBaseUrl()}/api/auth/user/address`, {
    headers: headers(),
    cache: "no-store",
  });
  const data: EditAddressProps[] = await response.json();

  return (
    <div
      id="content"
      className="col-sm-9 tw-relative tw-min-h-[80vh] tw-text-primary tw-order-1 lg:tw-order-2"
    >
      {data.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <tbody>
              {data.map((address, index) => (
                <tr key={index}>
                  <td className="tw-text-sm tw-relative">
                    {address.firstName} {address.lastName} <br />
                    {address.addressOne} <br />
                    {address.city},{" "}
                    {getStateByCode(address.state, address.country).then(
                      (state) => state?.name
                    )}{" "}
                    {address.postalCode} <br />
                    {getCountryByCode(address.country).then(
                      (country) => country?.name
                    )}{" "}
                    <br />
                    {address.isDefault && (
                      <div className="tw-absolute tw-top-2 tw-right-2 tw-bg-primaryHover tw-text-primary tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-pillcustom">
                        Default Address
                      </div>
                    )}
                  </td>
                  <td className="tw-text-right tw-align-middle">
                    <LinkButtonTwo
                      href={`/user/address/edit/${address.id}`}
                      title="edit"
                      varient="primary"
                    />
                    &nbsp; <DeleteAddressButton addressId={address.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td className="tw-text-center tw-py-4 tw-text-primary tw-text-sm">
                  No addresses yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="tw-my-3.5 tw-justify-between tw-flex">
        <div>
          <ThemeButton href="/user" title="Back" />
        </div>
        <div>
          <ThemeButton href="/user/address/add" title="New Address" />
        </div>
      </div>
    </div>
  );
}
