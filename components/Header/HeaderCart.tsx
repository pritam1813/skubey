import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HeaderCart = () => {
  return (
    <div>
      <div id="cart" className="tw-relative tw-align-middle">
        <button className="tw-text-primary tw-py-5">
          <FontAwesomeIcon icon={faCartShopping} className="tw-w-5 tw-h-5" />
          <span
            id="cartTotal"
            className="tw-pt-[3px] tw-pl-[3px] tw-pb-0.5 tw-pr-0.5 tw-absolute -tw-right-2.5 tw-top-1.2 tw-bg-primary tw-text-primaryHover tw-text-xs/3 tw-rounded-full tw-min-w-[17px] tw-z-[1] tw-text-center"
          >
            2
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeaderCart;
