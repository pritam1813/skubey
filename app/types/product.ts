import type { Product } from "@prisma/client";
import { z } from "zod";

export const ProductSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    price: z.number().positive("Price must be positive"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    categoryId: z.string().min(1, "Category is required"),
    sku: z.string().optional(),
    isActive: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    brand: z.string().optional(),
    weight: z.number().optional(),
    dimensions: z.record(z.any()).optional(),
    priceDiscount: z
      .number()
      .min(0, "Discount must be a positive number")
      .optional(),
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
  })
  .superRefine(({ price, priceDiscount }, ctx) => {
    if (priceDiscount && priceDiscount >= price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Discount price must be lower than the original price",
        path: ["priceDiscount"],
      });
    }
  });

export type ProductFormData = z.infer<typeof ProductSchema>;

export { Product };
