import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — XPENSE" },
      { name: "description", content: "XPENSE admin dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});
