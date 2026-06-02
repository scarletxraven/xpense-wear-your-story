import { Search, SlidersHorizontal } from "lucide-react";
import type { ProductQuery } from "@/lib/types";

const SORTS: { value: NonNullable<ProductQuery["sort"]>; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "featured", label: "Featured" },
];

interface Props {
  value: ProductQuery;
  total: number;
  onChange: (q: ProductQuery) => void;
  onOpenFilters: () => void;
}

export function SearchSort({ value, total, onChange, onOpenFilters }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
      <div className="flex items-center gap-3 w-full md:max-w-md">
        <button
          type="button"
          onClick={onOpenFilters}
          className="lg:hidden flex items-center gap-2 h-11 px-4 border border-border text-xs font-semibold uppercase tracking-[0.18em] hover:bg-secondary"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={value.search ?? ""}
            onChange={(e) => onChange({ ...value, search: e.target.value, page: 1 })}
            placeholder="Search products..."
            className="w-full h-11 pl-10 pr-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-4">
        <p className="text-xs text-muted-foreground uppercase tracking-[0.18em]">
          {total} {total === 1 ? "product" : "products"}
        </p>
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]">
          Sort
          <select
            value={value.sort ?? "newest"}
            onChange={(e) =>
              onChange({ ...value, sort: e.target.value as ProductQuery["sort"], page: 1 })
            }
            className="h-11 px-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
