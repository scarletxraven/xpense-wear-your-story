/**
 * Centralized, editable XPENSE site copy.
 *
 * Everything user-facing on the marketing site should live here so that
 * future admin tooling (or a CMS) can mutate copy without touching components.
 */

export interface BrandMetric {
  value: string;
  title: string;
  description: string;
  icon?: string;
}

/** 2–6 metrics supported. Update freely; the UI auto-adapts. */
export const brandMetrics: BrandMetric[] = [
  { value: "01", title: "First Collection", description: "The beginning." },
  { value: "04", title: "Core Categories", description: "Streetwear to anime." },
  { value: "∞", title: "Ideas In Progress", description: "Always creating." },
];

export const brandMetricsBlock = {
  eyebrow: "· The Numbers",
  title: "Small drops. Strong identity.",
  subtitle: "A young brand built piece by piece — no filler, no waste.",
};

/** Homepage section copy. */
export const homeCopy = {
  story: {
    eyebrow: "· The Story",
    title: "Wear Your Story.",
    body: [
      "XPENSE started with one idea — clothes should speak before you do.",
      "Designed for people who live online, think visually, and wear what matters.",
      "Small runs. Strong identity. No wasted pieces.",
    ],
  },
  newArrivals: {
    eyebrow: "· New",
    title: "Fresh Off The Press",
    subtitle: "Newest releases from the studio.",
    buttonText: "Explore New",
  },
  bestSellers: {
    eyebrow: "· Most Wanted",
    title: "Most Wanted",
    subtitle: "Pieces that stayed.",
    buttonText: "View Collection",
  },
};

/** Empty / fallback states across the app. */
export const emptyStates = {
  cart: {
    title: "Your rotation starts here.",
    description: "Nothing in the bag yet — pick something worth wearing.",
    cta: "Start shopping",
  },
  wishlist: {
    title: "Nothing saved yet.",
    description: "Tap the heart on any piece to keep it close.",
    cta: "Browse the shop",
  },
  collection: {
    title: "This rack is still waiting.",
    description: "No pieces match these filters yet — try widening the search.",
  },
  notFound: {
    eyebrow: "404",
    title: "Looks like this drop never existed.",
    description: "The page you’re after may have moved, sold out, or never released.",
    cta: "Back to home",
  },
};
