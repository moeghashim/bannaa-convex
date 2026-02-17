import Link from "next/link";
import { ConvexHttpClient } from "convex/browser";
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

export default async function AdminCoursePreview({
  params,
}: {
  params: { slug: string };
}) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
        <main className="container mx-auto px-4 py-10">
          <div className="font-mono text-sm text-red-600">
            Missing NEXT_PUBLIC_CONVEX_URL.
          </div>
        </main>
      </div>
    );
  }

  const client = new ConvexHttpClient(convexUrl);

  let course: Course | null = null;
  try {
    course = (await client.query(api.siteCourses.getLatestBySlug, {
      slug: params.slug,
      stage: "draft",
    })) as Course | null;
  } catch (e: any) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
        <div className="border-b-2 border-black bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="font-display text-xl">معاينة كورس (Draft)</div>
            <Link href="/admin" className="font-mono text-sm font-bold hover:underline">
              رجوع للوحة التحكم
            </Link>
          </div>
        </div>
        <main className="container mx-auto px-4 py-10">
          <div className="font-mono text-sm text-red-600">
            Failed to load course from Convex: {e?.message || String(e)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-display text-xl">معاينة كورس (Draft)</div>
          <Link href="/admin" className="font-mono text-sm font-bold hover:underline">
            رجوع للوحة التحكم
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        {course === null ? (
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
