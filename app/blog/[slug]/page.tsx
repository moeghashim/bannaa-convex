import Link from "next/link";

export const dynamic = "force-static";

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="bg-white border-2 border-black shadow-brutal-sm p-4">
      <div className="font-mono text-xs mb-2">YouTube</div>
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full border-2 border-black"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="bg-white border-2 border-black shadow-brutal-sm">
      <div className="border-b-2 border-black px-4 py-2 font-mono text-xs bg-gray-50">
        code
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

const posts: Record<
  string,
  {
    title: string;
    date: string;
    excerpt: string;
    videoId?: string;
    code?: string;
    sections: Array<{ heading: string; body: string }>;
  }
> = {
  "sample-post": {
    title: "مثال تدوينة: من فكرة إلى نموذج أولي خلال ساعة",
    date: "2026-02-17",
    excerpt:
      "صفحة تجريبية للتدوينة: أسلوب Brutal + كود + فيديو يوتيوب مضمن. الهدف: نثبت الشكل والبنية قبل CMS.",
    videoId: "BYxF-svDl8Q",
    code: `// Example: a tiny Next.js route handler\n// app/api/hello/route.ts\n\nimport { NextResponse } from \"next/server\";\n\nexport async function GET() {\n  return NextResponse.json({ ok: true, message: \"hello Bannaa\" });\n}\n`,
    sections: [
      {
        heading: "الفكرة",
        body: "عايزين صفحة Blog بسيطة لكن قابلة للتوسع: عنوان، تاريخ، فقرة قصيرة، محتوى، كود، وفيديو. ده كفاية كبداية.",
      },
      {
        heading: "نقطة مهمة",
        body: "لو هتستخدم AI في كتابة التدوينات، خلي عندك معيار جودة ثابت: (هدف التدوينة) + (الجمهور) + (شكل الإخراج) + (أمثلة).",
      },
    ],
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 font-sans" dir="rtl">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-white border-2 border-black shadow-brutal p-6">
            <div className="font-display text-2xl">التدوينة غير موجودة</div>
            <p className="font-mono text-sm mt-3">slug: {params.slug}</p>
            <Link href="/blog" className="inline-block mt-4 font-mono font-bold underline">
              رجوع للمدونة
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
          <Link href="/blog" className="font-mono text-sm font-bold hover:underline">
            المدونة
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <article className="max-w-3xl mx-auto space-y-6">
          <header className="bg-white border-2 border-black shadow-brutal p-6">
            <div className="font-display text-3xl mb-2">{post.title}</div>
            <div className="font-mono text-xs text-gray-500">{post.date}</div>
            <p className="font-mono text-sm mt-4 text-gray-700">{post.excerpt}</p>
          </header>

          {post.videoId ? <YouTubeEmbed videoId={post.videoId} /> : null}
          {post.code ? <CodeBlock code={post.code} /> : null}

          {post.sections.map((s) => (
            <section
              key={s.heading}
              className="bg-white border-2 border-black shadow-brutal-sm p-6"
            >
              <h2 className="font-display text-xl mb-3">{s.heading}</h2>
              <p className="font-mono text-sm leading-relaxed text-gray-700">{s.body}</p>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
