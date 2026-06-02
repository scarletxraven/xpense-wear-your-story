import { Eye, Heart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <div className="hover-zoom relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            {product.badge}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-white/90 backdrop-blur opacity-0 transition group-hover:opacity-100 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-accent">
            <Eye className="h-4 w-4" /> Quick View
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-base font-semibold leading-tight">{product.name}</h3>
        </div>
        <p className="font-display text-base font-semibold tabular-nums">${product.price}</p>
      </div>
    </article>
  );
}
