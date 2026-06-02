export function Marquee() {
  const items = [
    "Free shipping over $80",
    "New drop every Friday",
    "Limited editions",
    "Worldwide delivery",
    "Members-only access",
    "Anime × Street",
  ];
  const loop = [...items, ...items];
  return (
    <div className="border-y border-border bg-ink text-white overflow-hidden">
      <div className="marquee-track py-4 text-sm uppercase tracking-[0.3em] font-medium">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            {t}
            <span className="opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
