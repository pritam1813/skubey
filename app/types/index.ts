import { ProductThumbnailProps } from "@/components/Products/ProductsThumbnail";
import { Product } from "@/app/types/product";

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

export interface CartItem extends Product {
  quantity: number;
}

export type TitleMapping = {
  [key: string]: string;
};

export type { Product };
