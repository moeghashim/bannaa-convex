import { redirect } from "next/navigation";
import { auth0 } from "../../lib/auth0";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TEMP DEBUG: force redirect immediately to verify /admin isn't hanging in Next/Vercel routing.
  // If this responds quickly, the hang is inside auth0.getSession() or downstream.
  redirect(`/api/auth/login?returnTo=${encodeURIComponent("/admin")}`);

  // unreachable
  return <>{children}</>;
}
