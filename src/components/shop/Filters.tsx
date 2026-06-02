import { X } from "lucide-react";
import type { ProductCategory, ProductQuery, ProductSize } from "@/lib/types";

const CATEGORIES: ProductCategory[] = ["Streetwear", "Graphic Tees", "Anime Inspired", "Casual"];
const SIZES: ProductSize[] = ["S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Bone", hex: "#F5F5F5" },
  { name: "Charcoal", hex: "#1A1A1A" },
];

const PRICE_MIN = 0;
const PRICE_MAX = 200;

interface Props {
  value: ProductQuery;
  onChange: (next: ProductQuery) => void;
  onClose?: () => void;
}

export function Filters({ value, onChange, onClose }: Props) {
  const toggle = <T,>(list: T[] | undefined, item: T): T[] => {
    const cur = list ?? [];
    return cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item];
  };

  const reset = () =>
    onChange({
      sort: value.sort,
      search: value.search,
      page: 1,
      pageSize: value.pageSize,
    });

  return (
    <aside className="bg-background">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="font-display text-lg font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="text-[11px] uppercase tracking-[0.22em] underline-offset-4 hover:underline"
          >
            Clear
          </button>
          {onClose && (
            <button
              type="button"
              aria-label="Close filters"
              onClick={onClose}
              className="p-1.5 hover:bg-secondary lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <Group title="Category">
        <ul className="space-y-2.5">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={value.categories?.includes(c) ?? false}
                  onChange={() => onChange({ ...value, categories: toggle(value.categories, c), page: 1 })}
                />
                {c}
              </label>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = value.sizes?.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ ...value, sizes: toggle(value.sizes, s), page: 1 })}
                className={`h-10 min-w-10 px-3 border text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Color">
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => {
            const active = value.colors?.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                onClick={() => onChange({ ...value, colors: toggle(value.colors, c.name), page: 1 })}
                className={`h-8 w-8 rounded-full border-2 transition ${
                  active ? "border-primary" : "border-border hover:border-foreground/60"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </Group>

      <Group title={`Price — $${value.minPrice ?? PRICE_MIN} to $${value.maxPrice ?? PRICE_MAX}`}>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          value={value.maxPrice ?? PRICE_MAX}
          onChange={(e) => onChange({ ...value, maxPrice: Number(e.target.value), page: 1 })}
          className="w-full accent-primary"
        />
      </Group>

      <Group title="Availability">
        <label className="flex items-center gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 accent-primary"
            checked={value.inStockOnly ?? false}
            onChange={(e) => onChange({ ...value, inStockOnly: e.target.checked, page: 1 })}
          />
          In stock only
        </label>
      </Group>
    </aside>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-6 border-b border-border last:border-b-0">
      <p className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-4">{title}</p>
      {children}
    </div>
  );
}
