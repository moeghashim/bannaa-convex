"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MeResponse = { user: null | { email?: string } };

export default function Page() {
  const [status, setStatus] = useState<"checking" | "ok" | "redirecting">(
    "checking",
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = (await res.json()) as MeResponse;
        const email = data?.user?.email?.toLowerCase?.();

        if (!email) {
          if (!cancelled) setStatus("redirecting");
          window.location.href = "/api/auth/login?returnTo=%2Fadmin";
          return;
        }

        if (email !== "moe@bannaa.co") {
          window.location.href = "/";
          return;
        }

        if (!cancelled) setStatus("ok");
      } catch {
        if (!cancelled) setStatus("redirecting");
        window.location.href = "/api/auth/login?returnTo=%2Fadmin";
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status !== "ok") {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1>Admin</h1>
        <p>{status === "checking" ? "Checking session…" : "Redirecting…"}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Admin</h1>

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
