import { Link, Outlet } from "@tanstack/react-router";
import { Heart, Package, Settings, User } from "lucide-react";

const links = [
  { to: "/account" as const, label: "Overview", icon: User, exact: true },
  { to: "/account/orders" as const, label: "Orders", icon: Package },
  { to: "/account/saved" as const, label: "Saved", icon: Heart },
  { to: "/account/profile" as const, label: "Profile", icon: User },
  { to: "/account/settings" as const, label: "Settings", icon: Settings },
];

export function AccountLayout() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-20">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— Account</p>
      <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
        Your space.
      </h1>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <aside className="border-b lg:border-b-0 lg:border-r border-border lg:pr-6 pb-4 lg:pb-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {links.map(({ to, label, icon: Icon, exact }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact }}
                className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-secondary whitespace-nowrap"
                activeProps={{
                  className:
                    "flex items-center gap-3 px-3 py-2.5 text-sm bg-secondary font-semibold whitespace-nowrap",
                }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </section>
  );
}
