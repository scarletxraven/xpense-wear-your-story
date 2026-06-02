import { Star } from "lucide-react";

const reviews = [
  {
    name: "Kira M.",
    location: "Brooklyn, NY",
    text: "The oversized tee fits exactly like the campaign shots. Heavyweight cotton, prints don't crack after washes. My third order.",
  },
  {
    name: "Daichi S.",
    location: "Osaka, JP",
    text: "Anime prints done tastefully — not cheesy. Quality reminds me of small Tokyo labels that charge twice as much.",
  },
  {
    name: "Léa R.",
    location: "Paris, FR",
    text: "XPENSE is the only brand I wait for the drop. Limited runs mean nobody else at the bar is wearing the same thing.",
  },
];

export function Reviews() {
  return (
    <section className="bg-chalk py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">· What people say</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-[0.95] text-balance">
            Real fits. Real people.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <figure key={r.name} className="flex flex-col justify-between bg-background p-8 border border-border">
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-lg leading-snug">
                  “{r.text}”
                </blockquote>
              </div>
              <figcaption className="mt-8 pt-6 border-t border-border">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{r.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
