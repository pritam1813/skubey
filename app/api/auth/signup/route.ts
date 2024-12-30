import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/prisma/db";
import { z } from "zod";
import { hashPassword } from "@/utils/password";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import { VerificationService } from "@/lib/verification";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().regex(/^\d{10}$/),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  newsletter: z.enum(["yes", "no"]).default("yes").optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = UserSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsedData.error.issues },
        { status: 400 }
      );
    }

    const { email, phone, firstName, lastName, newsletter } = parsedData.data;
    const password = await hashPassword(parsedData.data.password);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password,
          profile: {
            create: {
              phone,
              firstName,
              lastName,
              metadata: {
                newsletter,
              },
            },
          },
        },
      });

      // const verificationData = await VerificationService.createVerification(
      //   user.email
      // );
      // await VerificationService.sendVerificationEmail(
      //   user.email,
      //   verificationData
      // );

      return NextResponse.json(
        {
          message: "Success. Please check your email to verify your account.",
          user: { ...user, password: undefined },
        },
        { status: 201 }
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          // Unique constraint violation
          return NextResponse.json(
            { error: "User already exists" },
            { status: 409 }
          );
        }
      }
      throw e; // Re-throw other database errors
    }
  } catch (error) {
    console.error("Server Side Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
