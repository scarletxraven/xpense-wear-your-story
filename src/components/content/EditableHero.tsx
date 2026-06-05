import type { BrandStoryBlock } from "@/content/brand";

/**
 * Editable story / brand block driven by config.
 * Variant: dark surface, optional image side.
 */
export function EditableHero({ block }: { block: BrandStoryBlock }) {
  const imageLeft = block.imagePosition === "left";
  return (
    <section className="bg-ink text-white py-24 md:py-32 overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 px-5 md:px-10 items-center">
        <div
          className={`lg:col-span-5 ${
            imageLeft ? "order-2 lg:order-1" : "order-2 lg:order-2 lg:col-start-8"
          } animate-fade-in`}
        >
          <div className="aspect-[4/5] overflow-hidden bg-secondary/10">
            <img
              src={block.image}
              alt={block.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-transform duration-[1.2s] hover:scale-[1.03]"
            />
          </div>
        </div>
        <div
          className={`lg:col-span-6 ${
            imageLeft ? "lg:col-start-7 order-1 lg:order-2" : "lg:col-start-1 order-1 lg:order-1"
          } animate-fade-in`}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">
            {block.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.95] text-balance">
            {block.title}
          </h2>
          {block.body.map((p, i) => (
            <p
              key={i}
              className={`${i === 0 ? "mt-6" : "mt-4"} text-white/70 leading-relaxed max-w-lg`}
            >
              {p}
            </p>
          ))}
          {block.stats.length > 0 && (
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {block.stats.map((s) => (
                <div key={s.v}>
                  <p className="font-display text-3xl font-bold">{s.k}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
