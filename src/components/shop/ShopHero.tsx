import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function ShopHero() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-10 md:pt-14 pb-12 md:pb-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Shop</span>
        </nav>
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-balance">
              Shop XPENSE
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              The full catalog. Streetwear, graphic tees, anime-inspired drops and
              everyday essentials — designed to be worn loud.
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            — Drop 04 / 2026
          </p>
        </div>
      </div>
    </section>
  );
}
