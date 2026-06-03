export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— Admin</span>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold">{title}</h1>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
