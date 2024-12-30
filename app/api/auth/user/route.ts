import prisma from "@/prisma/db";
import { verifyPassword } from "@/utils/password";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(8) })
      .safeParse(body);
    let user = null;
    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;
      user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return NextResponse.json(
          { error: "Invalid Credentials" },
          { status: 401 }
        );

      const passwordMatch = await verifyPassword(password, user.password);
      if (passwordMatch) {
        console.log(user);
        return NextResponse.json(user, { status: 200 });
      }
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: "Invalid Request" }, { status: 403 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}

export async function PATCH(request: Request) {
  const data = await request.json();
  console.log("Backend Data: ", data);

  return NextResponse.json(
    { success: true, message: "Address added successfully" },
    { status: 200 }
  );
}
