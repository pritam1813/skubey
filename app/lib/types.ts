export interface CategoriesProps {
  categoryName: string;
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
