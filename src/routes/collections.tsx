import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Collections } from "@/components/site/Collections";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — XPENSE" },
      { name: "description", content: "Explore curated XPENSE collections: streetwear, anime-inspired drops, graphic tees and casual essentials." },
      { property: "og:title", content: "Collections — XPENSE" },
      { property: "og:description", content: "Curated XPENSE collections." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— Collections</p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            Curated drops.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Bodies of work, not just products. Each collection is a story released in a limited run.
          </p>
          <Link to="/shop" className="mt-8 inline-flex h-11 items-center px-6 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent">
            Shop all →
          </Link>
        </div>
      </section>
      <Collections />
      <Newsletter />
    </SiteLayout>
  );
}
