import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

export type FormState = {
  errors?: z.ZodIssue[];
  success?: boolean;
  code?: "api" | "field";
  message?: string;
};

export function useFormErrors(state: FormState | null) {
  useEffect(() => {
    if (state?.message) {
      state?.success
        ? toast.success(state?.message)
        : toast.error(state?.message);
    }
  }, [state]);

  // Helper function to get field-specific errors
  const getFieldError = (fieldName: string) => {
    return state?.errors?.find((error) => error.path[0] === fieldName)?.message;
  };

  return { getFieldError };
}
