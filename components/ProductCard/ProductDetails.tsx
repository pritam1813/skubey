"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../Products";

const ProductDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useSWR(`/api/products/${id}`, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  return (
    <div className="tw-space-y-4">
      <h2 className="tw-text-2xl tw-font-bold"> {data.name}</h2>
      <p className="tw-text-primary">{data.price}</p>
    </div>
  );
};

export default ProductDetails;
