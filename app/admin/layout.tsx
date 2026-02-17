export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Intentionally no server-side auth here.
  // We do client-side auth gating on /admin to keep this route static and avoid SSR hangs.
  return <>{children}</>;
}
