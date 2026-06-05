import type { Product } from "@/lib/types";

/**
 * Product hero — name, category/collection, badge.
 * Content driven entirely by the Product record.
 */
export function ProductHeader({ product }: { product: Product }) {
  return (
    <header>
      <div className="flex items-center gap-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {product.collection ?? product.category}
        </p>
        {product.badge && (
          <span className="bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>
      <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.05] text-balance">
        {product.name}
      </h1>
    </header>
  );
}
