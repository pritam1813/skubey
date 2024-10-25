import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(50, "Slug must be less than 50 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  parentId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0, "Order must be a positive number").default(0),
  icon: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  metadata: z.record(z.any()).optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export interface ParentCategory {
  id: string;
  name: string;
}

export type CategoryFormProps = {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  parentCategories?: ParentCategory[];
  initialData?: Partial<CategoryFormData>;
};
