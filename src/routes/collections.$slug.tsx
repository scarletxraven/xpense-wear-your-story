import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Newsletter } from "@/components/site/Newsletter";
import { CollectionHero } from "@/components/collections/CollectionHero";
import { CollectionFilters } from "@/components/collections/CollectionFilters";
import { CollectionGrid } from "@/components/collections/CollectionGrid";
import { collectionService, type CollectionMeta } from "@/services/collection.service";
import type { Product, ProductQuery, ProductSize } from "@/lib/types";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleize(params.slug)} — XPENSE Collection` },
      {
        name: "description",
        content: `Shop the XPENSE ${titleize(params.slug)} collection — limited drops, premium fabrics, made to be worn loud.`,
      },
      { property: "og:title", content: `${titleize(params.slug)} — XPENSE` },
    ],
  }),
  component: CollectionDetailPage,
});

function titleize(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

function CollectionDetailPage() {
  const { slug } = Route.useParams();
  const [collection, setCollection] = useState<CollectionMeta | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [missing, setMissing] = useState(false);
  const [query, setQuery] = useState<ProductQuery>({ sort: "newest" });

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setMissing(false);
    Promise.all([
      collectionService.getCollectionBySlug(slug),
      collectionService.getProductsByCollection(slug),
    ])
      .then(([col, products]) => {
        if (cancelled) return;
        if (!col) { setMissing(true); setStatus("idle"); return; }
        setCollection(col);
        setAllProducts(products);
        setStatus("idle");
      })
      .catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; };
  }, [slug]);

  const filtered = useMemo(() => {
    let rows = [...allProducts];
    if (query.sizes?.length) {
      rows = rows.filter((p) => p.sizes.some((s) => query.sizes!.includes(s as ProductSize)));
    }
    if (typeof query.maxPrice === "number") {
      rows = rows.filter((p) => p.price <= query.maxPrice!);
    }
    switch (query.sort) {
      case "best-selling": rows.sort((a, b) => b.sales - a.sales); break;
      case "price-asc": rows.sort((a, b) => a.price - b.price); break;
      case "price-desc": rows.sort((a, b) => b.price - a.price); break;
      case "featured":
        rows.sort((a, b) => Number(!!b.featured) - Number(!!a.featured)); break;
      default: rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return rows;
  }, [allProducts, query]);

  if (missing) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-24 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— 404</p>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold">Collection not found.</h1>
          <p className="mt-4 text-muted-foreground">The drop you’re looking for doesn’t exist.</p>
          <Link
            to="/collections"
            className="mt-8 inline-flex h-11 items-center px-6 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent"
          >
            View all collections
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {collection ? (
        <CollectionHero collection={collection} productCount={allProducts.length} />
      ) : (
        <div className="border-b border-border bg-secondary/40 py-16">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="h-8 w-40 bg-secondary animate-pulse" />
            <div className="mt-6 h-16 w-2/3 max-w-xl bg-secondary animate-pulse" />
          </div>
        </div>
      )}

      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
        <CollectionFilters value={query} onChange={setQuery} total={filtered.length} />
        <CollectionGrid
          products={filtered}
          status={status}
          onRetry={() => setQuery({ ...query })}
        />
      </section>

      <Newsletter />
    </SiteLayout>
  );
}
