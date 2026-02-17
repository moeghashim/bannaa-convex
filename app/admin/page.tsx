import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Page() {
  // Keep this page server-rendered to avoid client-side hangs.
  // Admin UI panels can be reintroduced as isolated client components later.
  return (
    <main style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Admin</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        Admin shell (server-rendered). If this loads reliably, we’ll re-add the
        richer client UI next.
      </p>

      <div style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Courses</h2>
        <ul style={{ marginTop: 8, lineHeight: 1.8 }}>
          <li>
            <Link href="/admin/courses/ai-age-fund-01">AI-AGE-FUND-01 (draft)</Link>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Debug</h2>
        <ul style={{ marginTop: 8, lineHeight: 1.8 }}>
          <li>
            <a href="/api/me" target="_blank" rel="noreferrer">
              /api/me
            </a>
          </li>
          <li>
            <a href="/api/admin/courses/debug" target="_blank" rel="noreferrer">
              /api/admin/courses/debug
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
