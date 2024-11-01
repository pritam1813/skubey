import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const ProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  images: z.array(z.string()),
  categoryId: z.string(),
  isActive: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  brand: z.string().optional(),
  weight: z.number().optional(),
  dimensions: z.record(z.any()).optional(),
  priceDiscount: z.number().optional(),
  metadata: z.record(z.any()).optional(),
  attributes: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
        isFilterable: z.boolean().optional(),
        isSearchable: z.boolean().optional(),
        displayOrder: z.number().optional(),
      })
    )
    .optional(),
});

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = ProductSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug: validatedData.name.toLowerCase().replace(/\s+/g, "-"),
        attributes: {
          create: validatedData.attributes,
        },
      },
      include: {
        category: true,
        attributes: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
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
    const categoryId = searchParams.get("categoryId");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const brand = searchParams.get("brand");
    const inStock = searchParams.get("inStock");
    const sortBy = searchParams.get("sortBy") ?? "createdAt";
    const sortOrder = searchParams.get("sortOrder") ?? "desc";

    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
          {
            description: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          { tags: { has: search } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(brand && { brand }),
      ...(inStock === "true" && { stock: { gt: 0 } }),
      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: parseFloat(minPrice) }),
          ...(maxPrice && { lte: parseFloat(maxPrice) }),
        },
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          attributes: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
