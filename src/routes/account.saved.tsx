import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { productService } from "@/services";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/account/saved")({
  component: AccountSaved,
});

function AccountSaved() {
  const { ids } = useWishlist();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    productService.getByIds(ids).then((r) => {
      if (!cancelled) {
        setItems(r);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [ids]);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Saved pieces</h2>
      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
      ) : items.length === 0 ? (
        <div className="mt-8 border border-dashed border-border py-20 text-center">
          <p className="font-display text-xl font-semibold">Nothing saved yet.</p>
          <Link to="/shop" className="mt-5 inline-flex h-11 items-center px-6 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent">
            Browse shop
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
