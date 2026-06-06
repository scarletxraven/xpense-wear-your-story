import type { Product } from "@/lib/types";

export function ProductPreview({ p }: { p: Partial<Product> }) {
  return (
    <div className="border border-border p-4 sticky top-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
        Live preview
      </p>
      <div className="aspect-[4/5] bg-secondary overflow-hidden">
        {p.image ? (
          <img src={p.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full grid place-items-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="mt-4">
        {p.badge && (
          <span className="text-[10px] uppercase tracking-[0.22em] bg-primary text-primary-foreground px-2 py-1">
            {p.badge}
          </span>
        )}
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {p.category ?? "Uncategorized"}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold">
          {p.name || "Untitled product"}
        </h3>
        <p className="mt-1 font-display font-bold tabular-nums">
          ${p.price ?? 0}
        </p>
        {p.shortDescription && (
          <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
            {p.shortDescription}
          </p>
        )}
        {p.sizes && p.sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {p.sizes.map((s) => (
              <span
                key={s}
                className="border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em]"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        {p.colors && p.colors.length > 0 && (
          <div className="mt-3 flex gap-1">
            {p.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-5 w-5 border border-border"
                style={{ background: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
