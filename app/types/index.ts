import { ProductThumbnailProps } from "@/components/Products/ProductsThumbnail";

export interface CategoriesProps {
  categoryId: number;
  categoryName: string;
}

export interface CategoryWiseProductThumbnailProps {
  products: ProductThumbnailProps[];
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  rating: number;
  images: ProductImage[];
  slug: string;
  categories: CategoriesProps[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type TitleMapping = {
  [key: string]: string;
};
