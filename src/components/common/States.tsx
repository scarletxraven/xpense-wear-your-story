import type { ReactNode } from "react";

export function EmptyState({
  title = "Nothing here yet.",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="border border-dashed border-border py-20 text-center">
      <p className="font-display text-2xl font-semibold">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong.",
  description = "Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="border border-destructive/40 bg-destructive/5 py-16 text-center">
      <p className="font-display text-xl font-semibold">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-10 items-center px-5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.2em]"
        >
          Retry
        </button>
      )}
    </div>
  );
}
