export type ProductCategory = "Streetwear" | "Graphic Tees" | "Anime Inspired" | "Casual";
export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  badge?: string;
  sizes: ProductSize[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  createdAt: string; // ISO
  sales: number;
  featured?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductQuery {
  categories?: ProductCategory[];
  sizes?: ProductSize[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  search?: string;
  sort?: "newest" | "best-selling" | "price-asc" | "price-desc" | "featured";
  page?: number;
  pageSize?: number;
}
