/**
 * Order service — frontend placeholder.
 * Returns mock data for admin/account screens.
 */
import type { Order } from "@/types";

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-10241", userId: "u-mock",
    customerName: "Alex Tan", customerEmail: "alex@example.com",
    items: [{ productId: "p-001", name: "Void Oversized Tee", image: "", price: 48, quantity: 2 }],
    subtotal: 96, shipping: 8, tax: 7.7, total: 111.7,
    status: "processing", createdAt: "2026-06-01",
  },
  {
    id: "ORD-10240", userId: "u-mock",
    customerName: "Maya R.", customerEmail: "maya@example.com",
    items: [{ productId: "p-003", name: "Monogram Heavy Hoodie", image: "", price: 128, quantity: 1 }],
    subtotal: 128, shipping: 0, tax: 10.24, total: 138.24,
    status: "shipped", createdAt: "2026-05-30",
  },
  {
    id: "ORD-10239", userId: "u-mock",
    customerName: "K. Liu", customerEmail: "kliu@example.com",
    items: [{ productId: "p-010", name: "Kanji Rebel Tee", image: "", price: 50, quantity: 3 }],
    subtotal: 150, shipping: 8, tax: 12, total: 170,
    status: "delivered", createdAt: "2026-05-22",
  },
];

const delay = <T>(v: T, ms = 200) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const orderService = {
  list: (): Promise<Order[]> => delay(MOCK_ORDERS),
  getById: (id: string): Promise<Order | null> =>
    delay(MOCK_ORDERS.find((o) => o.id === id) ?? null),
  listByUser: (userId: string): Promise<Order[]> =>
    delay(MOCK_ORDERS.filter((o) => o.userId === userId)),
};

export type OrderService = typeof orderService;
