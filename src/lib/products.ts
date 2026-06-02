import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import type { Product } from "./types";

/**
 * Mock product catalog.
 * Shape mirrors the future API response so swapping to a real backend
 * (e.g. /api/products) is a drop-in change inside `lib/api/products.ts`.
 */
export const PRODUCTS: Product[] = [
  {
    id: "p-001", slug: "void-oversized-tee", name: "Void Oversized Tee",
    category: "Streetwear", price: 48, image: p1, badge: "New",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Bone", hex: "#F5F5F5" }],
    inStock: true, createdAt: "2026-05-28", sales: 120, featured: true,
  },
  {
    id: "p-002", slug: "shonen-hero-graphic", name: "Shōnen Hero Graphic",
    category: "Anime Inspired", price: 54, image: p2, badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    inStock: true, createdAt: "2026-05-25", sales: 210,
  },
  {
    id: "p-003", slug: "monogram-heavy-hoodie", name: "Monogram Heavy Hoodie",
    category: "Streetwear", price: 128, image: p3, badge: "Best Seller",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Charcoal", hex: "#1A1A1A" }],
    inStock: true, createdAt: "2026-04-12", sales: 540, featured: true,
  },
  {
    id: "p-004", slug: "xpense-wordmark-tee", name: "XPENSE Wordmark Tee",
    category: "Graphic Tees", price: 42, image: p4,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
    inStock: true, createdAt: "2026-05-01", sales: 380,
  },
  {
    id: "p-005", slug: "afterhours-cargo", name: "Afterhours Cargo Pant",
    category: "Casual", price: 96, image: p3,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#1A1A1A" }],
    inStock: true, createdAt: "2026-03-20", sales: 175,
  },
  {
    id: "p-006", slug: "ghost-arc-tee", name: "Ghost Arc Anime Tee",
    category: "Anime Inspired", price: 52, image: p2, badge: "Low Stock",
    sizes: ["M", "L"],
    colors: [{ name: "Black", hex: "#000000" }],
    inStock: true, createdAt: "2026-05-10", sales: 290,
  },
  {
    id: "p-007", slug: "blank-canvas-tee", name: "Blank Canvas Tee",
    category: "Casual", price: 32, image: p1,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Bone", hex: "#F5F5F5" }, { name: "Black", hex: "#000000" }],
    inStock: false, createdAt: "2026-02-14", sales: 460,
  },
  {
    id: "p-008", slug: "static-print-tee", name: "Static Print Graphic Tee",
    category: "Graphic Tees", price: 46, image: p4,
    sizes: ["S", "M", "L"],
    colors: [{ name: "Black", hex: "#000000" }],
    inStock: true, createdAt: "2026-05-18", sales: 95,
  },
  {
    id: "p-009", slug: "nightwalk-hoodie", name: "Nightwalk Hoodie",
    category: "Streetwear", price: 118, image: p3,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }],
    inStock: true, createdAt: "2026-04-30", sales: 220,
  },
  {
    id: "p-010", slug: "kanji-rebel-tee", name: "Kanji Rebel Tee",
    category: "Anime Inspired", price: 50, image: p2,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
    inStock: true, createdAt: "2026-05-05", sales: 310, featured: true,
  },
  {
    id: "p-011", slug: "static-noise-cap", name: "Static Noise Cap",
    category: "Casual", price: 38, image: p1,
    sizes: ["M", "L"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "Bone", hex: "#F5F5F5" }],
    inStock: true, createdAt: "2026-03-02", sales: 140,
  },
  {
    id: "p-012", slug: "monogram-tee", name: "Monogram Tee",
    category: "Graphic Tees", price: 44, image: p4, badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#FFFFFF" }],
    inStock: true, createdAt: "2026-05-30", sales: 60,
  },
];

// Legacy exports kept so the existing homepage keeps working.
export const newArrivals = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);
export const bestSellers = [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 4);
