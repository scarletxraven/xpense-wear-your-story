import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ListSkeleton } from "@/components/common/Skeletons";
import { EmptyState, ErrorState } from "@/components/common/States";
import { productService } from "@/services";
import type { Product } from "@/types";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "idle" | "error">("loading");

  const load = () => {
    setStatus("loading");
    productService.list({ pageSize: 100 })
      .then((res) => { setItems(res.data); setStatus("idle"); })
      .catch(() => setStatus("error"));
  };
  useEffect(load, []);

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Manage catalog items. Backend not connected."
        actions={
          <button className="h-10 px-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em]">
            New product
          </button>
        }
      />
      {status === "loading" && <ListSkeleton />}
      {status === "error" && <ErrorState onRetry={load} />}
      {status === "idle" && items.length === 0 && (
        <EmptyState title="No products yet." description="Add your first product to get started." />
      )}
      {status === "idle" && items.length > 0 && (
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-[11px] uppercase tracking-[0.18em]">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Sales</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.image} alt="" className="h-10 w-10 object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 tabular-nums">${p.price}</td>
                  <td className="p-3">{p.inStock ? "In stock" : "Out"}</td>
                  <td className="p-3 tabular-nums">{p.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
