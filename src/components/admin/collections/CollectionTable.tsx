import { Pencil, Trash2 } from "lucide-react";
import type { CollectionMeta } from "@/services/collection.service";

export function CollectionTable({
  items,
  onEdit,
  onDelete,
}: {
  items: CollectionMeta[];
  onEdit: (c: CollectionMeta) => void;
  onDelete: (c: CollectionMeta) => void;
}) {
  return (
    <div className="border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left text-[11px] uppercase tracking-[0.18em]">
          <tr>
            <th className="p-3">Collection</th>
            <th className="p-3 hidden md:table-cell">Slug</th>
            <th className="p-3">Products</th>
            <th className="p-3 hidden md:table-cell">Status</th>
            <th className="p-3 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-t border-border hover:bg-secondary/40">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  {c.image && (
                    <img src={c.image} alt="" className="h-10 w-10 object-cover" />
                  )}
                  <div>
                    <p className="font-medium">{c.name}</p>
                    {c.featured && (
                      <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-3 hidden md:table-cell text-muted-foreground">/{c.slug}</td>
              <td className="p-3 tabular-nums">{c.productIds.length}</td>
              <td className="p-3 hidden md:table-cell capitalize">{c.status ?? "active"}</td>
              <td className="p-3">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit(c)}
                    className="h-8 w-8 grid place-items-center border border-border hover:bg-secondary"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(c)}
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
