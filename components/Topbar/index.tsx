import React from "react";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CurrencySelector from "./CurrencySelector";

const Topbar = () => {
  return (
    <div className="tw-bg-primaryHover position-relative d-block">
      <div className="container">
        <div className="row justify-content-between">
          <div className=" col-lg-6 col-sm-6 tw-py-[10px] xl:tw-py-[15px] top-left">
            <div>
              <Link
                href="tel:+919876543210"
                role="link"
                className="d-flex align-items-center text-decoration-none tw-text-primary"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="tw-mr-[10px] tw-w-5 tw-h-5 "
                />
                <span>+91 9876543210</span>
              </Link>
            </div>
          </div>
          <div className=" col-lg-6 col-sm-6 tw-py-[10px] xl:tw-py-[15px] top-right d-flex justify-content-end">
            <div className="tw-ml-6">
              <CurrencySelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
