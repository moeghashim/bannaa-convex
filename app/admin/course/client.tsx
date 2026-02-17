"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

type MeResponse = { user: null | { email?: string } };

export default function AdminCourseClient() {
  const sp = useSearchParams();
  const slug = useMemo(() => sp.get("slug") ?? "", [sp]);

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
          window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(
            `/admin/course?slug=${slug}`,
          )}`;
          return;
        }

        if (email !== "moe@bannaa.co") {
          window.location.href = "/";
          return;
        }

        if (!cancelled) setStatus("ok");
      } catch {
        if (!cancelled) setStatus("redirecting");
        window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(
          `/admin/course?slug=${slug}`,
        )}`;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const course = useQuery(
    api.siteCourses.getLatestBySlug,
    slug ? { slug, stage: "draft" } : "skip",
  );

  if (!slug) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1>Admin Course</h1>
        <p>Missing slug.</p>
        <Link href="/admin">Back</Link>
      </main>
    );
  }

  if (status !== "ok") {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1>Admin Course</h1>
        <p>{status === "checking" ? "Checking session…" : "Redirecting…"}</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-display text-xl">Course (Draft)</div>
          <Link
            href="/admin"
            className="font-mono text-sm font-bold hover:underline"
          >
            رجوع للوحة التحكم
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        {course === undefined ? (
          <div className="font-mono text-sm text-gray-600">جاري التحميل…</div>
        ) : course === null ? (
          <div className="font-mono text-sm text-gray-600">
            لا يوجد Draft لهذا الكورس حتى الآن.
          </div>
        ) : (
          <div className="max-w-4xl">
            <div className="bg-white border-2 border-black shadow-brutal p-6 mb-8">
              <div className="font-display text-3xl mb-2">{course.title}</div>
              <div className="font-mono text-xs text-gray-500">
                slug: {course.slug} — version: {course.version}
              </div>
            </div>

            <div className="space-y-6">
              {course.modules
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((m) => (
                  <div
                    key={m.id}
                    className="bg-white border-2 border-black shadow-brutal-sm p-6"
                  >
                    <div className="font-display text-xl mb-4">{m.title}</div>
                    <ul className="space-y-2">
                      {m.lessons.map((l) => (
                        <li
                          key={l.id}
                          className="font-mono flex items-center justify-between gap-3"
                        >
                          <div>
                            <span className="font-bold">L{l.lessonNo}:</span> {l.title} ({l.slug})
                          </div>
                          <Link
                            href={`/admin/courses/${course.slug}/lessons/${l.slug}`}
                            className="border-2 border-black px-3 py-1 font-mono font-bold bg-white hover:bg-gray-50"
                          >
                            Edit Pack
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
