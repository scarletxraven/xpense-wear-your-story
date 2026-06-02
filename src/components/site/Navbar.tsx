import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const nav = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { ids: wishIds } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight">
            XPENSE
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-[0.14em]">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="relative py-2 hover:opacity-60 transition"
                activeProps={{ className: "relative py-2 underline underline-offset-8" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link to="/shop" aria-label="Search" className="p-2.5 hover:bg-secondary transition">
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative p-2.5 hover:bg-secondary transition">
            <Heart className="h-[18px] w-[18px]" />
            {wishIds.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-semibold text-primary-foreground">
                {wishIds.length}
              </span>
            )}
          </Link>
          <Link to="/account" aria-label="Account" className="p-2.5 hover:bg-secondary transition">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative p-2.5 hover:bg-secondary transition">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            className="ml-1 p-2.5 md:hidden hover:bg-secondary transition"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-5 py-4 flex flex-col gap-1 text-sm uppercase tracking-[0.14em]">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="py-3 border-b border-border/60"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
