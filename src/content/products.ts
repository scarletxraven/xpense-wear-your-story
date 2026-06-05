import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import type { Product, ProductReview, SizeGuideRow } from "@/lib/types";

/**
 * Editable XPENSE product catalog.
 *
 * This is the single source of truth for product copy on the storefront.
 * Editing a field here propagates to the Shop, Product Details page, Cart,
 * Wishlist, and Collections. Future: swap with backend by replacing the
 * exports while keeping the same shape.
 */

const DEFAULT_FEATURES = [
  "280gsm heavyweight cotton",
  "Drop-shoulder relaxed silhouette",
  "Pre-washed for soft hand-feel",
  "Designed in-house · Limited run",
];

const DEFAULT_SHIPPING = [
  "Free standard shipping on orders over $100.",
  "Express delivery available at checkout (1–3 business days).",
  "International shipping to 60+ countries.",
];

const DEFAULT_RETURNS = [
  "Easy 30-day returns on unworn items.",
  "Original tags and packaging required.",
  "Final-sale items are non-refundable.",
];

const DEFAULT_SIZE_GUIDE: SizeGuideRow[] = [
  { size: "S", chest: "42", length: "27" },
  { size: "M", chest: "44", length: "28" },
  { size: "L", chest: "46", length: "29" },
  { size: "XL", chest: "48", length: "30" },
  { size: "XXL", chest: "50", length: "31" },
];

const DEFAULT_REVIEWS: ProductReview[] = [
  { name: "Alex M.", rating: 5, text: "Fit is exactly as pictured. Heavy, soft, perfect drape.", date: "2026-05-12" },
  { name: "Riya S.", rating: 5, text: "My third XPENSE piece. Quality keeps getting better.", date: "2026-04-22" },
  { name: "Jordan K.", rating: 4, text: "Runs slightly oversized — size down if you want a regular fit.", date: "2026-03-30" },
];

export const BRAND_DEFAULTS = {
  shippingThreshold: 100,
  returnsDays: 30,
  brandStatement: "Designed in-house · Made in limited runs",
  shipping: DEFAULT_SHIPPING,
  returns: DEFAULT_RETURNS,
  sizeGuide: DEFAULT_SIZE_GUIDE,
  features: DEFAULT_FEATURES,
  reviews: DEFAULT_REVIEWS,
};

