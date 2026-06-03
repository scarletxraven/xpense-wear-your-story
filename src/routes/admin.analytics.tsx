import { createFileRoute } from "@tanstack/react-router";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const metrics = [
  { label: "Conversion rate", value: "3.42%" },
  { label: "Sessions (30d)", value: "21,409" },
  { label: "Bounce rate", value: "38%" },
  { label: "Returning customers", value: "27%" },
];

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalytics,
});

function AdminAnalytics() {
  return (
    <div>
      <AdminPageHeader title="Analytics" description="High-level traffic and conversion metrics." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="border border-border p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{m.label}</p>
            <p className="mt-3 font-display text-2xl font-bold">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
        Charts will render here once an analytics provider is wired up.
      </div>
    </div>
  );
}
