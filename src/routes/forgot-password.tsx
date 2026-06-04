import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Reset password — XPENSE" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-5 py-20 md:py-28">
        <h1 className="font-display text-4xl font-bold tracking-tight">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="mt-8 border border-border p-6">
            <p className="font-semibold">Check your inbox.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              If an account exists for that email, a reset link is on its way.
            </p>
          </div>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent"
            >
              Send reset link
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-4">
            Back to sign in
          </Link>
        </p>
      </section>
    </SiteLayout>
  );
}
