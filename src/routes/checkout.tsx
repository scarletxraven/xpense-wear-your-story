import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AddressForm, type AddressData } from "@/components/checkout/AddressForm";
import {
  DeliverySelector,
  DELIVERY_PRICES,
  type DeliveryMethod,
} from "@/components/checkout/DeliverySelector";
import {
  PaymentSelector,
  type PaymentMethod,
} from "@/components/checkout/PaymentSelector";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — XPENSE" },
      { name: "description", content: "Complete your XPENSE order." },
    ],
  }),
  component: CheckoutPage,
});

const EMPTY: AddressData = {
  email: "", firstName: "", lastName: "", address: "",
  city: "", postal: "", country: "", phone: "",
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [address, setAddress] = useState<AddressData>(EMPTY);
  const [delivery, setDelivery] = useState<DeliveryMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [status, setStatus] = useState<"idle" | "placing" | "success">("idle");
  const [orderId, setOrderId] = useState<string>("");

  const shipping = items.length ? DELIVERY_PRICES[delivery] : 0;

  if (status === "success") {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-xl px-5 py-24 md:py-32 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14" strokeWidth={1.5} />
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Order placed.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thanks — a confirmation is on its way. Reference{" "}
            <span className="text-foreground font-semibold">{orderId}</span>.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/shop" className="h-12 inline-flex items-center px-6 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent">
              Keep shopping
            </Link>
            <Link to="/account" className="h-12 inline-flex items-center px-6 border border-border text-xs uppercase tracking-[0.2em] hover:bg-secondary">
              View orders
            </Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (items.length === 0) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-xl px-5 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Your bag is empty</h1>
          <p className="mt-2 text-muted-foreground text-sm">Add a piece before checking out.</p>
          <Link to="/shop" className="mt-6 inline-flex h-11 items-center px-6 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em] hover:bg-accent">
            Shop now
          </Link>
        </section>
      </SiteLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("placing");
    // Mock backend latency
    setTimeout(() => {
      const id = `XP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setOrderId(id);
      clear();
      setStatus("success");
    }, 900);
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-20">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Checkout</h1>
          <button
            type="button"
            onClick={() => navigate({ to: "/cart" })}
            className="text-xs uppercase tracking-[0.22em] hover:underline underline-offset-4"
          >
            ← Edit bag
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
          <div className="space-y-10">
            <AddressForm value={address} onChange={setAddress} />
            <DeliverySelector value={delivery} onChange={setDelivery} />
            <PaymentSelector value={payment} onChange={setPayment} />
            <button
              type="submit"
              disabled={status === "placing"}
              className="w-full h-13 py-4 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.22em] hover:bg-accent disabled:opacity-60"
            >
              {status === "placing" ? "Placing order..." : `Place order · $${(subtotal + shipping).toFixed(2)}`}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Demo checkout — no real payment is processed.
            </p>
          </div>
          <OrderSummary items={items} subtotal={subtotal} shipping={shipping} />
        </form>
      </section>
    </SiteLayout>
  );
}
