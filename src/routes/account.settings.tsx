import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account/settings")({
  component: AccountSettings,
});

function AccountSettings() {
  const [marketing, setMarketing] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage notifications and account preferences.</p>
      </div>

      <Toggle
        label="Marketing emails"
        description="New drops, lookbooks, and limited releases."
        checked={marketing}
        onChange={setMarketing}
      />
      <Toggle
        label="Order updates"
        description="Shipping confirmations and delivery alerts."
        checked={orderUpdates}
        onChange={setOrderUpdates}
      />

      <div className="border-t border-border pt-6 flex gap-3">
        <button
          type="button"
          onClick={() => toast.success("Preferences saved")}
          className="h-11 px-6 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.22em] hover:bg-accent"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => toast("Account signed out (demo)")}
          className="h-11 px-6 border border-border text-xs uppercase tracking-[0.22em] hover:bg-secondary"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Toggle({
  label, description, checked, onChange,
}: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-6 border border-border p-5">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 transition shrink-0 ${checked ? "bg-primary" : "bg-border"}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 bg-background transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
