import { brandMetrics, brandMetricsBlock } from "@/content/site";

/**
 * Editable, admin-ready brand metrics strip.
 * Reads from `src/content/site.ts` — supports 2–6 metrics.
 */
export function BrandMetrics() {
  const metrics = brandMetrics.slice(0, 6);
  if (metrics.length < 2) return null;

  return (
    <section className="bg-background py-20 md:py-28 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {brandMetricsBlock.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-[0.95] text-balance">
            {brandMetricsBlock.title}
          </h2>
          {brandMetricsBlock.subtitle && (
            <p className="mt-4 text-muted-foreground max-w-md">{brandMetricsBlock.subtitle}</p>
          )}
        </div>

        <div
          className="mt-12 grid gap-px bg-border border border-border"
          style={{ gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))` }}
        >
          {metrics.map((m) => (
            <div
              key={m.title}
              className="bg-background p-8 md:p-10 flex flex-col justify-between min-h-[180px] hover:bg-secondary/40 transition-colors"
            >
              <p className="font-display text-5xl md:text-6xl font-bold tracking-tight tabular-nums">
                {m.value}
              </p>
              <div className="mt-6">
                <p className="font-display text-lg font-semibold">{m.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
