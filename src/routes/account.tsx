import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — XPENSE" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { count } = useCart();
  const { ids } = useWishlist();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— Account</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight">Welcome back.</h1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Orders" value="0" href="/account" hint="View order history" />
          <Card title="Wishlist" value={String(ids.length)} href="/wishlist" hint="Saved pieces" />
          <Card title="Bag" value={String(count)} href="/cart" hint="In your bag" />
        </div>

        <div className="mt-12 border border-border p-6">
          <h2 className="font-display text-xl font-semibold">Profile</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your profile and addresses.</p>
          <div className="mt-5 flex gap-3">
            <Link to="/login" className="h-11 inline-flex items-center px-6 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent">Sign in</Link>
            <Link to="/register" className="h-11 inline-flex items-center px-6 border border-border text-xs uppercase tracking-[0.2em] hover:bg-secondary">Create account</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Card({ title, value, hint, href }: { title: string; value: string; hint: string; href: "/cart" | "/wishlist" | "/account" }) {
  return (
    <Link to={href} className="border border-border p-6 hover:bg-secondary transition block">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{title}</p>
      <p className="mt-3 font-display text-4xl font-bold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </Link>
  );
}
