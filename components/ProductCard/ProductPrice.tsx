"use client";
import React from "react";
import useCurrencyStore from "@/app/stores/currencyStore";
import useStore from "@/app/stores/useStore";

interface PriceDisplayProps {
  amount: number;
  discount?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ amount, discount }) => {
  const currencyState = useStore(useCurrencyStore, (state) => state);
  // console.log(discount);

  //discount = 100;
  const price = discount ? amount - (discount / 100) * amount : amount;
  const convertedPrice = currencyState?.exchangeRates[currencyState.currency]
    ? price * currencyState.exchangeRates[currencyState.currency]
    : price;
  const convertedAmount = currencyState?.exchangeRates[currencyState?.currency]
    ? amount * currencyState?.exchangeRates[currencyState?.currency]
    : amount;

  return (
    <>
      {discount ? (
        <>
          <span className="tw-mr-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currencyState?.currency || "INT",
            }).format(convertedPrice)}
          </span>
          <span className="tw-line-through tw-text-secondaryLight">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currencyState?.currency || "INT",
            }).format(convertedAmount)}
          </span>
        </>
      ) : (
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyState?.currency || "INT",
          }).format(convertedPrice)}
        </span>
      )}
    </>
  );
};

export default PriceDisplay;
