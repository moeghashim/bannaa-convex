import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-static";

function readCourseMarkdown(slug: string) {
  const coursesDir = path.join(process.cwd(), "courses");
  const filePath = path.join(coursesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

export default function CourseMarkdownPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const md = readCourseMarkdown(slug);

  if (!md) {
    return (
      <main className="min-h-screen bg-gray-50 font-sans" dir="rtl">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto bg-white border-2 border-black shadow-brutal p-6">
            <div className="font-display text-2xl mb-2">الملف غير موجود</div>
            <p className="font-mono text-sm text-gray-700">
              لم نجد: <code>{slug}.md</code>
            </p>
            <Link
              href="/courses"
              className="inline-block mt-4 border-2 border-black bg-black text-white px-4 py-2 font-bold hover:bg-white hover:text-black transition-colors"
            >
              رجوع
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl">
            Bannaa
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="font-mono text-sm underline hover:no-underline"
            >
              كل الملفات
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white border-2 border-black shadow-brutal p-6">
          <div className="font-display text-2xl mb-4">{slug}</div>

          <article className="space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-display text-3xl mt-6 mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-display text-2xl mt-6 mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-display text-xl mt-5 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="font-mono text-sm text-gray-800 leading-relaxed">
                    {children}
                  </p>
                ),
                li: ({ children }) => (
                  <li className="font-mono text-sm text-gray-800 leading-relaxed">
                    {children}
                  </li>
                ),
                ul: ({ children }) => <ul className="list-disc pr-6 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pr-6 space-y-1">{children}</ol>,
                code: ({ children }) => (
                  <code className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded font-mono text-xs">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="p-3 bg-gray-100 border border-gray-200 rounded overflow-x-auto text-xs">
                    {children}
                  </pre>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="underline hover:no-underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="border-t-2 border-black my-6" />,
              }}
            >
              {md}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const coursesDir = path.join(process.cwd(), "courses");
  if (!fs.existsSync(coursesDir)) return [];
  const files = fs.readdirSync(coursesDir).filter((f) => f.toLowerCase().endsWith(".md"));
  return files.map((file) => ({ slug: file.replace(/\.md$/i, "") }));
}
