import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ShopHero } from "@/components/shop/ShopHero";
import { Filters } from "@/components/shop/Filters";
import { SearchSort } from "@/components/shop/SearchSort";
import { Pagination } from "@/components/shop/Pagination";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { ProductCard } from "@/components/site/ProductCard";
import { Newsletter } from "@/components/site/Newsletter";
import { listProducts } from "@/lib/api/products";
import type { PaginatedResponse, Product, ProductQuery } from "@/lib/types";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — XPENSE | Streetwear, Graphic Tees & Anime Apparel" },
      { name: "description", content: "Browse the full XPENSE catalog: streetwear, graphic tees, anime-inspired drops and casual essentials." },
      { property: "og:title", content: "Shop XPENSE" },
      { property: "og:description", content: "Browse the full XPENSE catalog." },
    ],
  }),
  component: ShopPage,
});

const PAGE_SIZE = 8;

function ShopPage() {
  const [query, setQuery] = useState<ProductQuery>({ sort: "newest", page: 1, pageSize: PAGE_SIZE });
  const [result, setResult] = useState<PaginatedResponse<Product> | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    listProducts(query)
      .then((res) => { if (!cancelled) { setResult(res); setStatus("idle"); } })
      .catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, [query]);

  const products = result?.data ?? [];
  const total = result?.total ?? 0;

  return (
    <SiteLayout>
      <ShopHero />
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          <div className="hidden lg:block">
            <Filters value={query} onChange={setQuery} />
          </div>

          <div>
            <SearchSort
              value={query}
              total={total}
              onChange={setQuery}
              onOpenFilters={() => setMobileFiltersOpen(true)}
            />

            {status === "loading" && <ProductSkeletonGrid />}
            {status === "error" && <ErrorState onRetry={() => setQuery({ ...query })} />}
            {status === "idle" && products.length === 0 && <EmptyState />}
            {status === "idle" && products.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <Pagination
              page={query.page ?? 1}
              pageSize={query.pageSize ?? PAGE_SIZE}
              total={total}
              onChange={(page) => {
                setQuery({ ...query, page });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </section>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-background p-6 overflow-y-auto">
            <Filters
              value={query}
              onChange={(q) => setQuery(q)}
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <RecentlyViewed />
      <Newsletter />
    </SiteLayout>
  );
}

function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="aspect-[4/5] bg-secondary animate-pulse" />
          <div className="mt-4 h-3 w-20 bg-secondary animate-pulse" />
          <div className="mt-2 h-4 w-40 bg-secondary animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-border py-24 text-center">
      <p className="font-display text-2xl font-semibold">No products match your filters.</p>
      <p className="mt-2 text-sm text-muted-foreground">Try clearing filters or broadening your search.</p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="border border-destructive/40 bg-destructive/5 py-16 text-center">
      <p className="font-display text-xl font-semibold">Couldn't load products.</p>
      <p className="mt-2 text-sm text-muted-foreground">Check your connection and try again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex h-10 items-center px-5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em]"
      >
        Retry
      </button>
    </div>
  );
}
