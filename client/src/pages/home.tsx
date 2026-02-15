import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cpu,
  Terminal,
  Brain,
  BrainCog,
  ArrowRight,
  Check,
  AlertCircle,
  Wrench,
  Video,
  Mail,
  Facebook,
  Instagram,
  Github,
  Youtube,
  Loader2,
} from "lucide-react";
import { useMutation as useConvexMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
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
  hero: {
    beta: "الدفعة ٠١: التسجيل متاح",
    line1: "إبدأ الآن",
    line2: "أو مُت",
    line3: "بحسرة الإنتظار.",
    description:
      "مجموعة الأدوات الجادة للمطورين الذين يقدرون السرعة الخام على الجماليات. ابنِ و أطلق بسرعة.",
    ctaPrimary: "تصفح المنهج",
    ctaSecondary: "القبول والتسجيل",
  },
  stats: [
    { label: "ساعة برمجة", value: "٤٠٠+" },
    { label: "مشروع حقيقي", value: "١٢" },
    { label: "جاهزية للعمل", value: "١٠٠٪" },
  ],
  tools: {
    building: {
      title: "أدوات البناء",
      items: [
        { name: "Replit", logo: "/logos/replit.svg" },
        { name: "Cursor", logo: "/logos/cursor.svg" },
        { name: "Gemini", logo: "/logos/gemini.svg" },
        { name: "Make", logo: "/logos/make.svg" },
        { name: "N8N", logo: "/logos/n8n.svg" },
        { name: "Claude", logo: "/logos/claude.svg" },
        { name: "V0", logo: "/logos/v0.svg" },
        { name: "ChatGPT", logo: "/logos/chatgpt.svg" },
      ],
    },
    media: {
      title: "أدوات الإنتاج الإعلامي",
      items: [
        { name: "Elevenlabs", logo: "/logos/elevenlabs.svg" },
        { name: "Sora", logo: "/logos/sora.svg" },
        { name: "Grok", logo: "/logos/grok.svg" },
        { name: "Nanobanana", logo: "/logos/nanobanana.svg" },
        { name: "Krea", logo: "/logos/krea.svg" },
        { name: "Luma AI", logo: "/logos/luma.svg" },
        { name: "Midjourney", logo: "/logos/midjourney.svg" },
        { name: "Runway", logo: "/logos/runway.svg" },
      ],
    },
  },
  pricing: {
    title: "انضم إلى النخبة",
    subtitle: "نحن لا نبيع كورسات. بل نؤهِّل جيلاََ من البنّائين.",
    originalPrice: "$39",
    price: "$9",
    period: "/ اشتراك",
    badge: "الدفعة الأولى فقط",
    applicationNote: "نظام القبول: قائم على تقديم الطلب والموافقة",
    features: [
      "وصول كامل للمنهج الدراسي",
      "توجيه مباشر من الخبراء",
      "مجتمع مغلق للمطورين",
      "شهادة إتمام معتمدة",
      "دعم فني للكود 24/7",
    ],
    cta: "قدّم طلب الانضمام",
  },
  footer: {
    newsletter: {
      title: "النشرة البريدية السرية",
      description:
        "انضم إلى قائمتنا للحصول على أحدث الاستراتيجيات والأدوات قبل الجميع.",
      placeholder: "بريدك الإلكتروني",
      button: "اشترك",
    },
    copyright: "© 2025 بنّاء للذكاء الاصطناعي. جميع الحقوق محفوظة.",
    socials: [
      {
        name: "Facebook",
        icon: <Facebook className="w-5 h-5" />,
        url: "https://www.facebook.com/BannaaTeam",
      },
      {
        name: "X",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
        ), // Custom X icon
        url: "https://x.com/BannaaTeam",
      },
      {
        name: "Instagram",
        icon: <Instagram className="w-5 h-5" />,
        url: "https://www.instagram.com/bannaateam/",
      },
      {
        name: "GitHub",
        icon: <Github className="w-5 h-5" />,
        url: "https://github.com/moeghashim",
      },
      {
        name: "TikTok",
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </svg>
        ),
        url: "https://www.tiktok.com/@bannaateam",
      },
      {
        name: "YouTube",
        icon: <Youtube className="w-5 h-5" />,
        url: "https://www.youtube.com/@bannaateam",
      },
    ],
  },
};

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const subscribe = useConvexMutation(api.leads.subscribe);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    try {
      setSubmitting(true);
      await subscribe({ email });

      toast({
        title: "تم الاشتراك بنجاح",
        description: "أهلاً بك في قائمة النخبة.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "خطأ في الاشتراك",
        description: error?.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Force RTL direction for Arabic only site
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col relative font-sans">
      {/* Navbar */}
      <nav className="w-full border-b-2 border-black bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-1">
              <BrainCog className="w-6 h-6" />
            </div>
            <h1 className="font-display text-xl md:text-2xl uppercase tracking-tighter rtl:tracking-normal">
              {content.brand}
            </h1>
          </div>

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
            <button className="hidden md:block border-2 border-black px-6 py-2 font-bold text-sm hover:bg-black hover:text-white transition-colors uppercase">
              {content.nav.login}
            </button>
            <ApplicationModal>
              <button className="bg-secondary border-2 border-black px-6 py-2 font-bold text-sm shadow-brutal-sm hover:shadow-brutal transition-all hover:-translate-y-0.5 uppercase flex items-center gap-2">
                {content.nav.getAccess}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </ApplicationModal>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 flex flex-col justify-center py-20 md:py-24">
        <div className="max-w-5xl relative">
          {/* Decorative element above headline */}
          <div className="absolute -top-16 start-0 bg-black text-white px-3 py-1 font-mono text-sm transform rtl:rotate-1 ltr:-rotate-1 border-2 border-transparent flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {content.hero.beta}
          </div>

          <h1 className="font-display text-6xl md:text-9xl leading-[0.9] tracking-tighter rtl:tracking-normal mb-8">
            {content.hero.line1} <br />
            <span className="text-stroke text-white relative">
              {content.hero.line2}
              {/* Circuit decoration */}
              <svg
                className="absolute -z-10 top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-full opacity-20 pointer-events-none"
                viewBox="0 0 100 20"
              >
                <path
                  d="M0 10 H100"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                />
                <circle cx="10" cy="10" r="2" fill="currentColor" />
                <circle cx="90" cy="10" r="2" fill="currentColor" />
              </svg>
            </span>{" "}
            <br />
            {content.hero.line3}
          </h1>

          <div className="grid md:grid-cols-5 gap-8 mb-12 items-start">
            <div className="md:col-span-3 bg-white border-s-4 border-secondary ps-6 py-2">
              <p className="font-mono text-lg md:text-xl leading-relaxed font-bold text-gray-800 rtl:font-sans rtl:font-bold">
                {content.hero.description}
              </p>
            </div>

            {/* Code snippet decoration */}
            <div className="hidden md:block md:col-span-2 bg-black p-4 border-2 border-black shadow-brutal-sm transform rotate-1">
              <div className="flex gap-1.5 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="font-mono text-xs text-green-400 overflow-hidden">
                <code>
                  {`class BennaStudent:\n  def build(self):\n    knowledge = load()\n    future = deploy()\n    return future`}
                </code>
              </pre>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-20">
            <Link
              href="/curriculum"
              className="brutal-btn brutal-btn-primary flex items-center justify-center gap-2"
              data-testid="button-curriculum"
            >
              <Terminal className="w-5 h-5" />
              {content.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </Link>

            <ApplicationModal>
              <button
                className="brutal-btn brutal-btn-accent flex items-center justify-center gap-2"
                data-testid="button-apply"
              >
                <Cpu className="w-5 h-5" />
                {content.hero.ctaSecondary}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </ApplicationModal>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-24">
            {content.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-black p-4 md:p-6 shadow-brutal-sm hover:shadow-brutal transition-shadow"
              >
                <div className="font-display text-3xl md:text-5xl mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-xs md:text-sm uppercase tracking-wider rtl:tracking-normal">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-secondary p-2 border-2 border-black">
                <Wrench className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter rtl:tracking-normal">
                {content.tools.building.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {content.tools.building.items.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black p-4 flex items-center gap-3 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all"
                >
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-mono text-sm font-bold">{tool.name}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="bg-secondary p-2 border-2 border-black">
                <Video className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter rtl:tracking-normal">
                {content.tools.media.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.tools.media.items.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black p-4 flex items-center gap-3 shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all"
                >
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-mono text-sm font-bold">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-secondary p-2 border-2 border-black">
                <Brain className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter rtl:tracking-normal">
                {content.pricing.title}
              </h2>
            </div>

            <p className="font-mono text-lg md:text-xl mb-10 bg-white inline-block px-4 py-2 border-2 border-black">
              {content.pricing.subtitle}
            </p>

            <div className="bg-white border-4 border-black shadow-brutal-lg p-8 md:p-10 max-w-2xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="inline-block bg-secondary px-3 py-1 text-sm font-bold uppercase border-2 border-black mb-4">
                    {content.pricing.badge}
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-6xl">{content.pricing.price}</span>
                    <span className="font-mono text-xl">{content.pricing.period}</span>
                    <span className="font-mono text-lg line-through text-gray-500">
                      {content.pricing.originalPrice}
                    </span>
                  </div>
                </div>

                <div className="bg-black text-white px-4 py-2 font-mono text-sm">
                  {content.pricing.applicationNote}
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {content.pricing.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-secondary border-2 border-black p-1 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-base md:text-lg rtl:font-sans rtl:font-bold">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <ApplicationModal>
                <button
                  className="w-full brutal-btn brutal-btn-primary flex items-center justify-center gap-2 text-lg"
                  data-testid="button-apply-pricing"
                >
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                  {content.pricing.cta}
                </button>
              </ApplicationModal>

              <div className="mt-6 p-4 bg-gray-50 border-2 border-black">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 text-black" />
                  <p className="font-mono text-sm rtl:font-sans">
                    القبول محدود ويتم بناءً على جودة الطلب.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-24 max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-secondary p-2 border-2 border-black">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter rtl:tracking-normal">
                {content.footer.newsletter.title}
              </h2>
            </div>

            <p className="font-mono text-lg mb-6 rtl:font-sans rtl:font-bold">
              {content.footer.newsletter.description}
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder={content.footer.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-2 border-black px-6 py-4 font-mono text-lg focus:outline-none focus:ring-0"
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="brutal-btn brutal-btn-accent flex items-center justify-center gap-2"
                data-testid="button-subscribe"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {content.footer.newsletter.button}
              </button>
            </form>
          </div>

          {/* Footer */}
          <footer className="border-t-2 border-black pt-12 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="font-mono text-sm rtl:font-sans rtl:font-bold">
                {content.footer.copyright}
              </div>

              <div className="flex items-center gap-4">
                {content.footer.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
