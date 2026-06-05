import story from "@/assets/story.jpg";

/**
 * Frontend-only editable marketing copy.
 * Future: replace with CMS-fetched content; consumers already read from here.
 */

export interface BrandStat {
  k: string;
  v: string;
}

export interface BrandStoryBlock {
  eyebrow: string;
  title: string;
  body: string[];
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  stats: BrandStat[];
}

export interface SectionBlock {
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

export const brandStory: BrandStoryBlock = {
  eyebrow: "· The Story",
  title: "Clothing is the loudest way to stay silent.",
  body: [
    "XPENSE started in a back-alley print studio with one rule — every piece must say something. We design for the kids who quote anime in group chats, the artists painting on cheap canvases, the dreamers who can't afford to be quiet.",
    "Minimal where it matters. Bold where it counts. Made in limited runs so you'll never see your fit twice on the same block.",
  ],
  image: story,
  imageAlt: "XPENSE brand story",
  imagePosition: "left",
  stats: [
    { k: "180k+", v: "Community" },
    { k: "12", v: "Drops / year" },
    { k: "98%", v: "Satisfaction" },
  ],
};

export const newArrivalsBlock: SectionBlock = {
  eyebrow: "· 02 — New Arrivals",
  title: "Just dropped.",
  subtitle:
    "Fresh from the studio. Limited quantities — once they're gone, they're gone.",
  buttonText: "Shop All",
  buttonHref: "/shop?sort=new",
};

export const bestSellersBlock: SectionBlock = {
  eyebrow: "· 03 — Best Sellers",
  title: "The crowd favorites.",
  subtitle:
    "The pieces that keep selling out. Restocked in limited runs only.",
  buttonText: "Shop All",
  buttonHref: "/shop?sort=bestseller",
};
