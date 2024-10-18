"use client";
import React, { useState } from "react";
import { useCartStore } from "@/app/stores";
import { Product } from "@/app/types";
import {
  faBagShopping,
  faHeart,
  faMinus,
  faPlus,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface QuantityInputProps {
  initialValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
  product: Product;
}

const ProductOptions = ({
  initialValue = 1,
  minValue = 0,
  onChange,
  product,
}: QuantityInputProps) => {
  const [quantity, setQuantity] = useState(initialValue);
  const { addToCart } = useCartStore((state) => state);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  const handleIncrement = () => {
    let newValue = quantity + 1;
    setQuantity(newValue);
    //onChange?.(newValue);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      let newValue = quantity - 1;
      setQuantity(newValue);
    }
  };

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
    onChange?.(newValue);
  };

  const handleInputBlur = () => {
    // Ensure the displayed value is not less than minValue when the input loses focus
    if (quantity < minValue) {
      setQuantity(minValue);
      onChange?.(minValue);
    }
  };

  return (
    <div id="productOptions" className="tw-leading-5">
      <div className="tw-mb-3.75 tw-inline-block">
        <div
          id="qty"
          className="form-group tw-block lg:tw-inline-block tw-align-middle lg:tw-mr-5"
        >
          <label className="tw-inline-block tw-mr-2" htmlFor="inputQty">
            Qty
          </label>
          <div
            id="productbtnQuantity"
            className="tw-inline-flex tw-border tw-border-solid tw-border-borderColor tw-rounded-cardcustom tw-bg-backgroundColor [&>*]:tw-inline-block tw-mb-3.75 lg:tw-mb-0"
          >
            <button onClick={handleDecrement} className="tw-h-9 tw-w-9 ">
              <FontAwesomeIcon icon={faMinus} className="tw-w-3 tw-h-3" />
            </button>
            <input
              id="inputQty"
              type="number"
              value={quantity}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              min={minValue}
              max="100"
              className="tw-border-x tw-border-solid tw-border-x-borderColor tw-text-center tw-rounded-none tw-bg-secondary tw-h-9  tw-py-1.5 tw-px-2.5 tw-outline-0 tw-w-20"
            />
            <button onClick={handleIncrement} className="tw-h-9 tw-w-9 ">
              <FontAwesomeIcon icon={faPlus} className="tw-w-3 tw-h-3" />
            </button>
          </div>
        </div>
        <div className="tw-inline-block tw-align-middle">
          <button
            onClick={handleAddToCart}
            className="tw-border-none tw-items-center tw-text-sm tw-flex tw-w-auto tw-py-2.5 tw-px-5 tw-bg-primary tw-text-secondary tw-rounded-cardcustom hover:tw-bg-primaryHover hover:tw-text-primary tw-transition-all tw-duration-700"
          >
            <FontAwesomeIcon
              icon={faBagShopping}
              className="tw-w-4 tw-h-4 tw-mr-2"
            />
            Add to Cart
          </button>
        </div>
      </div>

      <div
        id="buttongrps"
        className="tw-relative tw-inline-block lg:tw-block [&>*]:tw-ml-2.5 tw-align-middle"
      >
        <button className="tw-group">
          <i className=" tw-w-10 tw-h-10 tw-leading-10 tw-inline-block tw-text-center tw-rounded-cardcustom tw-bg-backgroundColor group-hover:tw-bg-primaryHover tw-text-primary  tw-mr-2.5">
            <FontAwesomeIcon
              icon={faHeart}
              className="tw-w-3.5 tw-h-3.5 tw-leading-10 tw-text-center"
            />
          </i>
          <span className="max-lg:tw-hidden tw-uppercase tw-text-xs tw-inline tw-text-secondaryLight">
            Add to Wishlist
          </span>
        </button>
        <button className="tw-group">
          <i className=" tw-w-10 tw-h-10 tw-leading-10 tw-inline-block tw-text-center tw-rounded-cardcustom tw-bg-backgroundColor group-hover:tw-bg-primaryHover tw-text-primary  tw-mr-2.5">
            <FontAwesomeIcon
              icon={faShuffle}
              className="tw-w-3.5 tw-h-3.5 tw-leading-10 tw-text-center"
            />
          </i>
          <span className="max-lg:tw-hidden tw-uppercase tw-text-xs tw-inline tw-text-secondaryLight">
            Add to compare
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductOptions;
