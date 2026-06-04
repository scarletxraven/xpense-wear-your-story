/**
 * Collection service — frontend placeholder.
 * Returns mock data only. Swap implementation for real API later.
 */
import type { Collection } from "@/types";
import type { Product, ProductCategory } from "@/lib/types";
import { listProducts } from "@/lib/api/products";
import street from "@/assets/cat-streetwear.jpg";
import anime from "@/assets/cat-anime.jpg";
import graphic from "@/assets/cat-graphic.jpg";
import casual from "@/assets/cat-casual.jpg";

export interface CollectionMeta extends Collection {
  image: string;
  tagline: string;
  category: ProductCategory;
}

const MOCK_COLLECTIONS: CollectionMeta[] = [
  {
    id: "c-001", slug: "streetwear", name: "Streetwear",
    tagline: "Built for the streets. Made for the bold.",
    description:
      "Heavyweight essentials, statement hoodies and unforgettable silhouettes — pieces engineered for the city and the late-night run.",
    productIds: [], category: "Streetwear", image: street,
    featured: true, createdAt: "2026-05-01",
  },
  {
    id: "c-002", slug: "anime-inspired", name: "Anime Inspired",
    tagline: "Drops referencing iconic shōnen visuals.",
    description:
      "Limited graphics inspired by the panels, frames and energy of the anime we grew up on. Wear your story.",
    productIds: [], category: "Anime Inspired", image: anime,
    featured: true, createdAt: "2026-04-12",
  },
  {
    id: "c-003", slug: "graphic-tees", name: "Graphic Tees",
    tagline: "Bold prints. Premium cotton.",
    description:
      "Statement tees printed on heavyweight cotton. Loud type, clean cuts, made to be worn out.",
    productIds: [], category: "Graphic Tees", image: graphic,
    createdAt: "2026-03-20",
  },
  {
    id: "c-004", slug: "casual", name: "Casual Essentials",
    tagline: "Minimalist staples for every day.",
    description:
      "Clean lines, neutral palette, refined fits. The foundation pieces every wardrobe deserves.",
    productIds: [], category: "Casual", image: casual,
    createdAt: "2026-02-14",
  },
];

const delay = <T>(v: T, ms = 200) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const collectionService = {
  list: (): Promise<CollectionMeta[]> => delay(MOCK_COLLECTIONS),
  getCollections: (): Promise<CollectionMeta[]> => delay(MOCK_COLLECTIONS),
  getBySlug: (slug: string): Promise<CollectionMeta | null> =>
    delay(MOCK_COLLECTIONS.find((c) => c.slug === slug) ?? null),
  getCollectionBySlug: (slug: string): Promise<CollectionMeta | null> =>
    delay(MOCK_COLLECTIONS.find((c) => c.slug === slug) ?? null),
  getById: (id: string): Promise<CollectionMeta | null> =>
    delay(MOCK_COLLECTIONS.find((c) => c.id === id) ?? null),
  getProductsByCollection: async (slug: string): Promise<Product[]> => {
    const col = MOCK_COLLECTIONS.find((c) => c.slug === slug);
    if (!col) return [];
    const res = await listProducts({ categories: [col.category], pageSize: 100 });
    return res.data;
  },
};

export type CollectionService = typeof collectionService;
