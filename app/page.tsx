import Link from "next/link";
import { WebsiteNav } from "@/components/website-nav";

export const dynamic = "force-static";

const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "https://www.skool.com";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <WebsiteNav />

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white border-2 border-black shadow-brutal p-8 max-w-3xl">
          <h1 className="font-display text-4xl mb-3">Bannaa</h1>
          <p className="font-mono text-sm text-gray-700 leading-relaxed">
            الموقع الآن Front-end فقط. التسجيل، المجتمع، والمحتوى داخل Skool.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/curriculum"
              className="border-2 border-black px-4 py-2 font-bold bg-white hover:bg-gray-50"
            >
              المنهج
            </Link>
            <a
              href={skoolUrl}
              target="_blank"
              rel="noreferrer"
              className="border-2 border-black px-4 py-2 font-bold bg-black text-white hover:bg-white hover:text-black transition-colors"
            >
              دخول Skool
            </a>
            <Link
              href="/blog"
              className="border-2 border-black px-4 py-2 font-bold bg-white hover:bg-gray-50"
            >
              المدونة
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
