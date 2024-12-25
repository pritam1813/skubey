import { AddressBookSchema } from "@/app/types/formSchema";
import { createClient } from "@/app/utils/supabase/server";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  props: {
    params: Promise<{
      addressId: string;
    }>;
  }
) {
  const params = await props.params;
  try {
    const address = await prisma.address.findUnique({
      omit: {
        userId: true,
      },
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  props: {
    params: Promise<{
      addressId: string;
    }>;
  }
) {
  const params = await props.params;
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

  try {
    const body = await req.json();
    const validatedData = AddressBookSchema.parse(body);
    const shouldBeDefault = validatedData.isDefault === "yes";

    // Using transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // If this address should be default, unset any existing default except this one
      if (shouldBeDefault) {
        await tx.address.updateMany({
          where: {
            userId: user.id,
            isDefault: true,
            NOT: {
              id: params.addressId,
            },
          },
          data: {
            isDefault: false,
          },
        });
      }

      // Update the address
      await tx.address.update({
        where: {
          id: params.addressId,
        },
        data: {
          ...validatedData,
          isDefault: shouldBeDefault,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Address Updated successfully",
      },
      { status: 200 }
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

export async function DELETE(
  req: NextRequest,
  props: {
    params: Promise<{
      addressId: string;
    }>;
  }
) {
  const params = await props.params;
  try {
    const result = await prisma.address.findUnique({
      where: {
        id: params.addressId,
        isDefault: true,
      },
    });

    if (result?.isDefault) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot Delete Default Address",
        },
        { status: 400 }
      );
    }

    await prisma.address.delete({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(
      {
        message: "Address Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
