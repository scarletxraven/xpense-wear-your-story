export type DeliveryMethod = "standard" | "express";

const OPTIONS: { id: DeliveryMethod; label: string; eta: string; price: number }[] = [
  { id: "standard", label: "Standard", eta: "4–6 business days", price: 8 },
  { id: "express", label: "Express", eta: "1–3 business days", price: 22 },
];

interface Props {
  value: DeliveryMethod;
  onChange: (v: DeliveryMethod) => void;
}

export function DeliverySelector({ value, onChange }: Props) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold">Delivery</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={`text-left p-4 border transition ${
                active ? "border-primary bg-secondary" : "border-border hover:border-primary/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{o.label}</span>
                <span className="tabular-nums text-sm">${o.price.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{o.eta}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export const DELIVERY_PRICES: Record<DeliveryMethod, number> = {
  standard: 8,
  express: 22,
};
