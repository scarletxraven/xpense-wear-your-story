import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { getProductsByIds } from "@/lib/api/products";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{ title: "Wishlist — XPENSE" }, { name: "description", content: "Pieces you've saved." }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids } = useWishlist();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductsByIds(ids).then((res) => { if (!cancelled) { setItems(res); setLoading(false); } });
    return () => { cancelled = true; };
  }, [ids]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Wishlist</h1>
        <p className="mt-3 text-muted-foreground">{ids.length} {ids.length === 1 ? "piece" : "pieces"} saved</p>

        {loading ? (
          <div className="mt-12 text-sm text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="mt-12 border border-dashed border-border py-24 text-center">
            <p className="font-display text-2xl font-semibold">Nothing saved yet.</p>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
            <Link to="/shop" className="mt-6 inline-flex h-11 items-center px-6 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent">
              Browse shop
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
