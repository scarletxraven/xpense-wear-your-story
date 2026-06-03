import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ListSkeleton } from "@/components/common/Skeletons";
import { EmptyState, ErrorState } from "@/components/common/States";
import { orderService } from "@/services";
import type { Order } from "@/types";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [items, setItems] = useState<Order[]>([]);
  const [status, setStatus] = useState<"loading" | "idle" | "error">("loading");

  const load = () => {
    setStatus("loading");
    orderService.list()
      .then((res) => { setItems(res); setStatus("idle"); })
      .catch(() => setStatus("error"));
  };
  useEffect(load, []);

  return (
    <div>
      <AdminPageHeader title="Orders" description="Recent customer orders." />
      {status === "loading" && <ListSkeleton />}
      {status === "error" && <ErrorState onRetry={load} />}
      {status === "idle" && items.length === 0 && <EmptyState title="No orders yet." />}
      {status === "idle" && items.length > 0 && (
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-[11px] uppercase tracking-[0.18em]">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id} className="border-t border-border">
                  <td className="p-3 font-medium">{o.id}</td>
                  <td className="p-3">{o.customerName}<br /><span className="text-muted-foreground text-xs">{o.customerEmail}</span></td>
                  <td className="p-3 capitalize">{o.status}</td>
                  <td className="p-3 tabular-nums">${o.total.toFixed(2)}</td>
                  <td className="p-3 text-muted-foreground">{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
