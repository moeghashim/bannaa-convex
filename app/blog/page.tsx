import Link from "next/link";

export const dynamic = "force-static";

const items = [
  {
    slug: "sample-post",
    title: "مثال تدوينة: من فكرة إلى نموذج أولي خلال ساعة",
    excerpt: "صفحة تجريبية للتدوينة: أسلوب Brutal + كود + فيديو يوتيوب مضمن.",
    date: "2026-02-17",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl">
            Bannaa
          </Link>
          <div className="font-mono text-sm font-bold">المدونة</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block bg-white border-2 border-black shadow-brutal-sm p-6 hover:bg-gray-50"
            >
              <div className="font-display text-2xl mb-2">{p.title}</div>
              <div className="font-mono text-xs text-gray-500">{p.date}</div>
              <p className="font-mono text-sm mt-3 text-gray-700">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
