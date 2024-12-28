import { NextRequest, NextResponse } from "next/server";
import { VerificationService } from "@/lib/verification";
import prisma from "@/prisma/db";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Missing email or OTP" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email } });

    if (user?.emailVerified !== null) {
      return NextResponse.json(
        { error: "Account already verified" },
        { status: 409 }
      );
    }

    const isValid = await VerificationService.verifyOTP(email, otp);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const email = await VerificationService.verifyToken(token);

    if (!email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user?.emailVerified !== null) {
      return NextResponse.json(
        { error: "Account already verified" },
        { status: 409 }
      );
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
