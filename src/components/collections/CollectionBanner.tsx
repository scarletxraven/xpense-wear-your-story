import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface Props {
  name: string;
  slug: string;
}

export function CollectionBanner({ name, slug }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      <Link to="/" className="hover:text-foreground transition">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to="/collections" className="hover:text-foreground transition">Collections</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to="/collections/$slug" params={{ slug }} className="text-foreground">{name}</Link>
    </nav>
  );
}
