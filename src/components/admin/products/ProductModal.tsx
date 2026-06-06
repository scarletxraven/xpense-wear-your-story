import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Product, ProductCategory, ProductSize } from "@/lib/types";
import { ProductPreview } from "./ProductPreview";

const CATEGORIES: ProductCategory[] = [
  "Streetwear",
  "Graphic Tees",
  "Anime Inspired",
  "Casual",
];
const ALL_SIZES: ProductSize[] = ["S", "M", "L", "XL", "XXL"];

export type ProductFormValues = Omit<Product, "id" | "createdAt" | "sales">;

const EMPTY: ProductFormValues = {
  slug: "",
  name: "",
  category: "Streetwear",
  collection: "Streetwear",
  price: 0,
  image: "",
  images: [],
  badge: "",
  sizes: ["S", "M", "L"],
  colors: [{ name: "Black", hex: "#000000" }],
  inStock: true,
  stock: 0,
  shortDescription: "",
  fullDescription: "",
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const input = "w-full h-10 border border-border bg-background px-3 text-sm focus:outline-none focus:border-foreground";

export function ProductModal({
  open,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  initial?: Product | null;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
}) {
  const [values, setValues] = useState<ProductFormValues>(
    initial ? { ...initial } : { ...EMPTY },
  );
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ProductFormValues>(k: K, v: ProductFormValues[K]) =>
    setValues((p) => ({ ...p, [k]: v }));

  const toggleSize = (s: ProductSize) => {
    set("sizes", values.sizes.includes(s)
      ? values.sizes.filter((x) => x !== s)
      : [...values.sizes, s]);
  };

  const setColor = (i: number, patch: Partial<{ name: string; hex: string }>) => {
    const next = values.colors.map((c, idx) => (idx === i ? { ...c, ...patch } : c));
    set("colors", next);
  };
  const addColor = () => set("colors", [...values.colors, { name: "New", hex: "#888888" }]);
  const removeColor = (i: number) => set("colors", values.colors.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...values,
        slug: values.slug || slugify(values.name),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
        else if (initial) setValues({ ...initial });
        else setValues({ ...EMPTY });
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {initial ? "Edit product" : "New product"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name">
                <input
                  required
                  value={values.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setValues((p) => ({ ...p, name, slug: p.slug || slugify(name) }));
                  }}
                  className={input}
                />
              </Field>
              <Field label="Slug">
                <input
                  value={values.slug}
                  onChange={(e) => set("slug", slugify(e.target.value))}
                  className={`${input} font-mono text-xs`}
                />
              </Field>
              <Field label="Price ($)">
                <input
                  type="number"
                  min={0}
                  value={values.price}
                  onChange={(e) => set("price", Number(e.target.value))}
                  className={input}
                />
              </Field>
              <Field label="Stock">
                <input
                  type="number"
                  min={0}
                  value={values.stock ?? 0}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    setValues((p) => ({ ...p, stock: n, inStock: n > 0 }));
                  }}
                  className={input}
                />
              </Field>
              <Field label="Category">
                <select
                  value={values.category}
                  onChange={(e) =>
                    setValues((p) => ({
                      ...p,
                      category: e.target.value as ProductCategory,
                      collection: e.target.value,
                    }))
                  }
                  className={input}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Badge (optional)">
                <input
                  value={values.badge ?? ""}
                  onChange={(e) => set("badge", e.target.value)}
                  placeholder="New / Best Seller / Low Stock"
                  className={input}
                />
              </Field>
            </div>

            <Field label="Primary image URL">
              <input
                value={values.image}
                onChange={(e) => set("image", e.target.value)}
                className={input}
                placeholder="https://… or /assets/…"
              />
            </Field>

            <Field label="Short description">
              <textarea
                rows={2}
                value={values.shortDescription ?? ""}
                onChange={(e) => set("shortDescription", e.target.value)}
                className={`${input} h-auto py-2.5 resize-none`}
              />
            </Field>

            <Field label="Full description">
              <textarea
                rows={4}
                value={values.fullDescription ?? ""}
                onChange={(e) => set("fullDescription", e.target.value)}
                className={`${input} h-auto py-2.5 resize-none`}
              />
            </Field>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                Sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((s) => {
                  const on = values.sizes.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`h-9 min-w-12 px-3 border text-xs uppercase tracking-[0.2em] ${
                        on
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Colors
                </p>
                <button
                  type="button"
                  onClick={addColor}
                  className="text-[11px] uppercase tracking-[0.2em] underline-offset-4 hover:underline"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {values.colors.map((c, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={c.hex}
                      onChange={(e) => setColor(i, { hex: e.target.value })}
                      className="h-9 w-12 border border-border bg-background cursor-pointer"
                    />
                    <input
                      value={c.name}
                      onChange={(e) => setColor(i, { name: e.target.value })}
                      className={`${input} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={() => removeColor(i)}
                      className="h-9 px-3 border border-border text-xs hover:bg-destructive hover:text-destructive-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!values.featured}
                onChange={(e) => set("featured", e.target.checked)}
              />
              Feature on homepage
            </label>
          </div>

          <ProductPreview p={values} />

          <DialogFooter className="md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 border border-border text-xs uppercase tracking-[0.2em] hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-10 px-5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] disabled:opacity-50"
            >
              {saving ? "Saving…" : initial ? "Save changes" : "Create product"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
