import { createFileRoute } from "@tanstack/react-router";

interface MockOrder {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing";
  total: number;
  items: number;
}

const ORDERS: MockOrder[] = [
  { id: "XP-9F2K1A", date: "2026-05-22", status: "Delivered", total: 184, items: 2 },
  { id: "XP-7M3X8C", date: "2026-04-09", status: "Delivered", total: 96, items: 1 },
  { id: "XP-2A8L5P", date: "2026-03-14", status: "Delivered", total: 220, items: 3 },
];

export const Route = createFileRoute("/account/orders")({
  component: AccountOrders,
});

function AccountOrders() {
  if (ORDERS.length === 0) {
    return (
      <div className="border border-dashed border-border p-16 text-center">
        <p className="font-display text-2xl font-semibold">No orders yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">Your purchases will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Orders</h2>
      <div className="mt-6 border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-[11px] uppercase tracking-[0.18em]">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="p-3 font-semibold">{o.id}</td>
                <td className="p-3 text-muted-foreground">{o.date}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3 tabular-nums">{o.items}</td>
                <td className="p-3 tabular-nums">${o.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
