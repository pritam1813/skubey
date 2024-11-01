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

type RegistrationData = z.infer<typeof RegistrationSchema>;

export type { RegistrationData };
export { RegistrationSchema, verifyEmailOtpFormSchema };
