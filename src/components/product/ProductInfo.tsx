import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { ProductHeader } from "./ProductHeader";
import { ProductMeta } from "./ProductMeta";
import { ProductDescription } from "./ProductDescription";
import { ProductFeatures } from "./ProductFeatures";
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
      <div className="flex flex-col gap-4">
        <ProductHeader product={product} />
        <ProductMeta product={product} />
      </div>

      <ProductDescription product={product} />

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

      <ProductFeatures product={product} />
    </div>
  );
}
