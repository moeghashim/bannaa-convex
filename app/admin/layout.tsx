import { redirect } from "next/navigation";
import { auth0 } from "../../lib/auth0";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In App Router server components, the Auth0 SDK can read cookies automatically.
  // Avoid manually constructing a Request (can break in edge/proxy setups).
  let session: any = null;
  try {
    session = await auth0.getSession();
  } catch {
    session = null;
  }

  const email = (session?.user as any)?.email?.toLowerCase?.();

  if (!email) {
    redirect(`/api/auth/login?returnTo=${encodeURIComponent("/admin")}`);
  }

  if (email !== "moe@bannaa.co") {
    redirect("/");
  }

  return <>{children}</>;
}
