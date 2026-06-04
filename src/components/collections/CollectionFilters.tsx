import type { ProductQuery, ProductSize } from "@/lib/types";

const SIZES: ProductSize[] = ["S", "M", "L", "XL", "XXL"];

const SORTS: { value: NonNullable<ProductQuery["sort"]>; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "featured", label: "Featured" },
];

interface Props {
  value: ProductQuery;
  total: number;
  onChange: (q: ProductQuery) => void;
}

export function CollectionFilters({ value, onChange, total }: Props) {
  const toggleSize = (s: ProductSize) => {
    const cur = value.sizes ?? [];
    const next = cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s];
    onChange({ ...value, sizes: next });
  };

  return (
    <div className="flex flex-col gap-5 mb-10 pb-6 border-b border-border md:flex-row md:items-end md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mr-2">
          Size
        </span>
        {SIZES.map((s) => {
          const active = value.sizes?.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`h-9 min-w-9 px-3 border text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Max $
          <input
            type="number"
            min={0}
            value={value.maxPrice ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder="200"
            className="h-10 w-20 px-2 border border-border bg-background text-sm focus:outline-none focus:border-primary"
          />
        </label>

        <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
          Sort
          <select
            value={value.sort ?? "newest"}
            onChange={(e) =>
              onChange({ ...value, sort: e.target.value as ProductQuery["sort"] })
            }
            className="h-10 px-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>

        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground hidden md:inline">
          {total} {total === 1 ? "result" : "results"}
        </span>
      </div>
    </div>
  );
}
