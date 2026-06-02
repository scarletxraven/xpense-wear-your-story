import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — XPENSE" },
      { name: "description", content: "Get in touch with the XPENSE team — support, press, wholesale and collabs." },
      { property: "og:title", content: "Contact XPENSE" },
      { property: "og:description", content: "Reach the XPENSE team." },
    ],
  }),
  component: ContactPage,
});

const inputCls =
  "w-full h-12 px-4 border border-border bg-background text-sm focus:outline-none focus:border-primary";

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 py-20 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">— Contact</p>
        <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
          Say hi.
        </h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Name"><input required className={inputCls} /></Field>
              <Field label="Email"><input type="email" required className={inputCls} /></Field>
            </div>
            <Field label="Subject"><input className={inputCls} /></Field>
            <Field label="Message">
              <textarea rows={6} required className={`${inputCls} h-auto py-3 resize-none`} />
            </Field>
            <button
              type="submit"
              className="h-12 px-8 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent"
            >
              {sent ? "Sent ✓" : "Send message"}
            </button>
          </form>

          <aside className="space-y-6">
            <Info icon={<Mail className="h-5 w-5" />} label="Email" value="hello@xpense.co" />
            <Info icon={<Phone className="h-5 w-5" />} label="Phone" value="+1 (212) 555-0184" />
            <Info icon={<MapPin className="h-5 w-5" />} label="Studio" value="123 Canal St, New York" />
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.22em] font-semibold mb-2">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <div className="flex items-center gap-3">{icon}<span className="text-[11px] uppercase tracking-[0.22em] font-semibold">{label}</span></div>
      <p className="mt-2 text-sm">{value}</p>
    </div>
  );
}
