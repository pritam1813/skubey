import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { CategorySchema } from "@/app/types/category";
import { z } from "zod";

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: params.slug },
      include: {
        children: true,
        parent: true,
        products: {
          take: 10,
          select: {
            id: true,
            name: true,
            price: true,
            priceDiscount: true,
            images: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedData = CategorySchema.partial().parse(body);

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        ...(validatedData.name && {
          slug: validatedData.name.toLowerCase().replace(/\s+/g, "-"),
        }),
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if category has children or products
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            children: true,
            products: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    if (category._count.children > 0 || category._count.products > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with children or products" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
