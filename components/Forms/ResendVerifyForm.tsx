"use client";
import React, { useEffect, useState } from "react";
import { resendVerification } from "@/app/actions";
import { redirect } from "next/navigation";

const ResendVerifyForm = ({ email }: { email: string }) => {
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a stored cooldown in localStorage
    const storedCooldown = localStorage.getItem("resendCooldown");
    const storedTimestamp = localStorage.getItem("resendTimestamp");

    if (storedCooldown && storedTimestamp) {
      const remainingTime = Math.max(
        0,
        60 - Math.floor((Date.now() - parseInt(storedTimestamp)) / 1000)
      );

      setResendCooldown(remainingTime);
    }
  }, []);

  // Effect to manage countdown timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (resendCooldown > 0) {
      intervalId = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            localStorage.removeItem("resendCooldown");
            localStorage.removeItem("resendTimestamp");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    // Prevent resend if cooldown is active
    if (resendCooldown > 0) return;

    // Reset previous messages
    setResendError(null);
    setResendSuccess(null);

    // Prepare form data
    const formData = new FormData();
    formData.append("email", email!);

    try {
      // Call server action
      const result = await resendVerification(formData);

      if (result.success) {
        // Set success message
        setResendSuccess(result.message);

        // Start 60-second cooldown
        setResendCooldown(60);

        // Store cooldown in localStorage
        localStorage.setItem("resendCooldown", "60");
        localStorage.setItem("resendTimestamp", Date.now().toString());
      } else {
        // Set error message
        setResendError(result.error || "Failed to resend verification email");
      }
    } catch (error) {
      setResendError("An unexpected error occurred");
    }
  };

  // Redirect if no email
  if (!email) {
    redirect("/signup");
  }
  return (
    <div className="tw-align-middle tw-pt-2.5 tw-text-sm tw-mt-3 tw-text-center">
      <button
        onClick={handleResendEmail}
        disabled={resendCooldown > 0}
        type="submit"
        className=" tw-inline-flex  tw-text-primary hover:tw-text-secondaryLight tw-align-middle"
      >
        {resendCooldown > 0
          ? `Resend in ${resendCooldown} seconds`
          : "Resend Verification Email"}
      </button>
    </div>
  );
};

export default ResendVerifyForm;
