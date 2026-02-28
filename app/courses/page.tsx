import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

export const dynamic = "force-static";

function getCourseFiles() {
  const coursesDir = path.join(process.cwd(), "courses");
  if (!fs.existsSync(coursesDir)) return [] as string[];
  return fs
    .readdirSync(coursesDir)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));
}

export default function CoursesIndexPage() {
  const files = getCourseFiles();

  return (
    <main className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl">
            Bannaa
          </Link>
          <div className="font-mono text-sm font-bold">كورسات (Preview)</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white border-2 border-black shadow-brutal p-6">
            <div className="font-display text-3xl mb-2">مواد الكورسات (Markdown)</div>
            <p className="font-mono text-sm text-gray-700 leading-relaxed">
              دي معاينة بسيطة للـ MD files الموجودة في repo تحت فولدر <code>courses/</code>.
            </p>
          </div>

          <div className="bg-white border-2 border-black shadow-brutal-sm p-6">
            <div className="font-display text-xl mb-4">الملفات</div>
            {files.length === 0 ? (
              <p className="font-mono text-sm text-gray-700">لا توجد ملفات.</p>
            ) : (
              <ul className="space-y-2">
                {files.map((file) => {
                  const slug = file.replace(/\.md$/i, "");
                  return (
                    <li key={file}>
                      <Link
                        className="font-mono text-sm underline hover:no-underline"
                        href={`/courses/${encodeURIComponent(slug)}`}
                      >
                        {file}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="bg-white border-2 border-black shadow-brutal-sm p-6">
            <div className="font-display text-xl mb-2">ملاحظة</div>
            <p className="font-mono text-sm text-gray-700 leading-relaxed">
              الهدف هنا review سريع للشكل والمحتوى. لاحقًا نقدر نحول نفس المحتوى
              لصفحات كورس “structured” (lessons/quizzes) على Convex.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
