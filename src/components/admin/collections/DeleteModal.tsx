import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function DeleteModal({
  open,
  title,
  description,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
        </DialogHeader>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <DialogFooter>
          <button
            onClick={onClose}
            className="h-10 px-4 border border-border text-xs uppercase tracking-[0.2em] hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-10 px-5 bg-destructive text-destructive-foreground text-xs uppercase tracking-[0.2em] hover:opacity-90"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
