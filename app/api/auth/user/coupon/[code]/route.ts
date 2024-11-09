import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    if (params.code === "SKUBEYNEWUSER" || params.code === "skubeynewuser") {
      return NextResponse.json(
        { code: params.code, message: "Coupon Applied" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        error: true,
        message:
          "Coupon is either invalid, expired or reached its usage limit!",
      },
      { status: 403 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message:
          "Coupon is either invalid, expired or reached its usage limit!",
      },
      { status: 403 }
    );
  }
}
