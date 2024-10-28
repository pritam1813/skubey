import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

// Base Types
interface Category {
  id: string;
  name: string;
}

interface ProductAttribute {
  id: string;
  name: string;
  value: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    profile: {
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
    };
  };
}

// Product Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: Decimal;
  stock: number;
  images: string[];
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  attributes: ProductAttribute[];
  reviews: Review[];
  slug: string;
  sku: string;
  isActive: boolean;
  isPublished: boolean;
  tags: string[];
  brand: string | null;
  weight: number | null;
  dimensions: {
    height?: number;
    width?: number;
    length?: number;
  } | null;
  avgRating: number;
  totalReviews: number;
  priceDiscount: Decimal | null;
  salesCount: number;
  viewCount: number;
  metadata: Record<string, any> | null;
}

// API Response Types
interface ProductsApiResponse {
  products: Product[];
  total: number;
  pages: number;
}

interface CategoriesApiResponse {
  categories: Category[];
}

// Form Types
interface ProductFormValues {
  name: string;
  description: string;
  price: string; // String for form input, converted to number on submit
  stock: string; // String for form input, converted to number on submit
  categoryId: string;
  isActive: boolean;
  brand: string;
  tags: string; // Comma-separated string for form input
}

// Zustand Store Type
interface ProductStore {
  selectedProducts: string[];
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  setSelectedProducts: (products: string[]) => void;
  toggleProduct: (productId: string) => void;
  clearSelection: () => void;
}

// Props Type
interface ProductTableProps {
  // Add any props if needed
}

// Sort Config Type
interface SortConfig {
  field: keyof Product;
  order: "asc" | "desc";
}

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  stock: z
    .string()
    .min(1, "Stock is required")
    .regex(/^\d+$/, "Stock must be a number"),
  categoryId: z.string().min(1, "Category is required"),
  isActive: z.boolean().default(true),
  brand: z.string().optional(),
  tags: z.string().transform((val) => val.split(",").map((tag) => tag.trim())),
});

type ProductFormData = z.infer<typeof productFormSchema>;

export type {
  Product,
  ProductFormValues,
  ProductsApiResponse,
  Category,
  CategoriesApiResponse,
  ProductStore,
  ProductTableProps,
  SortConfig,
};
