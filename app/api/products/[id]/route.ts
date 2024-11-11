import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { z } from "zod";
import { ProductSchema } from "@/app/types/product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        attributes: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
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
    const validatedData = ProductSchema.parse(body);

    const product = await prisma.product.update({
      where: { id: params.id },
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

    return NextResponse.json(product);
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
    // Check if product has any associated orders
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product._count.orderItems > 0) {
      // Soft delete by marking as inactive instead of deleting
      await prisma.product.update({
        where: { id: params.id },
        data: { isActive: false },
      });

      return NextResponse.json(
        { message: "Product deactivated successfully" },
        { status: 200 }
      );
    }

    // Hard delete if no orders exist
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
