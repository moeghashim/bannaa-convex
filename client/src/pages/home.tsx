import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Cpu, Terminal, Brain, BrainCog, ArrowRight, Check, AlertCircle, Wrench, Video, Mail, Facebook, Instagram, Github, Youtube, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
    description: "مجموعة الأدوات الجادة للمطورين الذين يقدرون السرعة الخام على الجماليات. ابنِ و أطلق بسرعة.",
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
      ]
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
      ]
    }
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
      "دعم فني للكود 24/7"
    ],
    cta: "قدّم طلب الانضمام"
  },
  footer: {
    newsletter: {
      title: "النشرة البريدية السرية",
      description: "انضم إلى قائمتنا للحصول على أحدث الاستراتيجيات والأدوات قبل الجميع.",
      placeholder: "بريدك الإلكتروني",
      button: "اشترك"
    },
    copyright: "© 2025 بنّاء للذكاء الاصطناعي. جميع الحقوق محفوظة.",
    socials: [
      { 
        name: "Facebook", 
        icon: <Facebook className="w-5 h-5" />, 
        url: "https://www.facebook.com/BannaaTeam" 
      },
      { 
        name: "X", 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>, // Custom X icon
        url: "https://x.com/BannaaTeam" 
      },
      { 
        name: "Instagram", 
        icon: <Instagram className="w-5 h-5" />, 
        url: "https://www.instagram.com/bannaateam/" 
      },
      { 
        name: "GitHub", 
        icon: <Github className="w-5 h-5" />, 
        url: "https://github.com/moeghashim" 
      },
      { 
        name: "TikTok", 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>, 
        url: "https://www.tiktok.com/@bannaateam" 
      },
      { 
        name: "YouTube", 
        icon: <Youtube className="w-5 h-5" />, 
        url: "https://www.youtube.com/@bannaateam" 
      },
    ]
  }
};

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await apiRequest("POST", "/api/leads", { email });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "تم الاشتراك بنجاح",
        description: "أهلاً بك في قائمة النخبة.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في الاشتراك",
        description: error.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutation.mutate(email);
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
            <Link href="/curriculum" className="hover:underline decoration-2 underline-offset-4" data-testid="link-curriculum">
              {content.nav.features}
            </Link>
            <a href="#" className="hover:underline decoration-2 underline-offset-4">{content.nav.pricing}</a>
            <a href="#" className="hover:underline decoration-2 underline-offset-4">{content.nav.about}</a>
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
              <svg className="absolute -z-10 top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-full opacity-20 pointer-events-none" viewBox="0 0 100 20">
                <path d="M0 10 H100" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                <circle cx="10" cy="10" r="2" fill="currentColor" />
                <circle cx="90" cy="10" r="2" fill="currentColor" />
              </svg>
            </span> <br />
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
            <button className="bg-black text-white border-2 border-black px-8 py-4 font-display text-xl tracking-wide rtl:tracking-normal hover:bg-gray-900 shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-1 uppercase flex items-center justify-center gap-3 group">
              <Terminal className="w-6 h-6" />
              {content.hero.ctaPrimary}
            </button>
            <ApplicationModal>
              <button className="bg-white text-black border-2 border-black px-8 py-4 font-display text-xl tracking-wide rtl:tracking-normal hover:bg-gray-50 shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-1 uppercase">
                {content.hero.ctaSecondary}
              </button>
            </ApplicationModal>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t-2 border-black py-12">
            {content.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-display text-5xl md:text-6xl">{stat.value}</span>
                <span className="font-mono text-sm font-bold uppercase text-gray-600 rtl:font-sans">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <div className="border-t-2 border-black py-12 md:py-16">
            {/* Building Tools */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-4 w-4 bg-secondary border-2 border-black flex items-center justify-center">
                   <Wrench className="w-3 h-3 text-black" />
                 </div>
                 <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight rtl:tracking-normal">
                   {content.tools.building.title}
                 </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {content.tools.building.items.map((tool, i) => (
                  <div key={i} className="bg-white border-2 border-black p-6 flex flex-col items-center justify-center gap-4 hover:shadow-brutal transition-all hover:-translate-y-1 group h-32">
                    <div className="w-12 h-12 relative grayscale group-hover:grayscale-0 transition-all duration-300">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-mono font-bold text-sm uppercase tracking-wider">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Tools */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                 <div className="h-4 w-4 bg-black text-white border-2 border-black flex items-center justify-center">
                   <Video className="w-3 h-3" />
                 </div>
                 <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight rtl:tracking-normal">
                   {content.tools.media.title}
                 </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {content.tools.media.items.map((tool, i) => (
                  <div key={i} className="bg-white border-2 border-black p-6 flex flex-col items-center justify-center gap-4 hover:shadow-brutal transition-all hover:-translate-y-1 group h-32">
                    <div className="w-12 h-12 relative grayscale group-hover:grayscale-0 transition-all duration-300">
                      <img 
                        src={tool.logo} 
                        alt={`${tool.name} logo`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-mono font-bold text-sm uppercase tracking-wider">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-t-2 border-black py-12 md:py-24 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 start-0 w-full h-full -z-10 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="flex flex-col md:flex-row gap-12 items-stretch">
              {/* Pricing Info */}
              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="bg-secondary border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase">
                     {content.pricing.badge}
                   </div>
                 </div>
                 
                 <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight">
                   {content.pricing.title}
                 </h2>
                 <p className="font-mono text-lg text-gray-600 mb-8 border-s-4 border-black ps-4 py-1">
                   {content.pricing.subtitle}
                 </p>
                 
                 <div className="flex flex-col gap-4">
                   {content.pricing.features.map((feature, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <div className="w-5 h-5 bg-black text-white flex items-center justify-center rounded-sm">
                         <Check className="w-3 h-3" />
                       </div>
                       <span className="font-bold">{feature}</span>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Pricing Card */}
              <div className="flex-1 md:max-w-md">
                <div className="bg-white border-2 border-black p-8 shadow-brutal hover:shadow-brutal-lg transition-all relative">
                  <div className="absolute -top-4 start-8 bg-black text-white px-4 py-1 font-mono text-sm font-bold transform -rotate-2 border-2 border-white">
                    خصم ٧٥٪
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-7xl">{content.pricing.price}</span>
                    <span className="text-gray-400 text-2xl line-through decoration-2 decoration-red-500 font-bold">{content.pricing.originalPrice}</span>
                  </div>
                  <div className="text-sm font-mono text-gray-500 mb-8">{content.pricing.period}</div>

                  <div className="bg-gray-50 border-2 border-gray-200 p-4 mb-8 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <p className="text-sm text-gray-600 font-medium leading-tight">
                      {content.pricing.applicationNote}
                    </p>
                  </div>

                  <ApplicationModal>
                    <button className="w-full bg-secondary text-black border-2 border-black py-4 font-display text-xl hover:bg-[#b3e600] transition-colors shadow-brutal-sm uppercase">
                      {content.pricing.cta}
                    </button>
                  </ApplicationModal>
                  
                  <div className="mt-4 text-center">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">المقاعد محدودة للغاية</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Newsletter */}
            <div className="w-full max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6" />
                <h3 className="font-display text-2xl uppercase">{content.footer.newsletter.title}</h3>
              </div>
              <p className="font-mono text-gray-600 mb-6 leading-relaxed">
                {content.footer.newsletter.description}
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.footer.newsletter.placeholder} 
                  className="flex-1 bg-gray-50 border-2 border-black px-4 py-3 font-mono focus:outline-none focus:bg-white transition-colors placeholder:text-gray-400"
                  required
                />
                <button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="bg-black text-white border-2 border-black px-8 py-3 font-bold hover:bg-secondary hover:text-black transition-colors uppercase flex items-center justify-center min-w-[120px]"
                >
                  {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : content.footer.newsletter.button}
                </button>
              </form>
            </div>

            {/* Brand & Copyright */}
            <div className="flex flex-col gap-4 items-start md:items-end w-full md:w-auto">
               <div className="flex items-center gap-2">
                  <div className="bg-black text-white p-1">
                    <BrainCog className="w-5 h-5" />
                  </div>
                  <span className="font-display text-xl uppercase tracking-tighter">{content.brand}</span>
               </div>
               <div className="flex flex-wrap gap-4 font-mono text-sm font-bold justify-end">
                 {content.footer.socials.map((social, i) => (
                   <a 
                    key={i}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors p-2 border-2 border-transparent hover:border-black rounded-md"
                    title={social.name}
                   >
                     {social.icon}
                   </a>
                 ))}
               </div>
               <p className="font-mono text-sm text-gray-500 mt-2">{content.footer.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
