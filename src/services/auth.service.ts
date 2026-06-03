/**
 * Auth service — frontend placeholder.
 * Mock-only. No real auth. Swap for Supabase/etc. later.
 */
import type { AuthSession, Credentials, User } from "@/types";

const MOCK_USER: User = {
  id: "u-mock",
  email: "guest@xpense.dev",
  name: "Guest",
  role: "customer",
  createdAt: "2026-01-01",
};

const delay = <T>(v: T, ms = 200) => new Promise<T>((r) => setTimeout(() => r(v), ms));

export const authService = {
  getSession: (): Promise<AuthSession | null> => delay(null),
  login: (_creds: Credentials): Promise<AuthSession> =>
    delay({
      user: MOCK_USER,
      token: "mock-token",
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    }),
  register: (_creds: Credentials & { name?: string }): Promise<AuthSession> =>
    delay({
      user: MOCK_USER,
      token: "mock-token",
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    }),
  logout: (): Promise<void> => delay(undefined),
  me: (): Promise<User | null> => delay(null),
};

export type AuthService = typeof authService;
