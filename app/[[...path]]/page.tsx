"use client";

import dynamic from "next/dynamic";

// Transitional: mount the legacy SPA inside Next.js.
// This lets Vercel deploy immediately, while we migrate routes to native Next pages.
const App = dynamic(() => import("@/App"), { ssr: false });

export default function CatchAllPage() {
  return <App />;
}
