import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product } from "@/lib/types";

/**
 * Horizontal scroll carousel — snap on mobile, arrow controls on desktop.
 */
export function ProductCarousel({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 md:gap-6 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-[32%] lg:w-[24%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <div className="mt-6 hidden md:flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scroll(-1)}
          className="flex h-10 w-10 items-center justify-center border border-border hover:bg-primary hover:text-primary-foreground transition"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scroll(1)}
          className="flex h-10 w-10 items-center justify-center border border-border hover:bg-primary hover:text-primary-foreground transition"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
