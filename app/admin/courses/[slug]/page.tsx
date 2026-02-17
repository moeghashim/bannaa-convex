"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type Course = {
  id: string;
  slug: string;
  title: string;
  stage: "draft" | "published";
  version: string;
  createdAt: number;
  modules: {
    id: string;
    title: string;
    order: number;
    lessons: {
      id: string;
      slug: string;
      lessonNo: number;
      title: string;
      order: number;
    }[];
  }[];
};

export default function AdminCoursePreview({
  params,
}: {
  params: { slug: string };
}) {
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  const course = useQuery(api.siteCourses.getLatestBySlug, {
    slug: params.slug,
    stage: "draft",
  }) as Course | null | undefined;

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-display text-xl">معاينة كورس (Draft)</div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="font-mono text-sm font-bold hover:underline"
            >
              رجوع للوحة التحكم
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        {course === undefined ? (
          <div className="font-mono text-sm text-gray-500">جاري التحميل…</div>
        ) : course === null ? (
          <div className="font-mono text-sm text-gray-500">
            لم يتم العثور على Draft لهذا الكورس. جرّب "مزامنة من الماركداون" من /admin.
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
                        <li key={l.id} className="font-mono">
                          <span className="font-bold">L{l.lessonNo}:</span> {l.title} ({l.slug})
                        </li>
                      ))}
                    </ul>

                    {/* quick access to L1 pack if present */}
                    {m.lessons.some((l) => l.slug === "l1") ? (
                      <div className="mt-4">
                        <Link
                          href={`/admin/courses/${course.slug}/lessons/l1`}
                          className="inline-block border-2 border-black px-4 py-2 font-mono font-bold bg-secondary"
                        >
                          عرض Lesson Pack (L1)
                        </Link>
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
