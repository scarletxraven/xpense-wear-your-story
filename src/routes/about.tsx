import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Story } from "@/components/site/Story";
import { Reviews } from "@/components/site/Reviews";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — XPENSE" },
      { name: "description", content: "XPENSE is a streetwear and anime-inspired apparel label built around self-expression and small, intentional drops." },
      { property: "og:title", content: "About XPENSE" },
      { property: "og:description", content: "Streetwear made for self-expression." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">— About</p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] max-w-3xl">
            Wear loud. Stay unbothered.
          </h1>
          <p className="mt-6 max-w-xl text-base opacity-70 leading-relaxed">
            XPENSE was built in 2024 as a small studio releasing limited drops of streetwear,
            graphic tees and anime-inspired apparel — designed for people who treat what they
            wear as a form of expression, not a uniform.
          </p>
        </div>
      </section>
      <Story />
      <Reviews />
    </SiteLayout>
  );
}
