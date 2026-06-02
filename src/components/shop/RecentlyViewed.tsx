import { useEffect, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { getProductsByIds } from "@/lib/api/products";
import type { Product } from "@/lib/types";

export function RecentlyViewed() {
  const { ids } = useRecentlyViewed();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (ids.length === 0) { setItems([]); return; }
    getProductsByIds(ids).then((res) => {
      if (cancelled) return;
      // Preserve order from `ids`
      const ordered = ids
        .map((id) => res.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));
      setItems(ordered);
    });
    return () => { cancelled = true; };
  }, [ids]);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— Recently Viewed</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Picked up where you left off.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
          {items.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
