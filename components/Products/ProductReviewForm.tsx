"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "@smastrom/react-rating/style.css";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { toast, Toaster } from "react-hot-toast";

import useSWRMutation from "swr/mutation";

// schema for form
const reviewSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Review: z.string().min(10, "Review must be at least 10 characters long"),
  Rating: z.number().min(1, "Please select a rating").max(5),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

const postRequest = async (url: string, { arg }: { arg: ReviewFormData }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
};

const ProductReviewForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      Name: "",
      Review: "",
      Rating: 0,
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    "/api/product/review",
    postRequest
  );

  useEffect(() => {
    // Display error messages using toast
    Object.entries(errors).forEach(([key, value]) => {
      if (value?.message) {
        toast.error(
          `${
            value.type === "invalid_type" ? `${key} is required` : value.message
          } `
        );
      }
    });
  }, [errors]);

  const onSubmit = async (formData: ReviewFormData) => {
    try {
      await toast.promise(trigger(formData), {
        loading: "Submitting review...",
        success: "Review submitted successfully!",
        error: "Failed to submit review. Please try again.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div id="reviewform" className="tw-mt-13">
      <h2 className="tw-px-2.5 tw-py-3.75 tw-text-lg/4 tw-no-underline tw-mb-7.5 tw-bg-secondaryHover tw-block">
        Write a Review
      </h2>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit(onSubmit)} className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-text-sm tw-text-primary">
          <label
            htmlFor="reviewerName"
            className="tw-w-1/6 tw-text-center tw-pr-4"
          >
            Your Name
          </label>
          <div className="tw-flex-1">
            <Controller
              name="Name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="reviewerName"
                  type="text"
                  className="tw-w-full tw-h-10 tw-py-1.5 tw-px-3  tw-border-solid tw-border tw-border-borderColor tw-rounded-cardcustom tw-outline-none"
                  placeholder="John Doe"
                />
              )}
            />
          </div>
        </div>
        <div className="tw-flex tw-text-sm">
          <label
            htmlFor="review"
            className="tw-w-1/6 tw-text-center tw-pr-4 tw-pt-1.5"
          >
            Review
          </label>
          <div className="tw-flex-1 tw-relative">
            <Controller
              name="Review"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="review"
                  rows={5}
                  className="tw-w-full tw-py-1.5 tw-px-7.5 tw-border tw-border-borderColor tw-rounded-cardcustom tw-outline-none"
                />
              )}
            />
          </div>
        </div>

        <div className="tw-flex tw-items-center tw-text-sm borderBottom tw-pb-5">
          <label htmlFor="rating" className="tw-w-1/6 tw-text-center tw-pr-4">
            Rating
          </label>
          <Controller
            name="Rating"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactRating
                style={{ maxWidth: 100 }}
                value={value}
                onChange={(selectedValue: number) => {
                  onChange(selectedValue);
                }}
              />
            )}
          />
        </div>
        <div className="tw-flex tw-justify-end">
          <button
            type="submit"
            disabled={isMutating}
            className="tw-text-sm lg:tw-text-base tw-bg-primary tw-text-secondary hover:tw-bg-primaryHover hover:tw-text-primary tw-no-underline tw-py-2.5 tw-px-5 tw-rounded-pillcustom tw-transition-all tw-duration-500 tw-ease-in-out"
          >
            {isMutating ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductReviewForm;
