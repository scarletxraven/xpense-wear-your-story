import { createFileRoute } from "@tanstack/react-router";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const stats = [
  { label: "Revenue (30d)", value: "$48,210" },
  { label: "Orders (30d)", value: "312" },
  { label: "New Customers", value: "184" },
  { label: "Avg Order Value", value: "$154.52" },
];

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div>
      <AdminPageHeader title="Dashboard" description="Overview of store performance." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="border border-border p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{s.label}</p>
            <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        Charts and recent activity will appear here once connected to a backend.
      </div>
    </div>
  );
}
