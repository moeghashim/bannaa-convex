"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [addingModule, setAddingModule] = useState(false);
  const [seeding, setSeeding] = useState(false);

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
            <div className="bg-white border-2 border-black shadow-brutal p-6 mb-6">
              <div className="font-display text-3xl mb-2">{course.title}</div>
              <div className="font-mono text-xs text-gray-500">
                slug: {course.slug} — version: {course.version}
              </div>
            </div>

            <div className="bg-white border-2 border-black shadow-brutal-sm p-6 mb-8">
              <div className="font-display text-xl mb-4">إدارة الكورس (Draft)</div>

              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                <input
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  placeholder="عنوان موديول جديد"
                  className="border-2 border-black px-4 py-2 font-mono flex-1"
                />
                <button
                  type="button"
                  disabled={addingModule || !newModuleTitle}
                  className="bg-black text-white border-2 border-black px-4 py-2 font-bold hover:bg-secondary hover:text-black transition-colors uppercase disabled:opacity-50"
                  onClick={async () => {
                    try {
                      setAddingModule(true);
                      const res = await fetch("/api/admin/courses/module", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          courseId: course.id,
                          title: newModuleTitle,
                        }),
                      });
                      const json = await res.json().catch(() => null);
                      if (!res.ok) {
                        toast({
                          title: "فشل إضافة الموديول",
                          description: (json as any)?.error || "تعذر إضافة الموديول.",
                          variant: "destructive",
                        });
                        return;
                      }
                      setNewModuleTitle("");
                      toast({ title: "تم", description: "تمت إضافة الموديول." });
                    } finally {
                      setAddingModule(false);
                    }
                  }}
                >
                  {addingModule ? "…" : "إضافة موديول"}
                </button>

                {course.slug === "ai-age-fund-01" ? (
                  <button
                    type="button"
                    disabled={seeding}
                    className="border-2 border-black px-4 py-2 font-bold bg-secondary hover:opacity-90 disabled:opacity-50"
                    onClick={async () => {
                      try {
                        setSeeding(true);
                        const res = await fetch(
                          "/api/admin/courses/seed/ai-age-fund-01",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ courseId: course.id }),
                          },
                        );
                        const json = await res.json().catch(() => null);
                        if (!res.ok) {
                          toast({
                            title: "فشل إنشاء المنهج",
                            description: (json as any)?.error || "تعذر إنشاء الدروس.",
                            variant: "destructive",
                          });
                          return;
                        }
                        toast({
                          title: "تم إنشاء المنهج",
                          description: `تم إنشاء ${(json as any)?.createdCount ?? 0} درس.`,
                        });
                      } finally {
                        setSeeding(false);
                      }
                    }}
                  >
                    {seeding ? "…" : "Seed AI-AGE-FUND-01 (Outline)"}
                  </button>
                ) : null}
              </div>

              <div className="font-mono text-xs text-gray-500 mt-3">
                ملاحظة: بعد الإضافة/الـ seed، اعمل Refresh للصفحة.
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
                        <li key={l.id} className="font-mono flex items-center justify-between gap-3">
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
