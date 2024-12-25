"use client";
import React, { useRef, useState } from "react";
import {
  faAngleLeft,
  faAngleRight,
  faBagShopping,
  faHeart,
  faMinus,
  faPlus,
  faShuffle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartStore } from "@/app/stores/";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import supabaseLoader from "@/supabase-image-loader";

interface QuantityInputProps {
  initialValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
}

const QuickView = ({
  initialValue = 1,
  minValue = 0,
  onChange,
}: QuantityInputProps) => {
  const [quantity, setQuantity] = useState(initialValue);
  const { quickView, toggleQuickView, addToCart } = useCartStore(
    (state) => state
  );
  const sliderRef = useRef<Slider | null>(null);

  const product = quickView.product;

  if (!product || !quickView.isOpen) return null;

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    centerPadding: "20px",
  };

  const handleAddToCart = () => {
    //addToCart(quickViewProduct, quantity);
    if (quantity > 0) {
      addToCart(quickView.product!, quantity);
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
    <div className={quickView.isOpen ? "" : "tw-hidden"}>
      <div className="tw-fixed tw-p-5 tw-inset-0 tw-overflow-auto tw-h-[80vh] tw-z-[9999] tw-m-auto tw-w-11/12 lg:tw-w-4/6 tw-bg-secondary">
        <button
          onClick={() => toggleQuickView(false)}
          className="tw-absolute tw-top-0 tw-right-0 tw-z-[200] tw-w-7.5 tw-h-7.5 tw-bg-primaryHover tw-text-primary tw-text-2xl/[30px] tw-text-center tw-justify-center tw-block "
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="tw-w-6 tw-h-6 tw-block tw-m-auto"
          />
        </button>
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <div id="thumbnail">
                <div id="productimage" className="tw-mb-5">
                  <Link href={quickView.product ? quickView.product.slug : "/"}>
                    {/* <Image
                      src={product ? `${product.images[0]}` : "/products/1.jpg"}
                      alt={product ? `${product.name}` : ""}
                      width={355}
                      height={421}
                      className="tw-w-full tw-h-auto"
                    /> */}
                  </Link>
                </div>

                <div
                  id="quickSlider"
                  className="tw-relative tw-mx-auto tw-mb-2.5 tw-px-5"
                >
                  <button
                    onClick={previous}
                    className="tw-absolute tw-top-0 tw-bottom-0 tw-left-0"
                  >
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      className="tw-w-4 tw-h-4 tw-text-primary"
                    />
                  </button>
                  <Slider ref={sliderRef} {...settings}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i}>
                        <Image
                          src={supabaseLoader({
                            src: `products/${i}.jpg` || "/products/1.jpg",
                          })}
                          //src={`/products/${i + 1}.jpg`}
                          alt={`Product ${i + 1} `}
                          width={66}
                          height={79}
                          className="tw-w-auto tw-h-auto"
                        />
                      </div>
                    ))}
                  </Slider>
                  <button
                    onClick={next}
                    className="tw-absolute tw-right-0 tw-bottom-0 tw-top-0"
                  >
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="tw-w-4 tw-h-4 tw-text-primary"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-7">
              <h2 className="tw-text-xl/5 tw-font-medium tw-capitalize tw-mt-2.5 tw-mb-4">
                {quickView.product?.name}
              </h2>
              <div id="ratingDetails">
                {Array.from({ length: 5 }, (_, i) =>
                  i < Math.floor(product?.avgRating || 0) ? (
                    <span key={i} className="tw-text-primaryHover">
                      &#9733;
                    </span>
                  ) : (
                    <span key={i} className="tw-text-primaryHover">
                      &#9734;
                    </span>
                  )
                )}
                <span className="tw-ml-2 tw-text-sm">{product?.avgRating}</span>
              </div>
              <hr />
              <ul className="tw-p-0 tw-capitalize tw-text-sm/6 tw-font-medium">
                <li>brand</li>
                <li>code</li>
                <li>
                  <span className="tw-text-primary tw-min-w-25 tw-mr-1.2">
                    availability:
                  </span>{" "}
                  <span className="tw-text-secondaryLight">
                    {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </li>
              </ul>
              <hr />
              <ul className="tw-text-primary tw-p-0 tw-leading-6">
                <li>{Number(quickView.product?.price)}</li>
                <li className="tw-text-sm">
                  {" "}
                  GST / Tax:{" "}
                  <span className="tw-text-secondaryLight">
                    {" "}
                    {quickView.product?.price
                      ? ((18 / 100) * Number(quickView.product.price)).toFixed(
                          2
                        )
                      : 0}
                  </span>
                </li>
              </ul>
              <hr />

              {/* Product Options */}
              <div id="productOptions" className="tw-leading-5">
                <div className="tw-mb-3.75 tw-inline-block">
                  <div
                    id="qty"
                    className="form-group tw-block lg:tw-inline-block tw-align-middle lg:tw-mr-5"
                  >
                    <label
                      className="tw-inline-block tw-mr-2"
                      htmlFor="inputQty"
                    >
                      Qty
                    </label>
                    <div
                      id="productbtnQuantity"
                      className="tw-inline-flex tw-border tw-border-solid tw-border-borderColor tw-rounded-cardcustom tw-bg-backgroundColor [&>*]:tw-inline-block tw-mb-3.75 lg:tw-mb-0"
                    >
                      <button
                        onClick={handleDecrement}
                        className="tw-h-9 tw-w-9 "
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="tw-w-3 tw-h-3"
                        />
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
                      <button
                        onClick={handleIncrement}
                        className="tw-h-9 tw-w-9 "
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="tw-w-3 tw-h-3"
                        />
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
            </div>
          </div>
        </div>
      </div>
      <div className="tw-z-[99] tw-bg-[#0000]/80 tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-m-auto"></div>
    </div>
  );
};

export default QuickView;
