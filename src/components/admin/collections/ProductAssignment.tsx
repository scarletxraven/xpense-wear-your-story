import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { productService } from "@/services";
import type { Product } from "@/lib/types";

export function ProductAssignment({
  selectedIds,
  onChange,
}: {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const [all, setAll] = useState<Product[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    productService.list({ pageSize: 200 }).then((r) => setAll(r.data));
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s),
    );
  }, [all, q]);

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id],
    );
  };

  const selected = all.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products"
          className="w-full h-10 border border-border bg-background pl-9 pr-3 text-sm"
        />
      </div>

      {selected.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
            Selected · {selected.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {selected.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                className="inline-flex items-center gap-2 border border-border px-2 py-1 text-xs hover:bg-destructive hover:text-destructive-foreground"
              >
                <img src={p.image} alt="" className="h-5 w-5 object-cover" />
                {p.name} ×
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border border-border max-h-64 overflow-auto">
        {filtered.map((p) => {
          const on = selectedIds.includes(p.id);
          return (
            <label
              key={p.id}
              className={`flex items-center gap-3 p-2 border-b border-border last:border-b-0 cursor-pointer text-sm ${
                on ? "bg-secondary" : "hover:bg-secondary/40"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggle(p.id)}
                className="accent-foreground"
              />
              <img src={p.image} alt="" className="h-8 w-8 object-cover" />
              <span className="flex-1 truncate">{p.name}</span>
              <span className="text-muted-foreground text-xs">{p.category}</span>
            </label>
          );
        })}
        {filtered.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground text-center">No products match.</p>
        )}
      </div>
    </div>
  );
}
