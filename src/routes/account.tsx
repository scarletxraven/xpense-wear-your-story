import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AccountLayout } from "@/components/account/AccountLayout";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — XPENSE" }] }),
  component: () => (
    <SiteLayout>
      <AccountLayout />
    </SiteLayout>
  ),
});
