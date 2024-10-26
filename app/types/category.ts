import { z } from "zod";

// Validation schema for category
export const CategorySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  parentId: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export type CategoryFormData = z.infer<typeof CategorySchema>;

export interface ParentCategory {
  id: string;
  name: string;
}

export type CategoryFormProps = {
  parentCategories?: ParentCategory[];
  initialData?: Partial<CategoryFormData>;
};

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
