import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/" },
  { label: "Collections", href: "/" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
              <a key={n.label} href={n.href} className="relative py-2 hover:opacity-60 transition">
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <button aria-label="Search" className="p-2.5 hover:bg-secondary transition">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button aria-label="Account" className="p-2.5 hover:bg-secondary transition">
            <User className="h-[18px] w-[18px]" />
          </button>
          <button aria-label="Cart" className="relative p-2.5 hover:bg-secondary transition">
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-semibold text-primary-foreground">
              2
            </span>
          </button>
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
            <a key={n.label} href={n.href} className="py-3 border-b border-border/60" onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
