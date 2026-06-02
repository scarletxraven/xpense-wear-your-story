import { PRODUCTS } from "@/lib/products";
import type {
  PaginatedResponse,
  Product,
  ProductQuery,
} from "@/lib/types";

/**
 * Mock product API.
 * Each function returns a Promise so that swapping to a real backend
 * (fetch / TanStack Query / server functions) requires no consumer changes.
 *
 *   Future: replace bodies with `await fetch("/api/products?...")`.
 */

const LATENCY_MS = 250;
const delay = <T>(value: T, ms = LATENCY_MS): Promise<T> =>
  new Promise((r) => setTimeout(() => r(value), ms));

export async function listProducts(
  query: ProductQuery = {},
): Promise<PaginatedResponse<Product>> {
  const {
    categories,
    sizes,
    colors,
    minPrice,
    maxPrice,
    inStockOnly,
    search,
    sort = "newest",
    page = 1,
    pageSize = 8,
  } = query;

  let rows = [...PRODUCTS];

  if (categories?.length) rows = rows.filter((p) => categories.includes(p.category));
  if (sizes?.length) rows = rows.filter((p) => p.sizes.some((s) => sizes.includes(s)));
  if (colors?.length)
    rows = rows.filter((p) => p.colors.some((c) => colors.includes(c.name)));
  if (typeof minPrice === "number") rows = rows.filter((p) => p.price >= minPrice);
  if (typeof maxPrice === "number") rows = rows.filter((p) => p.price <= maxPrice);
  if (inStockOnly) rows = rows.filter((p) => p.inStock);
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }

  switch (sort) {
    case "best-selling": rows.sort((a, b) => b.sales - a.sales); break;
    case "price-asc": rows.sort((a, b) => a.price - b.price); break;
    case "price-desc": rows.sort((a, b) => b.price - a.price); break;
    case "featured":
      rows.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
      break;
    case "newest":
    default:
      rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const total = rows.length;
  const start = (page - 1) * pageSize;
  const data = rows.slice(start, start + pageSize);

  return delay({ data, total, page, pageSize });
}

export async function getProductById(id: string): Promise<Product | null> {
  return delay(PRODUCTS.find((p) => p.id === id) ?? null);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  return delay(PRODUCTS.filter((p) => ids.includes(p.id)));
}
