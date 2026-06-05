import type { Product } from "@/lib/types";
import { BRAND_DEFAULTS } from "@/content/products";

/**
 * Product features list — falls back to brand-wide defaults.
 */
export function ProductFeatures({ product }: { product: Product }) {
  const features = product.features?.length
    ? product.features
    : BRAND_DEFAULTS.features;

  return (
    <ul className="text-xs uppercase tracking-[0.18em] text-muted-foreground space-y-2 border-t border-border pt-6">
      {features.map((f) => (
        <li key={f}>— {f}</li>
      ))}
      <li>— Free shipping over ${BRAND_DEFAULTS.shippingThreshold}</li>
      <li>— {BRAND_DEFAULTS.returnsDays}-day easy returns</li>
      <li>— {BRAND_DEFAULTS.brandStatement}</li>
    </ul>
  );
}
