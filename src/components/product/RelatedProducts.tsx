import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product } from "@/lib/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              — You May Also Like
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
              More from the drop.
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scroll(-1)}
              className="h-10 w-10 grid place-items-center border border-border hover:border-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scroll(1)}
              className="h-10 w-10 grid place-items-center border border-border hover:border-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div
          ref={ref}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="snap-start shrink-0 w-[70%] sm:w-[40%] md:w-[28%] lg:w-[22%]"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
