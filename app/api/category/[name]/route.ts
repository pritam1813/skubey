import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
    searchParams,
  }: {
    params: { name: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }
) {
  try {
    //const data = req.json();

    const categoryName =
      params.name.charAt(0).toUpperCase() + params.name.slice(1);

    //console.log(categoryname);

    const data = await prisma.category.findUnique({
      where: { categoryName },
      include: {
        products: {
          select: {
            name: true,
            id: true,
            images: true,
            rating: true,
            price: true,
          },
        },
      },
    });

    console.log(searchParams);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
