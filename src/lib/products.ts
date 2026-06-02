import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import type { Product } from "@/components/site/ProductCard";

export const newArrivals: Product[] = [
  { id: "n1", name: "Void Oversized Tee", category: "Streetwear", price: 48, image: p1, badge: "New" },
  { id: "n2", name: "Shōnen Hero Graphic", category: "Anime", price: 54, image: p2, badge: "New" },
  { id: "n3", name: "Monogram Heavy Hoodie", category: "Streetwear", price: 128, image: p3, badge: "New" },
  { id: "n4", name: "XPENSE Wordmark Tee", category: "Graphic", price: 42, image: p4, badge: "New" },
];

export const bestSellers: Product[] = [
  { id: "b1", name: "Monogram Heavy Hoodie", category: "Streetwear", price: 128, image: p3, badge: "Best Seller" },
  { id: "b2", name: "XPENSE Wordmark Tee", category: "Graphic", price: 42, image: p4 },
  { id: "b3", name: "Void Oversized Tee", category: "Streetwear", price: 48, image: p1 },
  { id: "b4", name: "Shōnen Hero Graphic", category: "Anime", price: 54, image: p2, badge: "Low Stock" },
];
