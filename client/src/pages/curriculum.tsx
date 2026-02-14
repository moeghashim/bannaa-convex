import { useEffect } from "react";
import { Link } from "wouter";
import { BrainCog, BookOpen, Lock, Play, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const curriculums = [
  {
    id: "cartoon-hero",
    title: "فارس الكرتون",
    description: "تعلم إنشاء رسوم متحركة باستخدام الذكاء الاصطناعي",
    status: "available",
    image: "/cartoon-hero.jpeg",
    modules: [
      {
        title: "الوحدة 1 — مولد البطل",
        lessons: [
          "مرحبًا بك في دورة بطل الرسوم المتحركة",
          "أدوات الذكاء الاصطناعي الخاصة بالبطل",
          "COURSE MATERIALS v2.0.zip",
          "خريطة مغامرتك (كيف تم تنظيم هذه الدورة)",
          "نار المخيم (مجتمع ديسكورد)",
        ]
      },
      {
        title: "الوحدة 2 — مغامرتك الأولى مع الذكاء الاصطناعي: «Hopeless Steve»",
        lessons: [
          "سحر نماذج الصور بالذكاء الاصطناعي (Nano Banana / Flux)",
          "إنشاء شخصيتك المخصصة بالذكاء الاصطناعي",
          "إنشاء مشاهد بلقطة واحدة باستخدام Grok",
          "ساحة CapCut",
          "رفع دقة فيديوك النهائي",
          "أغنية الشارة الكرتونية الخاصة بك (Suno AI)",
          "سينما مطلقة: أفضل كرتونات «Hopeless Steve»",
        ]
      },
      {
        title: "الوحدة 3 - طريقك نحو الإتقان",
        lessons: [
          "ثلاث طرق لاستخدام Sora 2",
          "اختر طريقك أيها المسافر",
          "أساسيات الفيديوهات متعددة اللقطات باستخدام Sora 2",
          "سر زوايا الكاميرا",
          "إنشاء فيديوهات متقدمة متعددة اللقطات",
          "جعل شخصياتك تتحدث",
          "قوة تقنية كولاج لوحة القصة",
          "3 طرق لإنشاء رسوم متحركة بأي طول",
          "اتساق الصوت باستخدام ElevenLabs",
        ]
      },
      {
        title: "الوحدة 4 - كن بطلًا خارقًا",
        lessons: [
          "كيف تصبح بطلًا خارقًا في الرسوم المتحركة؟",
          "الحلقة التجريبية لـ«Hopeless Steve» (الجزء 1)",
          "الحلقة التجريبية لـ«Hopeless Steve» (الجزء 2)",
          "مسابقة مسلسل كوميدي (اربح 6000 دولار)",
          "الحلقة التجريبية لـ«Fighter Joe» (اربح 1000 دولار)",
          "كرتون أنمي «Isle of Secrets» (Seedance 1.0)",
          "المؤثرات الصوتية: السلاح النهائي",
          "كرتون «The Last Throne» بأسلوب بيكسار (الجزء 1)",
          "كرتون «The Last Throne» بأسلوب بيكسار (الجزء 2)",
        ]
      },
      {
        title: "الوحدة 5 - (الإصدار في 27 نوفمبر) PROJECT X",
        lessons: [
          "مقدمة إلى (PROJECT X)",
          "تصميم (PROJECT X)",
          "إنشاء فيديو (PROJECT X)",
          "أفضل برومبتات (PROJECT X)",
          "كيفية إرسال (PROJECT X) الخاص بك",
        ]
      },
      {
        title: "الوحدة 6 - ما بعد الدورة: استمر في الإبداع",
        lessons: [
          "كيفية إنشاء صورة مصدرية جيدة",
          "مطاردة البطل - العثور على الصور المصدرية بسرعة",
          "4 قواعد أساسية للصورة المصدرية",
          "مكتبة الصور المصدرية",
        ]
      },
      {
        title: "دروس إضافية",
        lessons: [
          "أقوى 20 استخدامًا لـ Nano Banana في الرسوم المتحركة بالذكاء الاصطناعي",
          "ورقة برومبتات Nano Banana",
          "سير العمل النهائي لمزامنة الشفاه 1",
          "سير العمل النهائي لمزامنة الشفاه 2",
          "ورقة برومبتات مزامنة الشفاه VEO3",
        ]
      },
    ]
  },
  {
    id: "dangerous-builder",
    title: "البنّاء الخطير",
    description: "برنامج تدريبي متقدم لبناء تطبيقات الذكاء الاصطناعي",
    status: "coming-soon",
    image: undefined,
    modules: []
  }
];

export default function Curriculum() {
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <nav className="w-full border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <div className="bg-black text-white p-1">
              <BrainCog className="w-6 h-6" />
            </div>
            <h1 className="font-display text-xl md:text-2xl uppercase tracking-tighter rtl:tracking-normal">
              بنّاء
            </h1>
          </Link>
          <Link href="/" className="font-mono text-sm font-bold hover:underline" data-testid="link-back">
            العودة للرئيسية
          </Link>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary border-2 border-black p-2">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight rtl:tracking-normal">المنهج</h1>
            </div>
            <p className="font-mono text-lg text-gray-600 border-s-4 border-black ps-4 py-2">
              استكشف برامجنا التدريبية المتخصصة في بناء التطبيقات بالذكاء الاصطناعي
            </p>
          </div>

          <div className="space-y-8">
            {curriculums.map((curriculum) => (
              <Card 
                key={curriculum.id} 
                className="border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                data-testid={`card-curriculum-${curriculum.id}`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {curriculum.image && (
                      <div className="w-full md:w-48 shrink-0">
                        <div className="bg-white border-2 border-black shadow-brutal-sm overflow-hidden">
                          <img 
                            src={curriculum.image} 
                            alt={curriculum.title}
                            className="w-full h-auto object-contain"
                            data-testid={`img-curriculum-${curriculum.id}`}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="font-display text-3xl md:text-4xl">
                          {curriculum.title}
                        </CardTitle>
                        {curriculum.status === "coming-soon" && (
                          <Badge 
                            variant="outline" 
                            className="bg-yellow-100 border-black text-black font-mono text-xs"
                            data-testid={`badge-coming-soon-${curriculum.id}`}
                          >
                            قريبًا
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="font-mono text-base">
                        {curriculum.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {curriculum.status === "available" ? (
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-3">
                      {curriculum.modules.map((module, moduleIndex) => (
                        <AccordionItem 
                          key={moduleIndex} 
                          value={`module-${moduleIndex}`}
                          className="border-2 border-black bg-white"
                          data-testid={`accordion-module-${moduleIndex}`}
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
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li 
                                  key={lessonIndex}
                                  className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors group"
                                  data-testid={`lesson-${moduleIndex}-${lessonIndex}`}
                                >
                                  <div className="mt-1">
                                    {lesson.includes('.zip') ? (
                                      <FileText className="w-4 h-4 text-gray-500" />
                                    ) : lesson.includes('مجتمع') || lesson.includes('ديسكورد') ? (
                                      <Users className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <Play className="w-4 h-4 text-gray-500 group-hover:text-secondary transition-colors" />
                                    )}
                                  </div>
                                  <span className="font-mono text-sm">{lesson}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
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
            ))}
          </div>

          <div className="mt-12 p-6 bg-white border-2 border-black shadow-brutal">
            <div className="flex items-start gap-4">
              <div className="bg-secondary border-2 border-black p-2 shrink-0">
                <BrainCog className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-display text-xl mb-2">هل أنت مستعد للبدء؟</h3>
                <p className="font-mono text-gray-600 mb-4">
                  انضم إلى برنامجنا التدريبي وابدأ رحلتك في بناء تطبيقات الذكاء الاصطناعي
                </p>
                <Link 
                  href="/"
                  className="inline-block bg-black text-white border-2 border-black px-6 py-3 font-bold hover:bg-secondary hover:text-black transition-colors uppercase"
                  data-testid="button-apply-now"
                >
                  قدّم الآن
                </Link>
              </div>
            </div>
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
