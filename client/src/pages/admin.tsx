import Link from "next/link";
import {
  BrainCog,
  Loader2,
  Mail,
  Github,
  Linkedin,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

type LeadRow = {
  id: string;
  email: string;
  createdAt: number;
};

type ApplicationRow = {
  id: string;
  name: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  experienceLevel: string;
  motivation: string;
  status?: string;
  createdAt: number;
};

type CurriculumRow = {
  id: string;
  slug: string;
  title: string;
  status: "available" | "coming-soon";
  order: number;
  isFree: boolean;
};

type SiteCourseRow = {
  id: string;
  slug: string;
  title: string;
  stage: "draft" | "published";
  version: string;
  createdAt: number;
  sourcePath?: string;
};

export default function AdminDashboard() {
  // Force RTL direction
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  const leads = useQuery(api.admin.listLeads) as LeadRow[] | undefined;
  const applications = useQuery(
    api.admin.listApplications,
  ) as ApplicationRow[] | undefined;
  const curricula = useQuery(api.curriculum.listPublic) as
    | CurriculumRow[]
    | undefined;

  const draftCourses = useQuery(api.siteCourses.listByStage, {
    stage: "draft",
  }) as SiteCourseRow[] | undefined;

  const [planEmail, setPlanEmail] = useState("");
  const [planValue, setPlanValue] = useState<"free" | "paid">("free");
  const [savingPlan, setSavingPlan] = useState(false);

  const [syncingCourses, setSyncingCourses] = useState(false);
  const [publishingSlug, setPublishingSlug] = useState<string | null>(null);
  const [publishVersion, setPublishVersion] = useState("v0.1");

  const isLoadingLeads = leads === undefined;
  const isLoadingApps = applications === undefined;

  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <nav className="w-full border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-1">
              <BrainCog className="w-5 h-5" />
            </div>
            <span className="font-display text-xl uppercase tracking-tighter">
              لوحة التحكم
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-sm font-bold hover:underline"
          >
            العودة للرئيسية
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl">نظرة عامة</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card
            className="border-2 border-black shadow-brutal-sm"
            data-testid="card-stats-leads"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-mono">
                إجمالي المشتركين
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold font-display"
                data-testid="text-stats-leads-count"
              >
                {leads?.length || 0}
              </div>
            </CardContent>
          </Card>
          <Card
            className="border-2 border-black shadow-brutal-sm"
            data-testid="card-stats-applications"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-mono">
                طلبات الانضمام
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold font-display"
                data-testid="text-stats-applications-count"
              >
                {applications?.length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* SaaS Controls */}
          <Card className="border-2 border-black shadow-brutal col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-2xl">إعدادات SaaS</CardTitle>
              <CardDescription className="font-mono">
                تحكم بالخطة (free/paid) وتحرير الوصول للمنهج.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {/* User plan */}
                <div className="border-2 border-black p-4 bg-white">
                  <div className="font-display text-lg mb-2">خطة مستخدم</div>
                  <div className="flex flex-col gap-3">
                    <input
                      value={planEmail}
                      onChange={(e) => setPlanEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="border-2 border-black px-4 py-2 font-mono"
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className={`border-2 border-black px-4 py-2 font-mono font-bold ${
                          planValue === "free" ? "bg-secondary" : "bg-white"
                        }`}
                        onClick={() => setPlanValue("free")}
                      >
                        free
                      </button>
                      <button
                        type="button"
                        className={`border-2 border-black px-4 py-2 font-mono font-bold ${
                          planValue === "paid" ? "bg-secondary" : "bg-white"
                        }`}
                        onClick={() => setPlanValue("paid")}
                      >
                        paid
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={savingPlan || !planEmail}
                      className="bg-black text-white border-2 border-black px-4 py-2 font-bold hover:bg-secondary hover:text-black transition-colors uppercase disabled:opacity-50"
                      onClick={async () => {
                        if (!planEmail) return;
                        try {
                          setSavingPlan(true);
                          await fetch("/api/admin/user/plan", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              targetEmail: planEmail,
                              plan: planValue,
                            }),
                          });
                        } finally {
                          setSavingPlan(false);
                        }
                      }}
                    >
                      حفظ
                    </button>
                  </div>
                </div>

                {/* Curriculum access */}
                <div className="border-2 border-black p-4 bg-white">
                  <div className="font-display text-lg mb-2">المنهج: مجاني/مدفوع</div>
                  <div className="space-y-2">
                    {(curricula ?? [])
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between gap-3 border-2 border-black px-3 py-2"
                        >
                          <div>
                            <div className="font-mono font-bold">{c.title}</div>
                            <div className="font-mono text-xs text-gray-500">
                              {c.slug}
                            </div>
                          </div>
                          <button
                            type="button"
                            className={`border-2 border-black px-3 py-1 font-mono font-bold ${
                              c.isFree ? "bg-green-100" : "bg-gray-100"
                            }`}
                            onClick={async () => {
                              await fetch("/api/admin/curriculum/free", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  slug: c.slug,
                                  isFree: !c.isFree,
                                }),
                              });
                            }}
                          >
                            {c.isFree ? "FREE" : "PAID"}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Course publishing */}
                <div className="border-2 border-black p-4 bg-white">
                  <div className="font-display text-lg mb-2">نشر الكورسات (Markdown → Draft → Publish)</div>

                  <div className="flex items-center gap-2 mb-3">
                    <button
                      type="button"
                      disabled={syncingCourses}
                      className="bg-black text-white border-2 border-black px-3 py-2 font-bold hover:bg-secondary hover:text-black transition-colors uppercase disabled:opacity-50"
                      onClick={async () => {
                        try {
                          setSyncingCourses(true);
                          await fetch("/api/admin/courses/sync", { method: "POST" });
                        } finally {
                          setSyncingCourses(false);
                        }
                      }}
                    >
                      {syncingCourses ? "جاري المزامنة…" : "مزامنة من الماركداون"}
                    </button>

                    <input
                      value={publishVersion}
                      onChange={(e) => setPublishVersion(e.target.value)}
                      className="border-2 border-black px-3 py-2 font-mono text-sm w-24"
                      placeholder="v0.1"
                    />
                  </div>

                  <div className="space-y-2">
                    {(draftCourses ?? []).slice(0, 10).map((c) => (
                      <div key={c.id} className="border-2 border-black px-3 py-2">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-mono font-bold">{c.title}</div>
                            <div className="font-mono text-xs text-gray-500">{c.slug}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/courses/${c.slug}`}
                              className="border-2 border-black px-3 py-1 font-mono font-bold bg-white hover:bg-gray-50"
                            >
                              Preview
                            </Link>
                            <button
                              type="button"
                              disabled={publishingSlug === c.slug}
                              className="border-2 border-black px-3 py-1 font-mono font-bold bg-secondary hover:opacity-90 disabled:opacity-50"
                              onClick={async () => {
                                try {
                                  setPublishingSlug(c.slug);
                                  await fetch("/api/admin/courses/publish", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      slug: c.slug,
                                      version: publishVersion || "v0.1",
                                    }),
                                  });
                                } finally {
                                  setPublishingSlug(null);
                                }
                              }}
                            >
                              {publishingSlug === c.slug ? "…" : "Publish"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(draftCourses ?? []).length === 0 ? (
                      <div className="font-mono text-sm text-gray-500">
                        لا توجد Drafts بعد — اضغط "مزامنة من الماركداون".
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card
            className="border-2 border-black shadow-brutal col-span-1 lg:col-span-2"
            data-testid="table-applications"
          >
            <CardHeader>
              <CardTitle className="font-display text-2xl">
                طلبات الانضمام الأخيرة
              </CardTitle>
              <CardDescription className="font-mono">
                قائمة بجميع طلبات الانضمام المقدمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingApps ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow className="border-black hover:bg-transparent">
                        <TableHead className="text-right font-bold text-black">
                          الاسم
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          الخبرة
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          الروابط
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          الدافع
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          التاريخ
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications?.map((app) => (
                        <TableRow
                          key={app.id}
                          className="border-black/20"
                          data-testid={`row-application-${app.id}`}
                        >
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span data-testid={`text-application-name-${app.id}`}>
                                {app.name}
                              </span>
                              <span className="text-xs text-gray-500 font-mono">
                                {app.email}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="font-mono border-black text-xs"
                            >
                              {app.experienceLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {app.githubUrl ? (
                                <a
                                  href={app.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-secondary transition-colors"
                                  data-testid={`link-github-${app.id}`}
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              ) : null}
                              {app.linkedinUrl ? (
                                <a
                                  href={app.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-secondary transition-colors"
                                  data-testid={`link-linkedin-${app.id}`}
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              ) : null}
                            </div>
                          </TableCell>
                          <TableCell
                            className="max-w-xs truncate"
                            title={app.motivation}
                          >
                            {app.motivation}
                          </TableCell>
                          <TableCell className="font-mono text-xs whitespace-nowrap">
                            {format(new Date(app.createdAt), "dd MMM yyyy", {
                              locale: arSA,
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                      {applications?.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-8 text-gray-500"
                          >
                            لا توجد طلبات انضمام حتى الآن
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card
            className="border-2 border-black shadow-brutal col-span-1 lg:col-span-2"
            data-testid="table-leads"
          >
            <CardHeader>
              <CardTitle className="font-display text-2xl">
                قائمة المشتركين
              </CardTitle>
              <CardDescription className="font-mono">
                المشتركين في النشرة البريدية
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingLeads ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow className="border-black hover:bg-transparent">
                        <TableHead className="text-right font-bold text-black">
                          البريد الإلكتروني
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          تاريخ الاشتراك
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads?.map((lead) => (
                        <TableRow
                          key={lead.id}
                          className="border-black/20"
                          data-testid={`row-lead-${lead.id}`}
                        >
                          <TableCell
                            className="font-mono"
                            data-testid={`text-lead-email-${lead.id}`}
                          >
                            {lead.email}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {format(new Date(lead.createdAt), "dd MMM yyyy", {
                              locale: arSA,
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                      {leads?.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={2}
                            className="text-center py-8 text-gray-500"
                          >
                            لا توجد اشتراكات حتى الآن
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
