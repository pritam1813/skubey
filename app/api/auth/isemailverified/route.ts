import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const validEmail = z.string().email().parse(email);

  if (!validEmail)
    return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
  try {
    const user = await prisma.user.findUnique({ where: { email: validEmail } });
    if (user?.emailVerified !== null) {
      return NextResponse.json(
        { error: "Account already verified" },
        { status: 409 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
