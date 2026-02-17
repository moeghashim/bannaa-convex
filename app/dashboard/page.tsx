"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SessionResponse = {
  user?: {
    name?: string;
    email?: string;
    sub?: string;
  };
};

export default function DashboardPage() {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        const json = (await res.json()) as SessionResponse;
        if (!cancelled) setSession(json);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <nav className="w-full border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl">
            بنّاء
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/api/auth/logout"
              className="font-mono text-sm font-bold hover:underline"
            >
              تسجيل الخروج
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl mb-4">بوابة الطلاب</h1>

        {loading ? (
          <p className="font-mono">جارٍ التحميل…</p>
        ) : (
          <div className="bg-white border-2 border-black shadow-brutal p-6">
            <p className="font-mono mb-6">
              مرحبًا{session?.user?.name ? `، ${session.user.name}` : ""}.
              {session?.user?.email ? ` (${session.user.email})` : ""}
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/curriculum"
                className="inline-block bg-black text-white border-2 border-black px-6 py-3 font-bold hover:bg-secondary hover:text-black transition-colors uppercase text-center"
              >
                تصفح المنهج
              </Link>
              <Link
                href="/"
                className="inline-block bg-white border-2 border-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors uppercase text-center"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
