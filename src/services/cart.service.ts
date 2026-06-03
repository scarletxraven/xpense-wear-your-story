/**
 * Cart service — frontend placeholder.
 *
 * The live cart state lives in `CartContext` (localStorage-backed).
 * This service exposes a stable API surface so future server-side carts
 * (guest cart sync, checkout session creation, etc.) can drop in here.
 */
import type { CartItem } from "@/context/CartContext";

const delay = <T>(v: T, ms = 150) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const cartService = {
  /** Future: GET /api/cart */
  fetch: (): Promise<CartItem[]> => delay([]),
  /** Future: POST /api/cart/items */
  sync: (items: CartItem[]): Promise<CartItem[]> => delay(items),
  /** Future: POST /api/checkout — returns redirect URL */
  checkout: (_items: CartItem[]): Promise<{ url: string }> =>
    delay({ url: "/cart" }),
};

export type CartService = typeof cartService;
