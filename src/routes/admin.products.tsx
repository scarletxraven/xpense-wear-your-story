import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ListSkeleton } from "@/components/common/Skeletons";
import { EmptyState, ErrorState } from "@/components/common/States";
import { DeleteModal } from "@/components/admin/collections/DeleteModal";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { ProductModal, type ProductFormValues } from "@/components/admin/products/ProductModal";
import { productService } from "@/services";
import type { Product, ProductCategory } from "@/lib/types";

const CATEGORIES: (ProductCategory | "All")[] = [
  "All",
  "Streetwear",
  "Graphic Tees",
  "Anime Inspired",
  "Casual",
];

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "idle" | "error">("loading");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ProductCategory | "All">("All");

  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const load = () => {
    setStatus("loading");
    productService
      .list({ pageSize: 200 })
      .then((res) => {
        setItems(res.data);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  };
  useEffect(load, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (s && !`${p.name} ${p.slug} ${p.category}`.toLowerCase().includes(s)) return false;
      return true;
    });
  }, [items, q, cat]);

  const handleCreate = async (v: ProductFormValues) => {
    await productService.create(v);
    toast.success("Product created");
    load();
  };
  const handleUpdate = async (v: ProductFormValues) => {
    if (!editing) return;
    await productService.update(editing.id, v);
    toast.success("Product updated");
    load();
  };
  const handleDelete = async () => {
    if (!deleting) return;
    await productService.remove(deleting.id);
    toast.success("Product deleted");
    setDeleting(null);
    load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Manage catalog items."
        actions={
          <button
            onClick={() => setCreating(true)}
            className="h-10 px-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 hover:bg-accent"
          >
            <Plus className="h-4 w-4" /> New product
          </button>
        }
      />

      <div className="mb-5 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products"
            className="w-full h-10 border border-border bg-background pl-9 pr-3 text-sm"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as ProductCategory | "All")}
          className="h-10 border border-border bg-background px-3 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {status === "loading" && <ListSkeleton />}
      {status === "error" && <ErrorState onRetry={load} />}
      {status === "idle" && filtered.length === 0 && (
        <EmptyState title="No products match." description="Try clearing filters or add a new product." />
      )}
      {status === "idle" && filtered.length > 0 && (
        <ProductTable items={filtered} onEdit={setEditing} onDelete={setDeleting} />
      )}

      {creating && (
        <ProductModal open={creating} onClose={() => setCreating(false)} onSubmit={handleCreate} />
      )}
      {editing && (
        <ProductModal
          open={!!editing}
          initial={editing}
          onClose={() => setEditing(null)}
          onSubmit={handleUpdate}
        />
      )}
      <DeleteModal
        open={!!deleting}
        title={`Delete ${deleting?.name}?`}
        description="This removes the product from the storefront."
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
