import type { ProductSize } from "@/lib/types";

interface Props {
  sizes: ProductSize[];
  value?: ProductSize;
  onChange: (size: ProductSize) => void;
}

export function SizeSelector({ sizes, value, onChange }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Size
        </span>
        <button
          type="button"
          className="text-[11px] uppercase tracking-[0.22em] underline-offset-4 hover:underline"
        >
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const active = value === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              aria-pressed={active}
              className={`min-w-12 h-11 px-3 border text-xs font-semibold uppercase tracking-[0.18em] transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
