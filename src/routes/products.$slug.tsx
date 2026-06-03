import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { productService } from "@/services/product.service";
import { useCart } from "@/context/CartContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — XPENSE` },
      { name: "description", content: "Wear your story. Shop the XPENSE drop." },
    ],
  }),
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "notfound">("loading");
  const recent = useRecentlyViewed();
  const cart = useCart();

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    productService.getBySlug(slug).then(async (p) => {
      if (cancelled) return;
      if (!p) {
        setStatus("notfound");
        return;
      }
      setProduct(p);
      recent.track(p.id);
      const rel = await productService.getRelated(p, 8);
      if (!cancelled) {
        setRelated(rel);
        setStatus("ready");
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (status === "loading") return <ProductSkeleton />;
  if (status === "notfound" || !product) return <NotFoundState />;

  const images = product.images?.length ? product.images : [product.image];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-6 pb-3">
        <Breadcrumb product={product} />
      </div>

      <section className="mx-auto max-w-[1400px] px-5 md:px-10 pb-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={images} alt={product.name} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-20">
          <ProductTabs product={product} />
        </div>
      </section>

      <RelatedProducts products={related} />
      <RecentlyViewed />

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3 flex items-center gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {product.category}
          </p>
          <p className="font-display text-lg font-semibold tabular-nums">
            ${product.price}
          </p>
        </div>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() =>
            cart.add({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              size: product.sizes[0],
            })
          }
          className="ml-auto inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Sold Out"}
        </button>
      </div>
    </SiteLayout>
  );
}

function Breadcrumb({ product }: { product: Product }) {
  const crumbs = [
    { label: "Home", to: "/" as const, params: undefined },
    { label: "Shop", to: "/shop" as const, params: undefined },
    { label: product.collection ?? product.category, to: "/shop" as const, params: undefined },
  ];
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {crumbs.map((c, i) => (
        <span key={`${c.label}-${i}`} className="flex items-center gap-2">
          <Link to={c.to} className="hover:text-foreground">
            {c.label}
          </Link>
          <ChevronRight className="h-3 w-3" />
        </span>
      ))}
      <span className="text-foreground">{product.name}</span>
    </nav>
  );
}

function ProductSkeleton() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-10">
        <div className="h-3 w-64 bg-secondary animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-[4/5] bg-secondary animate-pulse" />
          <div className="space-y-5">
            <div className="h-3 w-24 bg-secondary animate-pulse" />
            <div className="h-10 w-3/4 bg-secondary animate-pulse" />
            <div className="h-6 w-20 bg-secondary animate-pulse" />
            <div className="h-24 w-full bg-secondary animate-pulse" />
            <div className="h-11 w-1/2 bg-secondary animate-pulse" />
            <div className="h-14 w-full bg-secondary animate-pulse" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function NotFoundState() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl text-center px-5 py-32">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          404 — Drop Sold Out
        </p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold">
          This piece can't be found.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The product you're looking for may have moved or sold out.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-accent"
        >
          Back to Shop
        </Link>
      </div>
    </SiteLayout>
  );
}

void notFound;
