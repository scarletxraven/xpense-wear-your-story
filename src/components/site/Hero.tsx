import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[640px] w-full overflow-hidden bg-ink">
      <img
        src={hero}
        alt="XPENSE streetwear campaign"
        width={1600}
        height={1920}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />

      <div className="absolute top-6 left-0 right-0 z-10 flex justify-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">
          Fall / Winter — Drop 03
        </span>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
        <div className="max-w-3xl reveal-up">
          <h1 className="font-display text-[15vw] md:text-[8vw] lg:text-[7rem] font-bold leading-[0.92] text-white text-balance">
            Wear<br />Your Story.
          </h1>
          <p className="mt-6 max-w-lg text-base md:text-lg text-white/80 leading-relaxed">
            Streetwear, graphic tees, and anime-inspired apparel designed for self-expression.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#new"
              className="group inline-flex items-center gap-3 bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#collections"
              className="inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Explore Collection
            </a>
          </div>
        </div>

        <div className="mt-12 hidden md:flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/60">
          <span>Tokyo · Berlin · NYC</span>
          <span>Scroll ↓</span>
        </div>
      </div>
    </section>
  );
}
