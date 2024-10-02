import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
// import { toyData } from "@/data/products";
import { z } from "zod";

// Get all product data
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { categories: true, images: true },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

// Define the schema for image
const ProductImageSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
});

// Define the schema for product creation
const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  discount: z.number().min(0).max(100).optional(),
  inStock: z.boolean().default(true),
  categories: z.array(z.string()).default(["latest"]),
  images: z.array(ProductImageSchema).min(1, "At least one image is required"),
});

// Creating a product
export async function POST(request: Request) {
  try {
    // Parse request body
    //const json = await request.json();

    // Validate input
    //const validatedData = CreateProductSchema.parse(JSON.parse(sampData));

    // Create product with images
    // const product = await prisma.product.create({
    //   data: {
    //     name: validatedData.name,
    //     description: validatedData.description,
    //     price: validatedData.price,
    //     discount: validatedData.discount,
    //     inStock: validatedData.inStock,
    //     categories: validatedData.categories,
    //     images: {
    //       create: validatedData.images,
    //     },
    //   },
    //   include: {
    //     images: true, // Include images in the response
    //   },
    // });

    //To add sample data

    // toyData.map(async (product) => {
    //   await prisma.product.create({
    //     data: {
    //       name: product.name,
    //       price: product.price,
    //       rating: product.rating,
    //       images: {
    //         create: product.images.map((image) => ({
    //           url: image.url,
    //           alt: image.alt,
    //         })),
    //       },
    //       categories: {
    //         connectOrCreate: product.categories.map((category) => ({
    //           where: { categoryName: category.categoryName },
    //           create: { categoryName: category.categoryName },
    //         })),
    //       },
    //     },
    //   });
    // });

    return NextResponse.json({ message: "product added" }, { status: 201 });
  } catch (error) {
    console.error("Error adding sample products:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
