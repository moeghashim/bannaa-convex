import Link from "next/link";
import { BrainCog, ArrowRight } from "lucide-react";

const content = {
  brand: "بنّاء",
  nav: {
    curriculum: "المنهج",
    blog: "المدونة",
    skool: "Skool",
  },
};

const skoolUrl = process.env.NEXT_PUBLIC_SKOOL_URL || "https://www.skool.com";

export function WebsiteNav() {
  return (
    <nav className="w-full border-b-2 border-black bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-black text-white p-1">
            <BrainCog className="w-6 h-6" />
          </div>
          <h1 className="font-display text-xl md:text-2xl uppercase tracking-tighter rtl:tracking-normal">
            {content.brand}
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm font-bold tracking-tight rtl:tracking-normal">
          <Link
            href="/curriculum"
            className="hover:underline decoration-2 underline-offset-4"
            data-testid="link-curriculum"
          >
            {content.nav.curriculum}
          </Link>
          <Link href="/blog" className="hover:underline decoration-2 underline-offset-4">
            {content.nav.blog}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={skoolUrl}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-black px-6 py-2 font-bold text-sm bg-black text-white hover:bg-white hover:text-black transition-colors uppercase flex items-center gap-2"
          >
            {content.nav.skool}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </nav>
  );
}
