import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-ink text-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-10 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">· Members only</span>
        <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.95] text-balance">
          Get the drop before<br />it hits the feed.
        </h2>
        <p className="mt-5 text-white/70 max-w-lg mx-auto">
          Early access to new collections, exclusive colorways, and 10% off your first order.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="mt-10 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent border border-white/30 px-5 py-4 text-sm placeholder:text-white/40 outline-none focus:border-white transition"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] hover:bg-white/90 transition"
          >
            {sent ? "Welcome ✦" : "Subscribe"} <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/40">
          No spam. Unsubscribe whenever.
        </p>
      </div>
    </section>
  );
}
