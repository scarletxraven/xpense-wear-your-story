export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}