export const PRODUCTS: Product[] = [
  {
    id: "p-001", slug: "void-oversized-tee", name: "Void Oversized Tee",
    category: "Streetwear", collection: "Streetwear", price: 48, image: p1,
    images: [p1, p3, p4], badge: "New",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Bone", hex: "#F5F5F5" }],
    inStock: true, stock: 24, createdAt: "2026-05-28", sales: 120, featured: true,
    shortDescription:
      "A staple drop built around quiet confidence. Heavyweight cotton, boxy silhouette, clean lines.",
    fullDescription:
      "Cut from 280gsm heavyweight cotton with a relaxed drop-shoulder silhouette. Pre-washed for a softer hand-feel and minimal shrinkage. The Void Tee is the foundation of the XPENSE wardrobe — bold proportions, refined finish.",
    features: [
      "280gsm heavyweight cotton",
      "Boxy oversized fit",
      "Ribbed crew neck, twin-needle stitching",
      "Garment-washed for softness",
    ],
  },
  {
    id: "p-002", slug: "shonen-hero-graphic", name: "Shōnen Hero Graphic",
    category: "Anime Inspired", collection: "Anime Inspired", price: 54, image: p2,
    images: [p2, p1, p4], badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    inStock: true, stock: 12, createdAt: "2026-05-25", sales: 210,
    shortDescription:
      "A hand-drawn tribute to the panels we grew up on. Printed on heavyweight cotton.",
    fullDescription:
      "Originally sketched in-house, the Shōnen Hero graphic pays homage to the classic shōnen frame — dynamic lines, bold contrast, no compromise. Screen-printed in two passes for a deep, lasting finish.",
    features: [
      "Hand-drawn original artwork",
      "Two-pass screen print",
      "Anime-inspired limited drop",
      "Heavyweight cotton, boxy fit",
    ],
  },
  {
    id: "p-003", slug: "monogram-heavy-hoodie", name: "Monogram Heavy Hoodie",
    category: "Streetwear", collection: "Streetwear", price: 128, image: p3,
    images: [p3, p1, p2], badge: "Best Seller",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Charcoal", hex: "#1A1A1A" }],
    inStock: true, stock: 40, createdAt: "2026-04-12", sales: 540, featured: true,
    shortDescription:
      "Heavyweight 480gsm fleece with an embroidered monogram chest hit.",
    fullDescription:
      "Built for cold studio nights and colder city blocks. 480gsm brushed-back fleece, double-layer hood, kangaroo pocket, and an embroidered XPENSE monogram. Heavy in the best way.",
    features: [
      "480gsm brushed-back fleece",
      "Double-layer hood with thick drawcords",
      "Embroidered XPENSE chest monogram",
      "Reinforced cuffs and hem",
    ],
  },
  {
    id: "p-004", slug: "xpense-wordmark-tee", name: "XPENSE Wordmark Tee",
    category: "Graphic Tees", collection: "Graphic Tees", price: 42, image: p4,
    images: [p4, p2, p1],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
    inStock: true, stock: 60, createdAt: "2026-05-01", sales: 380,
    shortDescription: "Loud type, clean cuts. The wordmark tee, perfected.",
    fullDescription:
      "A staple wordmark tee printed on heavyweight cotton. Designed to be worn out — to the studio, the show, the late-night run.",
  },
  {
    id: "p-005", slug: "afterhours-cargo", name: "Afterhours Cargo Pant",
    category: "Casual", collection: "Casual", price: 96, image: p3,
    images: [p3, p4],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#1A1A1A" }],
    inStock: true, stock: 18, createdAt: "2026-03-20", sales: 175,
    shortDescription: "Tailored cargo pant with utility details for the everyday.",
    fullDescription:
      "A refined cargo built from mid-weight twill. Six pockets, articulated knees, tapered ankle. Quiet utility, no noise.",
  },
  {
    id: "p-006", slug: "ghost-arc-tee", name: "Ghost Arc Anime Tee",
    category: "Anime Inspired", collection: "Anime Inspired", price: 52, image: p2,
    images: [p2, p1], badge: "Low Stock", statusLabel: "Low Stock",
    sizes: ["M", "L"],
    colors: [{ name: "Black", hex: "#000000" }],
    inStock: true, stock: 4, createdAt: "2026-05-10", sales: 290,
    shortDescription: "An anime-inspired arc print. Limited quantity.",
    fullDescription:
      "Inspired by the closing frames of a classic arc. Hand-drawn, screen-printed, and dropped in a single small run.",
  },
  {
    id: "p-007", slug: "blank-canvas-tee", name: "Blank Canvas Tee",
    category: "Casual", collection: "Casual", price: 32, image: p1,
    images: [p1, p4],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Bone", hex: "#F5F5F5" }, { name: "Black", hex: "#000000" }],
    inStock: false, stock: 0, createdAt: "2026-02-14", sales: 460,
    statusLabel: "Sold Out",
    shortDescription: "The foundation tee. Quiet, perfected, restocked in waves.",
    fullDescription:
      "The Blank Canvas is the foundation of every XPENSE fit — heavyweight cotton, boxy cut, garment-washed for softness.",
  },
  {
    id: "p-008", slug: "static-print-tee", name: "Static Print Graphic Tee",
    category: "Graphic Tees", collection: "Graphic Tees", price: 46, image: p4,
    images: [p4, p2],
    sizes: ["S", "M", "L"],
    colors: [{ name: "Black", hex: "#000000" }],
    inStock: true, stock: 22, createdAt: "2026-05-18", sales: 95,
    shortDescription: "A high-contrast static graphic. Heavyweight cotton.",
  },
  {
    id: "p-009", slug: "nightwalk-hoodie", name: "Nightwalk Hoodie",
    category: "Streetwear", collection: "Streetwear", price: 118, image: p3,
    images: [p3, p1],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }],
    inStock: true, stock: 30, createdAt: "2026-04-30", sales: 220,
    shortDescription: "Mid-weight hoodie cut for late-night silhouettes.",
  },
  {
    id: "p-010", slug: "kanji-rebel-tee", name: "Kanji Rebel Tee",
    category: "Anime Inspired", collection: "Anime Inspired", price: 50, image: p2,
    images: [p2, p4],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
    inStock: true, stock: 36, createdAt: "2026-05-05", sales: 310, featured: true,
    shortDescription: "Kanji-led graphic with sharp negative space.",
  },
  {
    id: "p-011", slug: "static-noise-cap", name: "Static Noise Cap",
    category: "Casual", collection: "Casual", price: 38, image: p1,
    images: [p1, p3],
    sizes: ["M", "L"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Bone", hex: "#F5F5F5" }],
    inStock: true, stock: 50, createdAt: "2026-03-02", sales: 140,
    shortDescription: "Six-panel cap, embroidered monogram, structured crown.",
  },
  {
    id: "p-012", slug: "monogram-tee", name: "Monogram Tee",
    category: "Graphic Tees", collection: "Graphic Tees", price: 44, image: p4,
    images: [p4, p1], badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    inStock: true, stock: 28, createdAt: "2026-05-30", sales: 60,
    shortDescription: "Embroidered monogram tee. Clean, restrained, premium.",
  },
];

/**
 * Mock admin actions — frontend only.
 * Mutate the in-memory PRODUCTS array. Replace with API calls later.
 */
export async function createProduct(p: Omit<Product, "id" | "createdAt" | "sales">): Promise<Product> {
  const next: Product = {
    ...p,
    id: `p-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    sales: 0,
  };
  PRODUCTS.unshift(next);
  return next;
}

export async function updateProduct(id: string, patch: Partial<Product>): Promise<Product | null> {
  const idx = PRODUCTS.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  PRODUCTS[idx] = { ...PRODUCTS[idx], ...patch };
  return PRODUCTS[idx];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const idx = PRODUCTS.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  PRODUCTS.splice(idx, 1);
  return true;
}
