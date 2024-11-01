import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
import prisma from "@/prisma/db";
import { z } from "zod";
import { getBaseUrl } from "@/app/utils/getBaseUrl";

const PrismaUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().regex(/^\d{10}$/),
  newsletter: z.enum(["yes", "no"]).default("yes").optional(),
});

const SupabaseUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().regex(/^\d{10}$/),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const supabaseUserData = SupabaseUserSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: supabaseUserData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const supabase = await createClient();
    const { error, data } = await supabase.auth.signUp({
      ...supabaseUserData,
      options: {
        emailRedirectTo: `${getBaseUrl()}/api/auth/callback`,
      },
    });

    // console.log(data);

    if (error) {
      console.log("Error: ", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const prismaUserData = PrismaUserSchema.parse({
      ...body,
      id: data.user?.id,
      phoneNumber: body.phone,
    });

    const { id, email, firstName, lastName, phoneNumber, newsletter } =
      prismaUserData;

    const user = await prisma.user.create({
      data: {
        id,
        email,
        profile: {
          create: {
            firstName,
            lastName,
            phoneNumber,
            metadata: {
              newsletter,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json({ message: "Success", data }, { status: 201 });
  } catch (error) {
    console.log("Server Side Error : ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
