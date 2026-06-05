import type { Product } from "@/lib/types";

/**
 * Price + stock label row.
 */
export function ProductMeta({ product }: { product: Product }) {
  const statusLabel =
    product.statusLabel ?? (product.inStock ? "In Stock" : "Sold Out");

  return (
    <div className="flex items-center gap-4">
      <p className="font-display text-2xl font-semibold tabular-nums">
        ${product.price}
      </p>
      <span
        className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] ${
          product.inStock ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            product.inStock ? "bg-foreground" : "bg-muted-foreground"
          }`}
        />
        {statusLabel}
      </span>
      {typeof product.stock === "number" && product.stock > 0 && product.stock <= 10 && (
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          · Only {product.stock} left
        </span>
      )}
    </div>
  );
}
