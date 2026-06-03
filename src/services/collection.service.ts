/**
 * Collection service — frontend placeholder.
 * Returns mock data only. Swap implementation for real API later.
 */
import type { Collection } from "@/types";

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "c-001", slug: "streetwear", name: "Streetwear",
    description: "Heavyweight essentials for everyday wear.",
    productIds: ["p-001", "p-003", "p-009"],
    featured: true, createdAt: "2026-05-01",
  },
  {
    id: "c-002", slug: "anime-inspired", name: "Anime Inspired",
    description: "Drops referencing iconic shōnen visuals.",
    productIds: ["p-002", "p-006", "p-010"],
    featured: true, createdAt: "2026-04-12",
  },
  {
    id: "c-003", slug: "graphic-tees", name: "Graphic Tees",
    description: "Bold prints, premium cotton.",
    productIds: ["p-004", "p-008", "p-012"],
    createdAt: "2026-03-20",
  },
  {
    id: "c-004", slug: "casual", name: "Casual",
    description: "Minimalist staples.",
    productIds: ["p-005", "p-007", "p-011"],
    createdAt: "2026-02-14",
  },
];

const delay = <T>(v: T, ms = 200) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const collectionService = {
  list: (): Promise<Collection[]> => delay(MOCK_COLLECTIONS),
  getBySlug: (slug: string): Promise<Collection | null> =>
    delay(MOCK_COLLECTIONS.find((c) => c.slug === slug) ?? null),
  getById: (id: string): Promise<Collection | null> =>
    delay(MOCK_COLLECTIONS.find((c) => c.id === id) ?? null),
};

export type CollectionService = typeof collectionService;
