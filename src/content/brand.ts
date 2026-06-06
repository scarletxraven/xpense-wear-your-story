import story from "@/assets/story.jpg";
import { homeCopy } from "@/content/site";

/**
 * Marketing blocks. Section copy proxies through `src/content/site.ts`
 * so all editable strings live in a single source of truth.
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
  /** Path passed to TanStack Router `<Link to>`. */
  buttonTo: string;
  /** Optional query object passed to `<Link search>`. */
  buttonSearch?: Record<string, string>;
}

export const brandStory: BrandStoryBlock = {
  eyebrow: homeCopy.story.eyebrow,
  title: homeCopy.story.title,
  body: homeCopy.story.body,
  image: story,
  imageAlt: "XPENSE brand story",
  imagePosition: "left",
  stats: [],
};

export const newArrivalsBlock: SectionBlock = {
  eyebrow: homeCopy.newArrivals.eyebrow,
  title: homeCopy.newArrivals.title,
  subtitle: homeCopy.newArrivals.subtitle,
  buttonText: homeCopy.newArrivals.buttonText,
  buttonTo: "/shop",
  buttonSearch: { sort: "new" },
};

export const bestSellersBlock: SectionBlock = {
  eyebrow: homeCopy.bestSellers.eyebrow,
  title: homeCopy.bestSellers.title,
  subtitle: homeCopy.bestSellers.subtitle,
  buttonText: homeCopy.bestSellers.buttonText,
  buttonTo: "/shop",
  buttonSearch: { sort: "bestseller" },
};
