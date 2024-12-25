import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CategorySchema } from "@/app/types/category";

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // await delay(5000);

    const validatedData = CategorySchema.parse(body);

    const category = await prisma.category.create({
      data: {
        ...validatedData,
        slug: validatedData.name.toLowerCase().replace(/\s+/g, "-"),
        // If parentId is provided, calculate level and path
        ...(validatedData.parentId && {
          level: await calculateCategoryLevel(validatedData.parentId),
          path: await calculateCategoryPath(validatedData.parentId),
        }),
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Category already exists" },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const search = searchParams.get("search");
    const parentId = searchParams.get("parentId");

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where: {
          ...(search && {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }),
          ...(parentId && { parentId }),
        },
        include: {
          children: true,
          _count: {
            select: { products: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { order: "asc" },
      }),
      prisma.category.count({
        where: {
          ...(search && {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ],
          }),
          ...(parentId && { parentId }),
        },
      }),
    ]);

    return NextResponse.json({
      categories,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log("Error fetching categories:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Helper functions for category hierarchy
async function calculateCategoryLevel(parentId: string): Promise<number> {
  const parent = await prisma.category.findUnique({
    where: { id: parentId },
    select: { level: true },
  });
  return (parent?.level ?? -1) + 1;
}

async function calculateCategoryPath(parentId: string): Promise<string[]> {
  const parent = await prisma.category.findUnique({
    where: { id: parentId },
    select: { path: true, name: true },
  });
  return [...(parent?.path ?? []), parent?.name ?? ""];
}

export async function DELETE(req: Request) {
  try {
    const { categoryIds } = await req.json();

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Expected array of category IDs" },
        { status: 400 }
      );
    }

    // Check each category for children and products
    const categoriesWithCounts = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      include: {
        _count: {
          select: {
            children: true,
            products: true,
          },
        },
      },
    });

    // Validate that all categories exist
    if (categoriesWithCounts.length !== categoryIds.length) {
      return NextResponse.json(
        { error: "One or more categories not found" },
        { status: 404 }
      );
    }

    // Check for categories with children or products
    const categoriesWithDependencies = categoriesWithCounts.filter(
      (category) => category._count.children > 0 || category._count.products > 0
    );

    if (categoriesWithDependencies.length > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete categories with children or products",
          categories: categoriesWithDependencies.map((cat) => ({
            id: cat.id,
            name: cat.name,
            childrenCount: cat._count.children,
            productsCount: cat._count.products,
          })),
        },
        { status: 400 }
      );
    }

    // Delete all valid categories in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const deletedCategories = await tx.category.deleteMany({
        where: {
          id: {
            in: categoryIds,
          },
        },
      });
      return deletedCategories;
    });

    return NextResponse.json(
      {
        message: `Successfully deleted ${result.count} categories`,
        count: result.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
