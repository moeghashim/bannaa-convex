import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth0 } from "../../lib/auth0";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";

  const baseUrl = process.env.APP_BASE_URL?.trim() || "https://bannaa-convex.vercel.app";
  const req = new Request(`${baseUrl}/dashboard`, {
    headers: {
      cookie,
    },
  });

  const session = await auth0.getSession(req as any);
  const email = (session?.user as any)?.email?.toLowerCase?.();

  if (!email) {
    redirect(`/api/auth/login?returnTo=${encodeURIComponent("/dashboard")}`);
  }

  return <>{children}</>;
}
