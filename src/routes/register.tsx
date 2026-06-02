import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — XPENSE" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-5 py-20 md:py-28">
        <h1 className="font-display text-4xl font-bold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Get early access to drops.</p>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input required placeholder="Full name" className="w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          <input type="email" required placeholder="Email" className="w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          <input type="password" required placeholder="Password" className="w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          <button type="submit" className="w-full h-12 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent">
            Create account
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-foreground underline underline-offset-4">Sign in</Link>
        </p>
      </section>
    </SiteLayout>
  );
}
