import { createClient } from "@/app/utils/supabase/server";
import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("User: ", user);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      profile: true,
    },
  });

  return NextResponse.json({ success: true, result }, { status: 200 });
}

export async function PATCH(request: Request) {
  const data = await request.json();
  console.log("Backend Data: ", data);

  return NextResponse.json(
    { success: true, message: "Address added successfully" },
    { status: 200 }
  );
}
