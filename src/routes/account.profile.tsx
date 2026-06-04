import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account/profile")({
  component: AccountProfile,
});

function AccountProfile() {
  const [form, setForm] = useState({
    name: "Guest",
    email: "you@example.com",
    phone: "",
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form
      className="max-w-xl space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Profile saved");
      }}
    >
      <h2 className="font-display text-2xl font-semibold">Profile</h2>
      <Field label="Full name" value={form.name} onChange={set("name")} />
      <Field label="Email" type="email" value={form.email} onChange={set("email")} />
      <Field label="Phone" type="tel" value={form.phone} onChange={set("phone")} />
      <button className="h-11 px-6 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.22em] hover:bg-accent">
        Save changes
      </button>
    </form>
  );
}

function Field({
  label, ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <input
        {...rest}
        className="mt-2 w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary"
      />
    </label>
  );
}
