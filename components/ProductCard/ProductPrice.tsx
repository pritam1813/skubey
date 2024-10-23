"use client";
import React from "react";
import useCurrencyStore from "@/app/stores/currencyStore";

interface PriceDisplayProps {
  amount: number;
  discount?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ amount, discount }) => {
  const { currency, exchangeRates } = useCurrencyStore();

  //discount = 100;
  const price = discount ? amount - discount : amount;
  const convertedPrice = exchangeRates[currency]
    ? price * exchangeRates[currency]
    : price;
  const convertedAmount = exchangeRates[currency]
    ? amount * exchangeRates[currency]
    : amount;

  return (
    <>
      {discount ? (
        <>
          <span className="tw-mr-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
            }).format(convertedPrice)}
          </span>
          <span className="tw-line-through tw-text-secondaryLight">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
            }).format(convertedAmount)}
          </span>
        </>
      ) : (
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
          }).format(convertedPrice)}
        </span>
      )}
    </>
  );
};

export default PriceDisplay;
