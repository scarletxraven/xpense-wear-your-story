import story from "@/assets/story.jpg";

export function Story() {
  return (
    <section className="bg-ink text-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12 gap-10 px-5 md:px-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="aspect-[4/5] overflow-hidden bg-secondary/10">
            <img
              src={story}
              alt="XPENSE brand story"
              loading="lazy"
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">· The Story</span>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.95] text-balance">
            Clothing is the loudest way to stay silent.
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed max-w-lg">
            XPENSE started in a back-alley print studio with one rule — every piece must say
            something. We design for the kids who quote anime in group chats, the artists
            painting on cheap canvases, the dreamers who can't afford to be quiet.
          </p>
          <p className="mt-4 text-white/70 leading-relaxed max-w-lg">
            Minimal where it matters. Bold where it counts. Made in limited runs so you'll
            never see your fit twice on the same block.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "180k+", v: "Community" },
              { k: "12", v: "Drops / year" },
              { k: "100%", v: "Cotton" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl font-bold">{s.k}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/50">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
