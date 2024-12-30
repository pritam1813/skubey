// app/api/auth/session/route.ts
import { getSessionUser } from "@/app/lib/dal";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Only return safe user data
    const { user } = session;
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        profile: {
          role: user.profile.role,
        },
      },
    });
  } catch (error) {
    console.error("Session API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
