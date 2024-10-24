import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

const sampleCategories = [
  { categoryName: "Latest" },
  { categoryName: "Bestseller" },
  { categoryName: "Featured" },
];

export async function GET(req: NextRequest) {
  try {
    // const { searchParams } = new URL(req.url);
    // const id = searchParams.get("id");

    // const include

    const data = await prisma.category.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const category = await prisma.category.create({
      data,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
