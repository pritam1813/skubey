"use client";
import React, { useState } from "react";
import Link from "next/link";

// Define the type for the active tab
type ActiveTab = "Description" | "Reviews";

const DescriptionAndReview = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Description");

  return (
    <div id="desciptionandreview" className="tw-mt-13">
      <ul className="tw-px-2.5 tw-mb-7.5 tw-bg-secondaryHover tw-text-center tw-block">
        <li className="tw-inline-block tw-relative">
          <Link
            href="/description"
            className={` ${
              activeTab === "Description"
                ? "tw-text-primary"
                : "tw-text-secondaryLight hover:tw-text-primary"
            }  tw-py-3.75 tw-block tw-text-base tw-no-underline`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("Description");
            }}
          >
            Description
          </Link>
        </li>
        <li className="tw-inline-block tw-relative tw-ml-[18px] tw-pl-[22px] before:tw-h-7.5 before:tw-bg-borderColor before:tw-absolute before:tw-w-px before:tw-rotate-[20deg] before:tw-top-0 before:tw-bottom-0 before:tw-left-0 before:tw-m-auto">
          <Link
            href="/reviews"
            className={` ${
              activeTab === "Reviews"
                ? "tw-text-primary"
                : "tw-text-secondaryLight hover:tw-text-primary"
            }  tw-py-3.75 tw-block tw-text-base tw-no-underline`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("Reviews");
            }}
          >
            Reviews (1)
          </Link>
        </li>
      </ul>
      <div>
        {activeTab === "Description" ? (
          <div>
            <p className="tw-text-secondaryLight tw-text-sm tw-leading-6 tw-mb-5">
              description
            </p>
          </div>
        ) : (
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="tw-w-1/2 tw-text-primary">
                  <strong>Name</strong>
                </td>
                <td className="tw-text-right">Date</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <p>Review</p>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="tw-text-primaryHover">
                      &#9733;
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DescriptionAndReview;
