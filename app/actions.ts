"use server";

import { FormState } from "./hooks/useFormErrors";
import {
  AddressBookSchema,
  LoginSchema,
  RegistrationSchema,
  UpdatePasswordSchema,
  verifyEmailOtpFormSchema,
} from "./types/formSchema";
import { getBaseUrl } from "./utils/getBaseUrl";
import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

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
    // const supabase = await createClient();
    // const { data, error } = await supabase.auth.verifyOtp({
    //   email: result.data.email,
    //   token: result.data.otp,
    //   type: "signup",
    // });
    const { email, otp } = result.data;
    const verifyemail = await fetch(`${getBaseUrl()}/api/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    // console.log("DAta After Otp: ", data);
    // console.log("Error after otp: ", error);
    const { error, message } = await verifyemail.json();

    if (error !== null) {
      return {
        success: false,
        message: error,
      };
    }

    return {
      success: true,
      message,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
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

// User's Address
export async function addAddress(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const formValues = Object.fromEntries(formData);
  const result = AddressBookSchema.safeParse(formValues);
  // console.log("add address data: ", result.data);
  if (!result.success) {
    return {
      errors: result.error.errors,
      success: false,
      code: "field",
    };
  }

  try {
    const headersList = await headers();
    const cookie = headersList.get("cookie");

    const addaddress = await fetch(`${getBaseUrl()}/api/auth/user/address`, {
      method: "POST",
      body: JSON.stringify(result.data),
      headers: {
        "Content-Type": "application/json",
        cookie: cookie || "",
      },
    });

    const res = await addaddress.json();

    if (!res.success) {
      return {
        success: false,
        code: "api",
        message: "ss",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      code: "api",
    };
  }
  revalidatePath("/user/address", "layout");
  return {
    success: true,
    message: "Address added successfully",
    code: "api",
  };
}

export async function updateAddress(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const formValues = Object.fromEntries(formData);
  const result = AddressBookSchema.safeParse(formValues);
  //console.log(result.data);
  if (!result.success) {
    return {
      errors: result.error.errors,
      success: false,
      code: "field",
    };
  }

  try {
    const headersList = await headers();
    const cookie = headersList.get("cookie");

    const addaddress = await fetch(
      `${getBaseUrl()}/api/auth/user/address/${formValues.addressId}`,
      {
        method: "PATCH",
        body: JSON.stringify(result.data),
        headers: {
          "Content-Type": "application/json",
          cookie: cookie || "",
        },
      }
    );

    const res = await addaddress.json();

    if (!res.success) {
      return {
        success: false,
        code: "api",
        message: "ss",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      code: "api",
    };
  }
  revalidatePath("/user/address", "layout");
  return {
    success: true,
    message: "Address Updated successfully",
    code: "api",
  };
}

//User's Data
export async function updatePassword(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const formValues = Object.fromEntries(formData);
  const result = UpdatePasswordSchema.safeParse(formValues);

  if (!result.success) {
    return {
      errors: result.error.errors,
      success: false,
      code: "field",
    };
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: result.data.newPassword,
    });
    if (error) {
      return {
        success: false,
        code: "api",
        message: error.message,
      };
    }
    return {
      success: true,
      message: "Password Updated successfully",
      code: "api",
    };
  } catch (error) {
    return {
      success: false,
      code: "api",
    };
  }
}

//Coupon
export async function validateCoupon(
  prevState: { message: string; success: boolean },
  formData: FormData
): Promise<{ error: boolean; message: string; success: boolean }> {
  const couponCode = formData.get("coupon");
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  if (!couponCode) {
    return {
      error: true,
      message: "Please enter a coupon code",
      success: false,
    };
  }
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const validateCoupon = await fetch(
      `${getBaseUrl()}/api/auth/user/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookie || "",
        },
      }
    );
    const res = await validateCoupon.json();
    if (res.error) {
      return {
        error: true,
        message: res.message,
        success: false,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong",
      success: false,
    };
  }
  return {
    error: false,
    message: "Coupon Applied",
    success: true,
  };
}

//Checkoutpage

export async function BillingAddress(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  const formValues = Object.fromEntries(formData);
  if (formValues.addressType === "existing") {
    // call create order api with address id
  }

  // Create address and then call order api

  console.log(formValues);

  return {
    success: true,
    code: "api",
    message: "ss",
  };
}
