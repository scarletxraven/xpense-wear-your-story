import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string, size?: string) => void;
  setQty: (id: string, qty: number, size?: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "xpense.cart";
const keyOf = (id: string, size?: string) => `${id}::${size ?? ""}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {/* ignore */}
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(KEY, JSON.stringify(items)); } catch {/* ignore */}
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
    add: (item, qty = 1) =>
      setItems((cur) => {
        const k = keyOf(item.id, item.size);
        const existing = cur.find((i) => keyOf(i.id, i.size) === k);
        if (existing) {
          return cur.map((i) =>
            keyOf(i.id, i.size) === k ? { ...i, quantity: i.quantity + qty } : i,
          );
        }
        return [...cur, { ...item, quantity: qty }];
      }),
    remove: (id, size) =>
      setItems((cur) => cur.filter((i) => keyOf(i.id, i.size) !== keyOf(id, size))),
    setQty: (id, qty, size) =>
      setItems((cur) =>
        cur
          .map((i) => (keyOf(i.id, i.size) === keyOf(id, size) ? { ...i, quantity: qty } : i))
          .filter((i) => i.quantity > 0),
      ),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
