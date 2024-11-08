import { z } from "zod";

// Signup Schema
const RegistrationSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    newsletter: z.enum(["yes", "no"]).default("yes"),
    agree: z.string().transform((val) => val === "on"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const verifyEmailOtpFormSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password is required" }),
});

const AddressBookSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  company: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
  addressOne: z.string().min(1, { message: "Address is required" }),
  addressTwo: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, { message: "Post Code must be 6 digits" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "Region / State is required" }),
  isDefault: z.enum(["yes", "no"]).default("yes"),
});

type RegistrationData = z.infer<typeof RegistrationSchema>;
type AddressData = z.infer<typeof AddressBookSchema>;

export type { RegistrationData, AddressData };
export {
  RegistrationSchema,
  verifyEmailOtpFormSchema,
  LoginSchema,
  AddressBookSchema,
};
