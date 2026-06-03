export interface Collection {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  productIds: string[];
  featured?: boolean;
  createdAt: string;
}
