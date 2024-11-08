import { createClient } from "@/app/utils/supabase/server";
import prisma from "@/prisma/db";
import { AddressBookSchema } from "@/app/types/formSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const data = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        addresses: true,
      },
    });

    return Response.json(data?.addresses, { status: 200 });
  }
  return Response.json({
    success: false,
    address: null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = AddressBookSchema.parse(body);
    const shouldBeDefault = validatedData.isDefault === "yes";

    if (shouldBeDefault) {
      await prisma.address.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        addresses: {
          create: {
            ...validatedData,
            isDefault: shouldBeDefault,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Address added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add Address Error Backend: ", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
