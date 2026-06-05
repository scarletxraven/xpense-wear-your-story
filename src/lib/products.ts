/**
 * Legacy re-export. The canonical editable catalog lives in
 * `src/content/products.ts`. Importers across the app can keep using
 * `@/lib/products` without changes.
 */
export { PRODUCTS, BRAND_DEFAULTS, createProduct, updateProduct, deleteProduct } from "@/content/products";
import { PRODUCTS } from "@/content/products";

export const newArrivals = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);
export const bestSellers = [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 4);
