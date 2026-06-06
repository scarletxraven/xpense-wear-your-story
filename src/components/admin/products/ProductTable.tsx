import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductTable({
  items,
  onEdit,
  onDelete,
}: {
  items: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  return (
    <div className="border border-border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left text-[11px] uppercase tracking-[0.18em]">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Sales</th>
            <th className="p-3 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t border-border hover:bg-secondary/40">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt="" className="h-10 w-10 object-cover" />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      /{p.slug}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-3">{p.category}</td>
              <td className="p-3 tabular-nums">${p.price}</td>
              <td className="p-3">{p.inStock ? `${p.stock ?? 0}` : "Out"}</td>
              <td className="p-3 tabular-nums">{p.sales}</td>
              <td className="p-3">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit(p)}
                    className="h-8 w-8 grid place-items-center border border-border hover:bg-secondary"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(p)}
                    className="h-8 w-8 grid place-items-center border border-border hover:bg-destructive hover:text-destructive-foreground"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
