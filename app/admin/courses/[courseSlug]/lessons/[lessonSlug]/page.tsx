"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";

type LessonPackResult = {
  course: { slug: string; title: string; stage: string; version: string };
  lesson: { slug: string; lessonNo: number; title: string };
  pack: {
    objectiveMd?: string;
    conceptsMd?: string;
    lessonTextMd?: string;
    slidesMd?: string;
    quizMd?: string;
    homeworkMd?: string;
    rubricMd?: string;
    remotionMd?: string;
  } | null;
};

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-white border-2 border-black shadow-brutal-sm p-5">
      <div className="font-display text-lg mb-3">{label}</div>
      <textarea
        className="w-full min-h-32 border-2 border-black p-3 font-mono text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default function AdminLessonPackPreview({
  params,
}: {
  params: { courseSlug: string; lessonSlug: string };
}) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  const result = useQuery(api.siteCourses.getLessonPack, {
    courseSlug: params.courseSlug,
    stage: "draft",
    lessonSlug: params.lessonSlug,
  }) as LessonPackResult | null | undefined;

  const [objectiveMd, setObjectiveMd] = useState("");
  const [conceptsMd, setConceptsMd] = useState("");
  const [lessonTextMd, setLessonTextMd] = useState("");
  const [slidesMd, setSlidesMd] = useState("");
  const [quizMd, setQuizMd] = useState("");
  const [homeworkMd, setHomeworkMd] = useState("");
  const [rubricMd, setRubricMd] = useState("");
  const [remotionMd, setRemotionMd] = useState("");

  useEffect(() => {
    if (!result?.pack) return;
    setObjectiveMd(result.pack.objectiveMd ?? "");
    setConceptsMd(result.pack.conceptsMd ?? "");
    setLessonTextMd(result.pack.lessonTextMd ?? "");
    setSlidesMd(result.pack.slidesMd ?? "");
    setQuizMd(result.pack.quizMd ?? "");
    setHomeworkMd(result.pack.homeworkMd ?? "");
    setRubricMd(result.pack.rubricMd ?? "");
    setRemotionMd(result.pack.remotionMd ?? "");
  }, [result?.pack]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-display text-xl">Lesson Pack (Draft)</div>
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/courses/${params.courseSlug}`}
              className="font-mono text-sm font-bold hover:underline"
            >
              رجوع للكورس
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        {result === undefined ? (
          <div className="font-mono text-sm text-gray-500">جاري التحميل…</div>
        ) : result === null ? (
          <div className="font-mono text-sm text-gray-500">غير موجود.</div>
        ) : (
          <div className="max-w-4xl space-y-6">
            <div className="bg-white border-2 border-black shadow-brutal p-6">
              <div className="font-display text-2xl mb-1">
                {result.course.title}
              </div>
              <div className="font-mono text-sm">
                L{result.lesson.lessonNo} — {result.lesson.title}
              </div>
              <div className="font-mono text-xs text-gray-500 mt-1">
                stage: {result.course.stage} — version: {result.course.version}
              </div>
            </div>

            <div className="bg-white border-2 border-black shadow-brutal-sm p-5 flex items-center justify-between gap-3">
              <div className="font-mono text-sm text-gray-600">
                احفظ التعديلات في Convex (Draft).
              </div>
              <button
                type="button"
                disabled={saving || !result}
                className="bg-black text-white border-2 border-black px-4 py-2 font-bold hover:bg-secondary hover:text-black transition-colors uppercase disabled:opacity-50"
                onClick={async () => {
                  if (!result) return;
                  try {
                    setSaving(true);
                    const res = await fetch("/api/admin/courses/pack", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        courseId: (result as any).course.id,
                        lessonId: (result as any).lesson.id,
                        objectiveMd,
                        conceptsMd,
                        lessonTextMd,
                        slidesMd,
                        quizMd,
                        homeworkMd,
                        rubricMd,
                        remotionMd,
                      }),
                    });
                    const json = await res.json().catch(() => null);
                    if (!res.ok) {
                      toast({
                        title: "فشل الحفظ",
                        description:
                          (json as any)?.error || "تعذر حفظ Lesson Pack.",
                        variant: "destructive",
                      });
                      return;
                    }
                    toast({ title: "تم الحفظ", description: "تم حفظ التغييرات." });
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                {saving ? "…" : "حفظ"}
              </button>
            </div>

            <Field label="Objective" value={objectiveMd} onChange={setObjectiveMd} />
            <Field label="Core Concepts" value={conceptsMd} onChange={setConceptsMd} />
            <Field label="Lesson Text" value={lessonTextMd} onChange={setLessonTextMd} />
            <Field label="Slides Script" value={slidesMd} onChange={setSlidesMd} />
            <Field label="Quiz" value={quizMd} onChange={setQuizMd} />
            <Field label="Homework" value={homeworkMd} onChange={setHomeworkMd} />
            <Field label="Rubric" value={rubricMd} onChange={setRubricMd} />
            <Field label="Remotion" value={remotionMd} onChange={setRemotionMd} />
          </div>
        )}
      </main>
    </div>
  );
}
