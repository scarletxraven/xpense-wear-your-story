import { createFileRoute } from "@tanstack/react-router";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState } from "@/components/common/States";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

function AdminCustomers() {
  return (
    <div>
      <AdminPageHeader title="Customers" description="Customer records will appear once connected to a backend." />
      <EmptyState
        title="No customers yet."
        description="Connect authentication and orders to populate this view."
      />
    </div>
  );
}
