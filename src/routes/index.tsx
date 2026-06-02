import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Collections } from "@/components/site/Collections";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Story } from "@/components/site/Story";
import { Reviews } from "@/components/site/Reviews";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";
import { bestSellers, newArrivals } from "@/lib/products";

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
        <ProductGrid
          id="new"
          label="· 02 — New Arrivals"
          title="Just dropped."
          description="Fresh from the studio. Limited quantities — once they're gone, they're gone."
          products={newArrivals}
        />
        <Story />
        <ProductGrid
          id="best"
          label="· 03 — Best Sellers"
          title="The crowd favorites."
          description="The pieces that keep selling out. Restocked in limited runs only."
          products={bestSellers}
        />
        <Reviews />
        <Newsletter />
        <Footer />
      </main>
    </div>
  );
}
