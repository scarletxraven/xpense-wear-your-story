import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — XPENSE" }, { name: "description", content: "Your XPENSE cart." }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  const shipping = items.length ? 8 : 0;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-24">
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Your bag</h1>

        {items.length === 0 ? (
          <div className="mt-16 border border-dashed border-border py-24 text-center">
            <p className="font-display text-2xl font-semibold">Your rotation starts here.</p>
            <p className="mt-2 text-sm text-muted-foreground">Nothing in the bag yet — pick something worth wearing.</p>
            <Link to="/shop" className="mt-6 inline-flex h-11 items-center px-6 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent">
              Start shopping
            </Link>
          </div>

        ) : (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={`${item.id}-${item.size ?? ""}`} className="flex gap-4 py-5">
                  <img src={item.image} alt={item.name} className="h-28 w-24 object-cover bg-secondary" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display font-semibold">{item.name}</h3>
                        {item.size && <p className="text-xs text-muted-foreground mt-1">Size {item.size}</p>}
                      </div>
                      <p className="font-display font-semibold tabular-nums">${item.price * item.quantity}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-border">
                        <button type="button" aria-label="Decrease" className="h-9 w-9 grid place-items-center hover:bg-secondary"
                          onClick={() => setQty(item.id, item.quantity - 1, item.size)}>
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button type="button" aria-label="Increase" className="h-9 w-9 grid place-items-center hover:bg-secondary"
                          onClick={() => setQty(item.id, item.quantity + 1, item.size)}>
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button type="button" onClick={() => remove(item.id, item.size)} className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="border border-border p-6 h-fit">
              <h2 className="font-display text-xl font-semibold">Summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Shipping" value={`$${shipping.toFixed(2)}`} />
                <div className="border-t border-border pt-3">
                  <Row label="Total" value={`$${(subtotal + shipping).toFixed(2)}`} bold />
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-6 w-full h-12 inline-flex items-center justify-center bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent"
              >
                Checkout
              </Link>
              <button onClick={clear} className="mt-3 w-full h-10 border border-border text-xs uppercase tracking-[0.2em] hover:bg-secondary">
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold text-base" : ""}`}>
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
