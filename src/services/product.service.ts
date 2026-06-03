/**
 * Product service — frontend placeholder.
 *
 * Centralizes all product data access. UI components MUST go through this
 * service (not `lib/api/products` directly) so we can swap the underlying
 * implementation for a real backend later without touching components.
 */
import {
  listProducts as _list,
  getProductById as _getById,
  getProductsByIds as _getByIds,
} from "@/lib/api/products";
import type { PaginatedResponse, Product, ProductQuery } from "@/types";

export const productService = {
  list: (query?: ProductQuery): Promise<PaginatedResponse<Product>> => _list(query),
  getById: (id: string): Promise<Product | null> => _getById(id),
  getByIds: (ids: string[]): Promise<Product[]> => _getByIds(ids),
};

export type ProductService = typeof productService;
