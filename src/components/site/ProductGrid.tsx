import { ProductCard, type Product } from "./ProductCard";

export function ProductGrid({
  id,
  label,
  title,
  description,
  products,
}: {
  id: string;
  label: string;
  title: string;
  description?: string;
  products: Product[];
}) {
  return (
    <section id={id} className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-[0.95] text-balance">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-muted-foreground max-w-md">{description}</p>
            )}
          </div>
          <a href="#" className="text-sm uppercase tracking-[0.22em] underline-offset-8 hover:underline">
            Shop all →
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
