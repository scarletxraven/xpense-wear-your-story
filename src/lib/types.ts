export type ProductCategory = "Streetwear" | "Graphic Tees" | "Anime Inspired" | "Casual";
export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";

export interface ProductReview {
  name: string;
  rating: number;
  text: string;
  date?: string;
}

export interface SizeGuideRow {
  size: string;
  chest: string;
  length: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection?: string;
  /** Legacy free-form description. Prefer shortDescription / fullDescription. */
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  price: number;
  image: string;
  images?: string[];
  badge?: string;
  /** Optional override label for the stock pill (e.g. "Low Stock", "Pre-order"). */
  statusLabel?: string;
  sizes: ProductSize[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  stock?: number;
  createdAt: string; // ISO
  sales: number;
  featured?: boolean;
  /** Bullet-list features rendered under the product. */
  features?: string[];
  shippingInfo?: string[];
  returnsInfo?: string[];
  sizeGuide?: SizeGuideRow[];
  reviews?: ProductReview[];
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
