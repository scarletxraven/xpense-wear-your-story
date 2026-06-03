import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import type { Product } from "@/lib/types";

// Legacy minimal shape — kept so older imports keep compiling.
export type { Product };

export interface ProductCardProduct {
  id: string;
  slug?: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
}

export function ProductCard({ product }: { product: Product | ProductCardProduct }) {
  const cart = useCart();
  const wishlist = useWishlist();
  const recent = useRecentlyViewed();
  const isWished = wishlist.has(product.id);
  const slug = (product as Product).slug;

  return (
    <article className="group flex flex-col">
      <div className="hover-zoom relative aspect-[4/5] overflow-hidden bg-secondary">
        {slug ? (
          <Link
            to="/products/$slug"
            params={{ slug }}
            onClick={() => recent.track(product.id)}
            className="absolute inset-0"
            aria-label={product.name}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Link>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => wishlist.toggle(product.id)}
          className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 backdrop-blur transition hover:bg-white ${
            isWished ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart className={`h-4 w-4 ${isWished ? "fill-current" : ""}`} />
        </button>

        <div className="absolute inset-x-3 bottom-3 z-10 flex flex-col gap-2 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() =>
              cart.add({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground hover:bg-accent"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </button>
          {slug ? (
            <Link
              to="/products/$slug"
              params={{ slug }}
              onClick={() => recent.track(product.id)}
              className="flex w-full items-center justify-center gap-2 bg-white py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:bg-secondary"
            >
              <Eye className="h-4 w-4" /> Quick View
            </Link>
          ) : (
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 bg-white py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:bg-secondary"
            >
              <Eye className="h-4 w-4" /> Quick View
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{product.category}</p>
          {slug ? (
            <Link
              to="/products/$slug"
              params={{ slug }}
              onClick={() => recent.track(product.id)}
              className="mt-1 block font-display text-base font-semibold leading-tight hover:underline underline-offset-4"
            >
              {product.name}
            </Link>
          ) : (
            <h3 className="mt-1 font-display text-base font-semibold leading-tight">{product.name}</h3>
          )}
        </div>
        <p className="font-display text-base font-semibold tabular-nums">${product.price}</p>
      </div>
    </article>
  );
}
