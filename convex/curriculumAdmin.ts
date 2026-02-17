import { v } from "convex/values";
import { mutation } from "./_generated/server";

function requireInternalKey(args: { internalKey: string }) {
  const expected = process.env.INTERNAL_API_KEY;
  if (!expected) throw new Error("Missing INTERNAL_API_KEY in Convex env");
  if (args.internalKey !== expected) throw new Error("Unauthorized");
}

// One-time seed from the previously hardcoded curriculum in client/src/pages/curriculum.tsx
// Safe to re-run (idempotent): if curricula exist, it does nothing.

export const seedDefault = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("curricula").take(1);
    if (existing.length > 0) {
      return { seeded: false, reason: "already_seeded" } as const;
    }

    const cartoonId = await ctx.db.insert("curricula", {
      slug: "cartoon-hero",
      title: "فارس الكرتون",
      description: "تعلم إنشاء رسوم متحركة باستخدام الذكاء الاصطناعي",
      status: "available",
      imageUrl: "/cartoon-hero.jpeg",
      order: 1,
      // Default: make the first curriculum free. Admin can change later.
      isFree: true,
    });

    const modules = [
      {
        title: "الوحدة 1 — مولد البطل",
        lessons: [
          "مرحبًا بك في دورة بطل الرسوم المتحركة",
          "أدوات الذكاء الاصطناعي الخاصة بالبطل",
          "COURSE MATERIALS v2.0.zip",
          "خريطة مغامرتك (كيف تم تنظيم هذه الدورة)",
          "نار المخيم (مجتمع ديسكورد)",
        ],
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
        ],
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
        ],
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
        ],
      },
      {
        title: "الوحدة 5 - (الإصدار في 27 نوفمبر) PROJECT X",
        lessons: [
          "مقدمة إلى (PROJECT X)",
          "تصميم (PROJECT X)",
          "إنشاء فيديو (PROJECT X)",
          "أفضل برومبتات (PROJECT X)",
          "كيفية إرسال (PROJECT X) الخاص بك",
        ],
      },
      {
        title: "الوحدة 6 - ما بعد الدورة: استمر في الإبداع",
        lessons: [
          "كيفية إنشاء صورة مصدرية جيدة",
          "مطاردة البطل - العثور على الصور المصدرية بسرعة",
          "4 قواعد أساسية للصورة المصدرية",
          "مكتبة الصور المصدرية",
        ],
      },
      {
        title: "دروس إضافية",
        lessons: [
          "أقوى 20 استخدامًا لـ Nano Banana في الرسوم المتحركة بالذكاء الاصطناعي",
          "ورقة برومبتات Nano Banana",
          "سير العمل النهائي لمزامنة الشفاه 1",
          "سير العمل النهائي لمزامنة الشفاه 2",
          "ورقة برومبتات مزامنة الشفاه VEO3",
        ],
      },
    ];

    for (let i = 0; i < modules.length; i++) {
      const m = modules[i];
      const moduleId = await ctx.db.insert("curriculumModules", {
        curriculumId: cartoonId,
        title: m.title,
        order: i + 1,
      });

      for (let j = 0; j < m.lessons.length; j++) {
        const title = m.lessons[j];
        const type = title.includes(".zip")
          ? "file"
          : title.includes("مجتمع") || title.includes("ديسكورد")
            ? "community"
            : "video";

        await ctx.db.insert("curriculumLessons", {
          moduleId,
          title,
          type,
          url: undefined,
          order: j + 1,
        });
      }
    }

    await ctx.db.insert("curricula", {
      slug: "dangerous-builder",
      title: "البنّاء الخطير",
      description: "برنامج تدريبي متقدم لبناء تطبيقات الذكاء الاصطناعي",
      status: "coming-soon",
      imageUrl: undefined,
      order: 2,
      isFree: false,
    });

    return { seeded: true } as const;
  },
});

export const setCurriculumFree = mutation({
  args: {
    slug: v.string(),
    isFree: v.boolean(),
    internalKey: v.string(),
  },
  handler: async (ctx, args) => {
    requireInternalKey(args);

    const curriculum = await ctx.db
      .query("curricula")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!curriculum) throw new Error("Curriculum not found");

    await ctx.db.patch(curriculum._id, { isFree: args.isFree });

    return { slug: args.slug, isFree: args.isFree };
  },
});
