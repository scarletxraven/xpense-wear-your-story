interface Props {
  rows?: number;
  cols?: number;
}

export function ProductGridSkeleton({ rows = 2, cols = 4 }: Props) {
  const count = rows * cols;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="aspect-[4/5] bg-secondary animate-pulse" />
          <div className="mt-4 h-3 w-20 bg-secondary animate-pulse" />
          <div className="mt-2 h-4 w-40 bg-secondary animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 bg-secondary animate-pulse" />
      ))}
    </div>
  );
}
