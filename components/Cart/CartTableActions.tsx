"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faRotate } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CartItem, useCartStore } from "@/app/stores/cartStore";
import toast, { Toaster } from "react-hot-toast";

const CartTableActions = ({
  product,
  initialQuantity,
}: {
  product: CartItem;
  initialQuantity: number;
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const removeFromCart = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  let minValue = 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);

    // Handle empty input
    if (isNaN(newValue)) {
      newValue = minValue;
    }

    // Ensure the value is not less than minValue
    if (newValue < minValue) {
      newValue = minValue;
    }

    setQuantity(newValue);
  };

  const handleInputBlur = () => {
    // Ensure the displayed value is not less than minValue when the input loses focus
    if (quantity < minValue) {
      setQuantity(minValue);
    }
  };
  return (
    <div className="tw-flex tw-h-[38px] tw-rounded-full tw-w-full">
      <Toaster position="top-center" />
      {/* Number input */}
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        min={minValue}
        className="tw-w-12 tw-flex-1 tw-text-center  tw-rounded-l-full focus:tw-outline-none  tw-border-y tw-border-l tw-border-gray-200"
      />

      {/* Refresh button */}
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-labelledby="Update Quantity"
              className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-w-12 tw-text-secondary hover:tw-text-primary tw-bg-primary hover:tw-bg-primaryHover tw-transition-colors tw-duration-300 tw-border-y tw-border-primary hover:tw-border-primaryHover"
              onClick={() => {
                updateQuantity(product.id, quantity);
                toast.success(`Updated quantity to ${quantity}`);
                setQuantity(quantity);
              }}
            >
              <FontAwesomeIcon icon={faRotate} className="tw-w-3 tw-h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="tw-m-0">Update</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Close button */}
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="tw-flex tw-flex-1 tw-w-12 tw-text-secondary tw-items-center tw-justify-center tw-bg-[#da4f49] tw-bg-gradient-to-b tw-from-[#ee5f5b] tw-to-[#bd362f]  tw-rounded-r-full"
              aria-labelledby="Remove From Cart"
              onClick={() => {
                removeFromCart(product.id);
                toast.success(`Removed ${product.name} from cart`);
              }}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="tw-w-3 tw-h-3.5"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="tw-m-0">Remove</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CartTableActions;
