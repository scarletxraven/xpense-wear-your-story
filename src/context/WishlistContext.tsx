import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface WishlistContextValue {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const KEY = "xpense.wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setIds(JSON.parse(raw));
    } catch {/* ignore */}
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(KEY, JSON.stringify(ids)); } catch {/* ignore */}
  }, [ids]);

  const value = useMemo<WishlistContextValue>(() => ({
    ids,
    has: (id) => ids.includes(id),
    toggle: (id) =>
      setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    remove: (id) => setIds((cur) => cur.filter((x) => x !== id)),
    clear: () => setIds([]),
  }), [ids]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
