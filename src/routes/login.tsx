import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — XPENSE" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-5 py-20 md:py-28">
        <h1 className="font-display text-4xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Welcome back.</p>
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="Email" className="w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          <input type="password" required placeholder="Password" className="w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary" />
          <button type="submit" className="w-full h-12 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent">
            Sign in
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          New here? <Link to="/register" className="text-foreground underline underline-offset-4">Create an account</Link>
        </p>
      </section>
    </SiteLayout>
  );
}
