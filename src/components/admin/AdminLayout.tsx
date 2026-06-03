import { Link, Outlet } from "@tanstack/react-router";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const links = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products" as const, label: "Products", icon: Boxes },
  { to: "/admin/collections" as const, label: "Collections", icon: Layers },
  { to: "/admin/orders" as const, label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers" as const, label: "Customers", icon: Users },
  { to: "/admin/analytics" as const, label: "Analytics", icon: BarChart3 },
];

export function AdminLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link to="/admin" className="font-display text-xl font-bold tracking-tight">
            XPENSE <span className="text-muted-foreground font-normal">/ Admin</span>
          </Link>
          <Link to="/" className="text-xs uppercase tracking-[0.22em] hover:underline">
            ← Back to site
          </Link>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[240px_1fr] gap-0">
        <aside className="border-r border-border p-5 md:p-6 lg:min-h-[calc(100vh-4rem)]">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {links.map(({ to, label, icon: Icon, exact }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact }}
                className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-secondary whitespace-nowrap"
                activeProps={{ className: "flex items-center gap-3 px-3 py-2.5 text-sm bg-secondary font-semibold whitespace-nowrap" }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="p-5 md:p-10">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
