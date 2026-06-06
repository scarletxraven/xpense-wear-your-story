import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { CollectionMeta } from "@/services/collection.service";
import { ProductAssignment } from "./ProductAssignment";

export type CollectionFormValues = Omit<CollectionMeta, "id" | "createdAt">;

const EMPTY: CollectionFormValues = {
  name: "",
  slug: "",
  description: "",
  tagline: "",
  image: "",
  productIds: [],
  featured: false,
  status: "active",
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function CollectionModal({
  open,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  initial?: CollectionMeta | null;
  onClose: () => void;
  onSubmit: (values: CollectionFormValues) => Promise<void> | void;
}) {
  const [values, setValues] = useState<CollectionFormValues>(
    initial ? { ...initial } : { ...EMPTY },
  );
  const [saving, setSaving] = useState(false);

  // Reset when modal toggles
  const key = `${open}-${initial?.id ?? "new"}`;
  useState(() => key); // ensure reset triggers

  const set = <K extends keyof CollectionFormValues>(k: K, v: CollectionFormValues[K]) =>
    setValues((p) => ({ ...p, [k]: v }));

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {initial ? "Edit collection" : "New collection"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Field label="Name">
              <input
                required
                value={values.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setValues((p) => ({
                    ...p,
                    name,
                    slug: p.slug || slugify(name),
                  }));
                }}
                className={inputCls}
              />
            </Field>
            <Field label="Slug">
              <input
                value={values.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
                className={`${inputCls} font-mono text-xs`}
                placeholder="auto-from-name"
              />
            </Field>
            <Field label="Tagline">
              <input
                value={values.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Description">
              <textarea
                rows={4}
                value={values.description ?? ""}
                onChange={(e) => set("description", e.target.value)}
                className={`${inputCls} h-auto py-2.5 resize-none`}
              />
            </Field>
            <Field label="Cover image URL">
              <input
                value={values.image}
                onChange={(e) => set("image", e.target.value)}
                className={inputCls}
                placeholder="https://…"
              />
            </Field>


            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!values.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Status</span>
                <select
                  value={values.status ?? "active"}
                  onChange={(e) => set("status", e.target.value as "active" | "draft")}
                  className="h-9 border border-border bg-background px-2"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-border p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
                Live preview
              </p>
              {values.image ? (
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  <img
                    src={values.image}
                    alt=""
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-secondary grid place-items-center text-xs text-muted-foreground">
                  No cover image
                </div>
              )}
              <p className="mt-3 font-display text-xl font-semibold">
                {values.name || "Untitled collection"}
              </p>
              {values.tagline && (
                <p className="text-sm text-muted-foreground mt-1">{values.tagline}</p>
              )}
              {values.description && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                  {values.description}
                </p>
              )}
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                Assigned products · {values.productIds.length}
              </p>
              <ProductAssignment
                selectedIds={values.productIds}
                onChange={(ids) => set("productIds", ids)}
              />
            </div>
          </div>

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
              {saving ? "Saving…" : initial ? "Save changes" : "Create collection"}
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
      <style>{`.input{width:100%;height:40px;border:1px solid hsl(var(--border));background:hsl(var(--background));padding:0 12px;font-size:14px}textarea.input{height:auto;padding:10px 12px}`}</style>
    </label>
  );
}
