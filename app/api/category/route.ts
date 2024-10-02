import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

const sampleCategories = [
  { categoryName: "Latest" },
  { categoryName: "Bestseller" },
  { categoryName: "Featured" },
];

export async function GET(req: Request) {
  try {
    //const data = req.json();
    const data = await prisma.category.findMany({
      include: { products: { select: { name: true, id: true } } },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  try {
    //const data = req.json();
    const data = await prisma.category.createMany({
      data: sampleCategories,
      skipDuplicates: true,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
