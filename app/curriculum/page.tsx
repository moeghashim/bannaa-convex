import Link from "next/link";

export const dynamic = "force-static";

const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "https://www.skool.com";

export default function CurriculumPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <div className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl">
            Bannaa
          </Link>
          <div className="font-mono text-sm font-bold">المنهج</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white border-2 border-black shadow-brutal p-6">
            <div className="font-display text-3xl mb-2">المنهج على Skool</div>
            <p className="font-mono text-sm text-gray-700 leading-relaxed">
              الموقع هنا Front-end فقط. المحتوى، المجتمع، والتسجيل موجودين على
              Skool.
            </p>
            <a
              href={skoolUrl}
              className="inline-block mt-5 border-2 border-black bg-black text-white px-4 py-2 font-bold hover:bg-white hover:text-black transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              فتح Skool
            </a>
          </div>

          <div className="bg-white border-2 border-black shadow-brutal-sm p-6">
            <div className="font-display text-xl mb-2">ملاحظة</div>
            <p className="font-mono text-sm text-gray-700 leading-relaxed">
              لو تحب نعرض Preview بسيط للمنهج هنا (بدون تسجيل دخول)، نقدر نضيف
              صفحة ثابتة.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
