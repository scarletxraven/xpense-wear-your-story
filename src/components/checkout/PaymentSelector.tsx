import { CreditCard, Landmark, Wallet } from "lucide-react";

export type PaymentMethod = "card" | "bank" | "wallet";

const OPTIONS: { id: PaymentMethod; label: string; icon: typeof CreditCard; hint: string }[] = [
  { id: "card", label: "Card", icon: CreditCard, hint: "Visa, Mastercard, Amex" },
  { id: "bank", label: "Bank transfer", icon: Landmark, hint: "Direct deposit" },
  { id: "wallet", label: "Wallet", icon: Wallet, hint: "Apple / Google Pay" },
];

interface Props {
  value: PaymentMethod;
  onChange: (v: PaymentMethod) => void;
}

export function PaymentSelector({ value, onChange }: Props) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold">Payment</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OPTIONS.map(({ id, label, icon: Icon, hint }) => {
          const active = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={active}
              className={`text-left p-4 border transition ${
                active ? "border-primary bg-secondary" : "border-border hover:border-primary/60"
              }`}
            >
              <Icon className="h-5 w-5" />
              <p className="mt-3 font-semibold">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
            </button>
          );
        })}
      </div>

      {value === "card" && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Card number" className="md:col-span-2 h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          <input placeholder="MM / YY" className="h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          <input placeholder="CVC" className="h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
        </div>
      )}
    </section>
  );
}
