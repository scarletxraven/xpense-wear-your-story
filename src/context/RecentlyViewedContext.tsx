import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface RecentContextValue {
  ids: string[];
  track: (id: string) => void;
  clear: () => void;
}

const Ctx = createContext<RecentContextValue | null>(null);
const KEY = "xpense.recent";
const MAX = 8;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
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

  const track = useCallback((id: string) => {
    setIds((cur) => [id, ...cur.filter((x) => x !== id)].slice(0, MAX));
  }, []);

  return (
    <Ctx.Provider value={{ ids, track, clear: () => setIds([]) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRecentlyViewed must be used inside RecentlyViewedProvider");
  return ctx;
}
