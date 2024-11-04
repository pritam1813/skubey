"use server";

import { FormState } from "./hooks/useFormErrors";
import {
  LoginSchema,
  RegistrationSchema,
  verifyEmailOtpFormSchema,
} from "./types/formSchema";
import { getBaseUrl } from "./utils/getBaseUrl";
import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createUser(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const formValues = Object.fromEntries(formData);
  const result = RegistrationSchema.safeParse(formValues);

  if (!result.success) {
    return {
      errors: result.error.errors,
      success: false,
      code: "field",
    };
  }
  // console.log("Data: ", result.data);

  // API call to authenticate the user

  try {
    const signupuser = await fetch(`${getBaseUrl()}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(result.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { error } = await signupuser.json();
    if (error) {
      return {
        success: false,
        code: "api",
        message: error,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      code: "api",
    };
  }
  redirect(`/verifyemail?email=${result.data.email}`);
}

export async function verifyEmailOTP(prevState: any, formData: FormData) {
  try {
    const formValues = Object.fromEntries(formData);
    const result = verifyEmailOtpFormSchema.safeParse(formValues);

    if (!result.success) {
      return {
        success: false,
        message: "Invalid Request",
      };
    }
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email: result.data.email,
      token: result.data.otp,
      type: "signup",
    });

    // console.log("DAta After Otp: ", data);
    // console.log("Error after otp: ", error);

    if (error) {
      return {
        success: false,
        message:
          error.code === "otp_expired"
            ? "OTP has expired or is invalid"
            : "Invalid Request",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
  revalidatePath("/", "layout");
  redirect("/user");
}

export async function resendVerification(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${getBaseUrl()}/auth/callback`,
    },
  });
  // console.log(error);
  // console.log(data);

  if (error) {
    return {
      error: error.message || "Failed to resend verification email",
    };
  }

  return {
    success: true,
    message: "Verification email resent successfully",
  };
}

// Login
export async function login(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const formValues = Object.fromEntries(formData);
  const result = LoginSchema.safeParse(formValues);

  if (!result.success) {
    return {
      errors: result.error.errors,
      success: false,
      code: "field",
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword(result.data);
    // console.log("data: ", data);

    if (error) {
      return {
        success: false,
        code: "api",
        message: error.message || "Something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      code: "api",
    };
  }
  revalidatePath("/", "layout");
  redirect("/user");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
