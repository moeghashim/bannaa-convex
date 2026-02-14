import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bannaa",
  description: "Bannaa migration (Next.js + Convex)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
