import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function ApplicationModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InsertApplication>({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      githubUrl: "",
      linkedinUrl: "",
      experienceLevel: "beginner",
      motivation: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertApplication) => {
      const res = await apiRequest("POST", "/api/applications", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "تم استلام طلبك بنجاح",
        description: "سنقوم بمراجعة طلبك والتواصل معك قريباً.",
      });
      setOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إرسال الطلب",
        description: error.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: InsertApplication) {
    mutation.mutate(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle className="font-display text-2xl">قدم طلب الانضمام</DialogTitle>
          <DialogDescription className="font-mono text-xs">
            المقاعد محدودة. أخبرنا لماذا يجب أن نختارك.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>الاسم الكامل</FormLabel>
                  <FormControl>
                    <Input placeholder="الاسم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel>رابط GitHub</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/..." {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel>رابط LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/..." {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>مستوى الخبرة</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger dir="rtl">
                        <SelectValue placeholder="اختر مستواك" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent dir="rtl">
                      <SelectItem value="beginner">مبتدئ (٠-١ سنة)</SelectItem>
                      <SelectItem value="intermediate">متوسط (٢-٤ سنوات)</SelectItem>
                      <SelectItem value="advanced">خبير (٥+ سنوات)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>لماذا تريد الانضمام؟</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="أخبرنا عن شغفك وماذا تريد أن تبني..." 
                      className="resize-none h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-secondary text-black hover:bg-[#b3e600] font-bold mt-4"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : "إرسال الطلب"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
