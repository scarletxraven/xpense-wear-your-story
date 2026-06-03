import { useState } from "react";
import type { Product } from "@/lib/types";

const TABS = ["Description", "Size Guide", "Shipping", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("Description");

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
            <p>
              {product.description ??
                "Cut from heavyweight 280gsm cotton with a relaxed drop-shoulder silhouette. Pre-washed for a softer hand-feel and minimal shrinkage. Screen-printed graphics built to outlast the season."}
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>280gsm heavyweight cotton</li>
              <li>Drop-shoulder oversized fit</li>
              <li>Ribbed crew neck, twin-needle stitching</li>
              <li>Designed in-house · Limited run</li>
            </ul>
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
                {[
                  ["S", "42", "27"],
                  ["M", "44", "28"],
                  ["L", "46", "29"],
                  ["XL", "48", "30"],
                  ["XXL", "50", "31"],
                ].map(([s, c, l]) => (
                  <tr key={s} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-semibold">{s}</td>
                    <td className="py-3 pr-4">{c}</td>
                    <td className="py-3 pr-4">{l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "Shipping" && (
          <div className="max-w-2xl space-y-3 text-sm text-muted-foreground">
            <p>— Free standard shipping on orders over $100.</p>
            <p>— Express delivery available at checkout (1–3 business days).</p>
            <p>— Easy 30-day returns on unworn items. Original tags required.</p>
            <p>— International shipping to 60+ countries.</p>
          </div>
        )}
        {tab === "Reviews" && (
          <div className="max-w-2xl space-y-6">
            {[
              { name: "Alex M.", rating: 5, text: "Fit is exactly as pictured. Heavy, soft, perfect drape." },
              { name: "Riya S.", rating: 5, text: "My third XPENSE piece. Quality keeps getting better." },
              { name: "Jordan K.", rating: 4, text: "Runs slightly oversized — size down if you want a regular fit." },
            ].map((r) => (
              <div key={r.name} className="border-b border-border pb-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs tracking-[0.18em] text-muted-foreground">
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
