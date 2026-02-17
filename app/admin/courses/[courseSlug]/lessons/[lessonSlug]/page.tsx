"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";

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

function Section({ title, body }: { title: string; body?: string }) {
  if (!body) return null;
  return (
    <div className="bg-white border-2 border-black shadow-brutal-sm p-5">
      <div className="font-display text-lg mb-3">{title}</div>
      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
        {body}
      </pre>
    </div>
  );
}

export default function AdminLessonPackPreview({
  params,
}: {
  params: { courseSlug: string; lessonSlug: string };
}) {
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  const result = useQuery(api.siteCourses.getLessonPack, {
    courseSlug: params.courseSlug,
    stage: "draft",
    lessonSlug: params.lessonSlug,
  }) as LessonPackResult | null | undefined;

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

            {result.pack ? (
              <>
                <Section title="Objective" body={result.pack.objectiveMd} />
                <Section title="Core Concepts" body={result.pack.conceptsMd} />
                <Section title="Lesson Text" body={result.pack.lessonTextMd} />
                <Section title="Slides Script" body={result.pack.slidesMd} />
                <Section title="Quiz" body={result.pack.quizMd} />
                <Section title="Homework" body={result.pack.homeworkMd} />
                <Section title="Rubric" body={result.pack.rubricMd} />
                <Section title="Remotion" body={result.pack.remotionMd} />
              </>
            ) : (
              <div className="font-mono text-sm text-gray-500">
                لا يوجد Lesson Pack لهذا الدرس (موجود حالياً لـ L1 فقط).
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
