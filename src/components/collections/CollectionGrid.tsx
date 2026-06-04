import { ProductCard } from "@/components/site/ProductCard";
import type { Product } from "@/lib/types";

interface Props {
  products: Product[];
  status: "idle" | "loading" | "error";
  onRetry?: () => void;
}

export function CollectionGrid({ products, status, onRetry }: Props) {
  if (status === "loading") return <SkeletonGrid />;
  if (status === "error") {
    return (
      <div className="border border-destructive/40 bg-destructive/5 py-16 text-center">
        <p className="font-display text-xl font-semibold">Couldn't load collection.</p>
        <p className="mt-2 text-sm text-muted-foreground">Check your connection and try again.</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex h-10 items-center px-5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em]"
          >
            Retry
          </button>
        )}
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-border py-24 text-center">
        <p className="font-display text-2xl font-semibold">No products found.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or check back soon for new drops.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function SkeletonGrid() {
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
