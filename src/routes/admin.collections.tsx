import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ListSkeleton } from "@/components/common/Skeletons";
import { EmptyState, ErrorState } from "@/components/common/States";
import { collectionService } from "@/services";
import type { Collection } from "@/types";

export const Route = createFileRoute("/admin/collections")({
  component: AdminCollections,
});

function AdminCollections() {
  const [items, setItems] = useState<Collection[]>([]);
  const [status, setStatus] = useState<"loading" | "idle" | "error">("loading");

  const load = () => {
    setStatus("loading");
    collectionService.list()
      .then((res) => { setItems(res); setStatus("idle"); })
      .catch(() => setStatus("error"));
  };
  useEffect(load, []);

  return (
    <div>
      <AdminPageHeader
        title="Collections"
        description="Group products into curated drops."
        actions={
          <button className="h-10 px-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em]">
            New collection
          </button>
        }
      />
      {status === "loading" && <ListSkeleton />}
      {status === "error" && <ErrorState onRetry={load} />}
      {status === "idle" && items.length === 0 && <EmptyState title="No collections yet." />}
      {status === "idle" && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((c) => (
            <div key={c.id} className="border border-border p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {c.productIds.length} products{c.featured ? " · Featured" : ""}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{c.name}</h3>
              {c.description && (
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
