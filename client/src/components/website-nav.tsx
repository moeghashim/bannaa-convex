import Link from "next/link";
import { BrainCog, ArrowRight } from "lucide-react";
import { ApplicationModal } from "@/components/application-modal";

const content = {
  brand: "بنّاء",
  nav: {
    features: "المنهج",
    pricing: "الرسوم",
    about: "رسالتنا",
    login: "بوابة الطلاب",
    getAccess: "قدّم الآن",
  },
};

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
            {content.nav.features}
          </Link>
          <a href="#" className="hover:underline decoration-2 underline-offset-4">
            {content.nav.pricing}
          </a>
          <a href="#" className="hover:underline decoration-2 underline-offset-4">
            {content.nav.about}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden md:block border-2 border-black px-6 py-2 font-bold text-sm hover:bg-black hover:text-white transition-colors uppercase"
          >
            {content.nav.login}
          </Link>

          <ApplicationModal>
            <button className="bg-secondary border-2 border-black px-6 py-2 font-bold text-sm shadow-brutal-sm hover:shadow-brutal transition-all hover:-translate-y-0.5 uppercase flex items-center gap-2">
              {content.nav.getAccess}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </ApplicationModal>
        </div>
      </div>
    </nav>
  );
}
