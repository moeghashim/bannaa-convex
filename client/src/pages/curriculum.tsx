import { useEffect, useMemo, useState } from "react";
import { BookOpen, Lock, Play, FileText, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WebsiteNav } from "@/components/website-nav";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

type Plan = "free" | "paid";

type CurriculumRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
  imageUrl?: string;
  order: number;
  isFree: boolean;
};

type CurriculumDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "available" | "coming-soon";
  imageUrl?: string;
  order: number;
  isFree: boolean;
  modules: {
    id: string;
    title: string;
    order: number;
    lessons: {
      id: string;
      title: string;
      type: "video" | "file" | "community" | "text";
      url?: string;
      order: number;
    }[];
  }[];
};

export default function Curriculum() {
  const curricula = useQuery(api.curriculum.listPublic) as
    | CurriculumRow[]
    | undefined;

  const [plan, setPlan] = useState<Plan>("free");
  const [planLoading, setPlanLoading] = useState(true);

  // Force RTL direction
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me/plan", { credentials: "include" });
        if (!res.ok) return;
        const json = (await res.json()) as { plan?: Plan };
        if (!cancelled && json.plan) setPlan(json.plan);
      } finally {
        if (!cancelled) setPlanLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const isPaid = plan === "paid";

  const sorted = useMemo(() => {
    return (curricula ?? []).slice().sort((a, b) => a.order - b.order);
  }, [curricula]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <WebsiteNav />

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary border-2 border-black p-2">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight rtl:tracking-normal">
                المنهج
              </h1>
            </div>
            <p className="font-mono text-lg text-gray-600 border-s-4 border-black ps-4 py-2">
              استكشف برامجنا التدريبية المتخصصة في بناء التطبيقات بالذكاء الاصطناعي
            </p>

            <div className="mt-4 font-mono text-xs text-gray-500">
              {planLoading ? (
                "جاري تحديد الخطة…"
              ) : (
                <>
                  خطتك الحالية: <span className="font-bold">{plan}</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {sorted.map((curriculum) => {
              const locked =
                curriculum.status === "available" && !isPaid && !curriculum.isFree;

              // Only fetch full detail when unlocked (avoid wasted queries)
              const detail = useQuery(
                api.curriculum.getBySlug,
                locked ? "skip" : { slug: curriculum.slug },
              ) as CurriculumDetail | null | undefined;

              return (
                <Card
                  key={curriculum.id}
                  className="border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                  data-testid={`card-curriculum-${curriculum.slug}`}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      {curriculum.imageUrl ? (
                        <div className="w-full md:w-48 shrink-0">
                          <div className="bg-white border-2 border-black shadow-brutal-sm overflow-hidden">
                            <img
                              src={curriculum.imageUrl}
                              alt={curriculum.title}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        </div>
                      ) : null}

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <CardTitle className="font-display text-3xl md:text-4xl">
                            {curriculum.title}
                          </CardTitle>

                          {curriculum.status === "coming-soon" ? (
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 border-black text-black font-mono text-xs"
                            >
                              قريبًا
                            </Badge>
                          ) : null}

                          {curriculum.status === "available" ? (
                            curriculum.isFree ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 border-black text-black font-mono text-xs"
                              >
                                مجاني
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-gray-100 border-black text-black font-mono text-xs"
                              >
                                مدفوع
                              </Badge>
                            )
                          ) : null}
                        </div>

                        <CardDescription className="font-mono text-base">
                          {curriculum.description}
                        </CardDescription>

                        {locked ? (
                          <div className="mt-4 flex items-center gap-3">
                            <div className="inline-flex items-center gap-2 font-mono text-sm border-2 border-black px-3 py-2 bg-white">
                              <Lock className="w-4 h-4" />
                              هذا المنهج متاح للمشتركين فقط
                            </div>
                            <Link
                              href="/dashboard"
                              className="inline-block bg-black text-white border-2 border-black px-4 py-2 font-bold hover:bg-secondary hover:text-black transition-colors uppercase"
                            >
                              ترقية الخطة
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </CardHeader>

                  {curriculum.status === "available" ? (
                    <CardContent>
                      {locked ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <div className="bg-gray-100 border-2 border-black p-6 rounded-lg mb-4">
                            <Lock className="w-12 h-12 text-gray-400 mx-auto" />
                          </div>
                          <h3 className="font-display text-2xl mb-2">
                            محتوى مقفل
                          </h3>
                          <p className="font-mono text-gray-600 mb-4">
                            قم بالترقية للوصول إلى هذا المنهج.
                          </p>
                          <Link
                            href="/dashboard"
                            className="inline-block bg-black text-white border-2 border-black px-6 py-3 font-bold hover:bg-secondary hover:text-black transition-colors uppercase"
                          >
                            ترقية الخطة
                          </Link>
                        </div>
                      ) : detail === undefined ? (
                        <div className="font-mono text-sm text-gray-500">
                          جاري التحميل…
                        </div>
                      ) : detail?.modules?.length ? (
                        <Accordion type="single" collapsible className="space-y-3">
                          {detail.modules
                            .slice()
                            .sort((a, b) => a.order - b.order)
                            .map((module, moduleIndex) => (
                              <AccordionItem
                                key={module.id}
                                value={`module-${module.id}`}
                                className="border-2 border-black bg-white"
                              >
                                <AccordionTrigger className="px-4 hover:bg-gray-50 font-bold text-right">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-display text-sm">
                                      {moduleIndex + 1}
                                    </div>
                                    <span>{module.title}</span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 pt-2">
                                  <ul className="space-y-2">
                                    {module.lessons
                                      .slice()
                                      .sort((a, b) => a.order - b.order)
                                      .map((lesson) => (
                                        <li
                                          key={lesson.id}
                                          className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors group"
                                        >
                                          <div className="mt-1">
                                            {lesson.type === "file" ? (
                                              <FileText className="w-4 h-4 text-gray-500" />
                                            ) : lesson.type === "community" ? (
                                              <Users className="w-4 h-4 text-gray-500" />
                                            ) : (
                                              <Play className="w-4 h-4 text-gray-500 group-hover:text-secondary transition-colors" />
                                            )}
                                          </div>
                                          <span className="font-mono text-sm">
                                            {lesson.title}
                                          </span>
                                        </li>
                                      ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                        </Accordion>
                      ) : (
                        <div className="font-mono text-sm text-gray-500">
                          لا يوجد محتوى بعد.
                        </div>
                      )}
                    </CardContent>
                  ) : (
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-gray-100 border-2 border-black p-6 rounded-lg mb-4">
                          <Lock className="w-12 h-12 text-gray-400 mx-auto" />
                        </div>
                        <h3 className="font-display text-2xl mb-2">قريبًا</h3>
                        <p className="font-mono text-gray-600">
                          هذا البرنامج التدريبي قيد التطوير حاليًا
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-black bg-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-sm text-gray-500">
            © 2025 بنّاء. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
