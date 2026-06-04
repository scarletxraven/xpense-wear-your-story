import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export const Route = createFileRoute("/account/")({
  component: AccountOverview,
});

function AccountOverview() {
  const { count } = useCart();
  const { ids } = useWishlist();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Orders" value="0" href="/account/orders" hint="View order history" />
        <Card title="Wishlist" value={String(ids.length)} href="/account/saved" hint="Saved pieces" />
        <Card title="Bag" value={String(count)} href="/cart" hint="In your bag" />
      </div>

      <div className="border border-border p-6">
        <h2 className="font-display text-xl font-semibold">Welcome back.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to sync your bag, wishlist, and order history across devices.
        </p>
        <div className="mt-5 flex gap-3">
          <Link to="/login" className="h-11 inline-flex items-center px-6 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent">
            Sign in
          </Link>
          <Link to="/register" className="h-11 inline-flex items-center px-6 border border-border text-xs uppercase tracking-[0.2em] hover:bg-secondary">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({
  title, value, hint, href,
}: { title: string; value: string; hint: string; href: "/cart" | "/account/orders" | "/account/saved" }) {
  return (
    <Link to={href} className="border border-border p-6 hover:bg-secondary transition block">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{title}</p>
      <p className="mt-3 font-display text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </Link>
  );
}
