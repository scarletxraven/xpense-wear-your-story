import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ListSkeleton } from "@/components/common/Skeletons";
import { EmptyState, ErrorState } from "@/components/common/States";
import { CollectionTable } from "@/components/admin/collections/CollectionTable";
import { CollectionModal, type CollectionFormValues } from "@/components/admin/collections/CollectionModal";
import { DeleteModal } from "@/components/admin/collections/DeleteModal";
import { collectionService, type CollectionMeta } from "@/services/collection.service";

export const Route = createFileRoute("/admin/collections")({
  component: AdminCollections,
});

function AdminCollections() {
  const [items, setItems] = useState<CollectionMeta[]>([]);
  const [status, setStatus] = useState<"loading" | "idle" | "error">("loading");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "featured" | "draft">("all");

  const [editing, setEditing] = useState<CollectionMeta | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<CollectionMeta | null>(null);

  const load = () => {
    setStatus("loading");
    collectionService
      .list()
      .then((res) => {
        setItems(res);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  };
  useEffect(load, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((c) => {
      if (filter === "featured" && !c.featured) return false;
      if (filter === "draft" && c.status !== "draft") return false;
      if (s && !`${c.name} ${c.slug}`.toLowerCase().includes(s)) return false;
      return true;
    });
  }, [items, q, filter]);

  const handleCreate = async (v: CollectionFormValues) => {
    await collectionService.create(v);
    toast.success("Collection created");
    load();
  };

  const handleUpdate = async (v: CollectionFormValues) => {
    if (!editing) return;
    await collectionService.update(editing.id, v);
    toast.success("Collection updated");
    load();
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await collectionService.remove(deleting.id);
    toast.success("Collection deleted");
    setDeleting(null);
    load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Collections"
        description="Group products into curated drops."
        actions={
          <button
            onClick={() => setCreating(true)}
            className="h-10 px-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 hover:bg-accent"
          >
            <Plus className="h-4 w-4" /> New collection
          </button>
        }
      />

      <div className="mb-5 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search collections"
            className="w-full h-10 border border-border bg-background pl-9 pr-3 text-sm"
          />
        </div>
        <div className="flex border border-border">
          {(["all", "featured", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-10 px-4 text-[11px] uppercase tracking-[0.2em] border-l border-border first:border-l-0 ${
                filter === f ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {status === "loading" && <ListSkeleton />}
      {status === "error" && <ErrorState onRetry={load} />}
      {status === "idle" && filtered.length === 0 && (
        <EmptyState title="No collections match." description="Try clearing filters or create a new collection." />
      )}
      {status === "idle" && filtered.length > 0 && (
        <CollectionTable items={filtered} onEdit={setEditing} onDelete={setDeleting} />
      )}

      {creating && (
        <CollectionModal
          open={creating}
          onClose={() => setCreating(false)}
          onSubmit={handleCreate}
        />
      )}
      {editing && (
        <CollectionModal
          open={!!editing}
          initial={editing}
          onClose={() => setEditing(null)}
          onSubmit={handleUpdate}
        />
      )}
      <DeleteModal
        open={!!deleting}
        title={`Delete ${deleting?.name}?`}
        description="This removes the collection from the storefront. Products are unaffected."
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
