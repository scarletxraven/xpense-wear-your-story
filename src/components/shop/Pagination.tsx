import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="flex items-center gap-1 h-10 px-3 border border-border text-xs uppercase tracking-[0.18em] disabled:opacity-40 hover:bg-secondary"
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`h-10 w-10 text-sm font-semibold border transition ${
            p === page
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border hover:bg-secondary"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="flex items-center gap-1 h-10 px-3 border border-border text-xs uppercase tracking-[0.18em] disabled:opacity-40 hover:bg-secondary"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
