import { VerificationService } from "@/lib/verification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const resendCheck = await VerificationService.canResendVerification(email);

    if (!resendCheck.canResend) {
      return NextResponse.json(
        {
          error: `Please wait ${resendCheck.timeRemaining} seconds before requesting another verification email`,
        },
        { status: 429 }
      );
    }

    const verificationData = await VerificationService.createVerification(
      email
    );
    await VerificationService.sendVerificationEmail(email, verificationData);

    return NextResponse.json({ message: "Verification email sent" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
