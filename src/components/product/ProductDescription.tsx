import type { Product } from "@/lib/types";

/**
 * Short description block shown above the selectors.
 */
export function ProductDescription({ product }: { product: Product }) {
  const text =
    product.shortDescription ??
    product.description ??
    "A staple drop built around quiet confidence.";
  return (
    <p className="text-sm leading-relaxed text-muted-foreground max-w-prose">
      {text}
    </p>
  );
}
