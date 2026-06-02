import { Instagram, Twitter, Youtube } from "lucide-react";

const cols = [
  {
    title: "Shop",
    links: ["New Arrivals", "Best Sellers", "Streetwear", "Anime Inspired", "Graphic Tees", "Sale"],
  },
  {
    title: "Help",
    links: ["Shipping", "Returns", "Size Guide", "Track Order", "FAQ", "Contact"],
  },
  {
    title: "Company",
    links: ["Our Story", "Sustainability", "Press", "Careers", "Wholesale", "Stockists"],
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-5xl font-bold tracking-tight">XPENSE</h3>
            <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Streetwear, graphic tees and anime-inspired apparel for the bold and the
              unbothered.
            </p>
            <div className="mt-8 flex gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex h-11 w-11 items-center justify-center border border-border hover:bg-primary hover:text-primary-foreground transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-5">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-5">Contact</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              hello@xpense.co<br />
              +1 (212) 555-0184<br />
              <span className="block mt-3">123 Canal St<br />New York, NY</span>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} XPENSE. All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-[0.18em]">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
