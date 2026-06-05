import { useState } from "react";
import type { Product } from "@/lib/types";
import { BRAND_DEFAULTS } from "@/content/products";

const TABS = ["Description", "Size Guide", "Shipping", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("Description");

  const description =
    product.fullDescription ?? product.description ?? product.shortDescription ?? "";
  const features = product.features?.length ? product.features : BRAND_DEFAULTS.features;
  const sizeGuide = product.sizeGuide?.length ? product.sizeGuide : BRAND_DEFAULTS.sizeGuide;
  const shipping = product.shippingInfo?.length ? product.shippingInfo : BRAND_DEFAULTS.shipping;
  const returns = product.returnsInfo?.length ? product.returnsInfo : BRAND_DEFAULTS.returns;
  const reviews = product.reviews?.length ? product.reviews : BRAND_DEFAULTS.reviews;

  return (
    <section className="border-t border-border">
      <div className="flex gap-8 overflow-x-auto">
        {TABS.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`relative py-5 text-xs uppercase tracking-[0.22em] whitespace-nowrap transition ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
              <span
                className={`absolute left-0 right-0 -bottom-px h-px bg-primary origin-left transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="py-10 animate-fade-in" key={tab}>
        {tab === "Description" && (
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            {description && <p>{description}</p>}
            {features.length > 0 && (
              <ul className="list-disc pl-5 space-y-1.5">
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        {tab === "Size Guide" && (
          <div className="max-w-2xl">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <th className="py-3 pr-4">Size</th>
                  <th className="py-3 pr-4">Chest (in)</th>
                  <th className="py-3 pr-4">Length (in)</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {sizeGuide.map((row) => (
                  <tr key={row.size} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-semibold">{row.size}</td>
                    <td className="py-3 pr-4">{row.chest}</td>
                    <td className="py-3 pr-4">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "Shipping" && (
          <div className="max-w-2xl space-y-3 text-sm text-muted-foreground">
            {shipping.map((line) => (
              <p key={line}>— {line}</p>
            ))}
            {returns.map((line) => (
              <p key={line}>— {line}</p>
            ))}
          </div>
        )}
        {tab === "Reviews" && (
          <div className="max-w-2xl space-y-6">
            {reviews.length === 0 && (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            )}
            {reviews.map((r) => (
              <div key={`${r.name}-${r.text}`} className="border-b border-border pb-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs tracking-[0.18em] text-muted-foreground">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(Math.max(0, 5 - r.rating))}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                {r.date && (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {r.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
