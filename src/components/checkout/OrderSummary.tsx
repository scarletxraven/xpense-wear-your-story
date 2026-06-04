import type { CartItem } from "@/context/CartContext";

interface Props {
  items: CartItem[];
  subtotal: number;
  shipping: number;
}

export function OrderSummary({ items, subtotal, shipping }: Props) {
  const total = subtotal + shipping;
  return (
    <aside className="border border-border p-6 h-fit lg:sticky lg:top-24">
      <h2 className="font-display text-xl font-semibold">Order summary</h2>
      <ul className="mt-5 space-y-4 max-h-72 overflow-auto pr-1">
        {items.map((i) => (
          <li key={`${i.id}-${i.size ?? ""}`} className="flex gap-3">
            <img src={i.image} alt="" className="h-16 w-14 object-cover bg-secondary" />
            <div className="flex-1 text-sm">
              <p className="font-semibold leading-tight">{i.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {i.size ? `Size ${i.size} · ` : ""}Qty {i.quantity}
              </p>
            </div>
            <p className="text-sm tabular-nums">${(i.price * i.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-2.5 text-sm border-t border-border pt-5">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="tabular-nums">${shipping.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums">${total.toFixed(2)}</dd>
        </div>
      </dl>
    </aside>
  );
}
