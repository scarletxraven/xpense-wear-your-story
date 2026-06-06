import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Collections } from "@/components/site/Collections";
import { BrandMetrics } from "@/components/site/BrandMetrics";
import { ProductShowcase } from "@/components/content/ProductShowcase";
import { EditableHero } from "@/components/content/EditableHero";
import { Reviews } from "@/components/site/Reviews";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";
import { bestSellers, newArrivals } from "@/lib/products";
import {
  brandStory,
  newArrivalsBlock,
  bestSellersBlock,
} from "@/content/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XPENSE — Wear Your Story | Streetwear, Anime & Graphic Tees" },
      {
        name: "description",
        content:
          "XPENSE designs modern streetwear, graphic tees and anime-inspired apparel in limited drops. Bold, minimal, made for self-expression.",
      },
      { property: "og:title", content: "XPENSE — Wear Your Story" },
      {
        property: "og:description",
        content: "Streetwear, graphic tees and anime-inspired apparel for the bold.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collections />
        <ProductShowcase id="new" block={newArrivalsBlock} products={newArrivals} />
        <EditableHero block={brandStory} />
        <BrandMetrics />
        <ProductShowcase id="best" block={bestSellersBlock} products={bestSellers} />

        <Reviews />
        <Newsletter />
        <Footer />
      </main>
    </div>
  );
}
