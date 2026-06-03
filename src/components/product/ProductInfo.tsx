import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import type { Product, ProductSize } from "@/lib/types";

export function ProductInfo({ product }: { product: Product }) {
  const cart = useCart();
  const wishlist = useWishlist();
  const isWished = wishlist.has(product.id);

  const [size, setSize] = useState<ProductSize | undefined>(product.sizes[0]);
  const [color, setColor] = useState<string | undefined>(product.colors[0]?.name);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    if (!size) {
      toast("Please select a size");
      return;
    }
    cart.add(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
      },
      qty,
    );
    toast.success(`Added ${product.name} (${size}) to cart`);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {product.collection ?? product.category}
        </p>
        <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.05] text-balance">
          {product.name}
        </h1>
        <div className="mt-4 flex items-center gap-4">
          <p className="font-display text-2xl font-semibold tabular-nums">
            ${product.price}
          </p>
          <span
            className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] ${
              product.inStock ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.inStock ? "bg-foreground" : "bg-muted-foreground"
              }`}
            />
            {product.inStock ? "In Stock" : "Sold Out"}
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground max-w-prose">
        {product.description ??
          "A staple drop built around quiet confidence. Heavyweight cotton, boxy silhouette, and clean lines made for everyday wear — from the studio to the street."}
      </p>

      <ColorSelector colors={product.colors} value={color} onChange={setColor} />
      <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />

      <div>
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Quantity
        </span>
        <div className="mt-3 inline-flex items-center border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-11 w-11 grid place-items-center hover:bg-secondary"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-semibold tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="h-11 w-11 grid place-items-center hover:bg-secondary"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleAdd}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary py-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Sold Out"}
        </button>
        <button
          type="button"
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            wishlist.toggle(product.id);
            toast(isWished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className={`h-[58px] w-[58px] grid place-items-center border transition ${
            isWished
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:border-primary"
          }`}
        >
          <Heart className={`h-5 w-5 ${isWished ? "fill-current" : ""}`} />
        </button>
      </div>

      <ul className="text-xs uppercase tracking-[0.18em] text-muted-foreground space-y-2 border-t border-border pt-6">
        <li>— Free shipping over $100</li>
        <li>— 30-day easy returns</li>
        <li>— Designed in-house · Made in limited runs</li>
      </ul>
    </div>
  );
}
