import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import type { SectionBlock } from "@/content/brand";
import { ProductCarousel } from "./ProductCarousel";

/**
 * Editable product showcase section.
 * Renders title/subtitle/CTA from config + carousel of products.
 */
export function ProductShowcase({
  id,
  block,
  products,
}: {
  id?: string;
  block: SectionBlock;
  products: Product[];
}) {
  return (
    <section id={id} className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {block.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-[0.95] text-balance">
              {block.title}
            </h2>
            {block.subtitle && (
              <p className="mt-4 text-muted-foreground max-w-md">{block.subtitle}</p>
            )}
          </div>
          <Link
            to={block.buttonHref}
            className="inline-flex items-center gap-2 self-start md:self-end text-sm uppercase tracking-[0.22em] underline-offset-8 hover:underline"
          >
            {block.buttonText} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
