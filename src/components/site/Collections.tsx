import { ArrowUpRight } from "lucide-react";
import street from "@/assets/cat-streetwear.jpg";
import anime from "@/assets/cat-anime.jpg";
import graphic from "@/assets/cat-graphic.jpg";
import casual from "@/assets/cat-casual.jpg";

const items = [
  { name: "Streetwear", count: "24 pieces", img: street, span: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" },
  { name: "Anime Inspired", count: "18 pieces", img: anime, span: "aspect-[4/5]" },
  { name: "Graphic Tees", count: "32 pieces", img: graphic, span: "aspect-[4/5]" },
  { name: "Casual Essentials", count: "21 pieces", img: casual, span: "md:col-span-2 aspect-[16/9] md:aspect-[2/1]" },
];

export function Collections() {
  return (
    <section id="collections" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              · 01 — Collections
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[0.95] text-balance">
              Built for the streets.<br />Made for the bold.
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:opacity-60">
            View all <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((c) => (
            <a
              key={c.name}
              href="#"
              className={`hover-zoom group relative block overflow-hidden bg-secondary ${c.span}`}
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{c.name}</h3>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mt-1">{c.count}</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center bg-white text-black transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
