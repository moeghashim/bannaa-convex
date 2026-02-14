"use client";

import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/pages/home"), { ssr: false });

export default function Page() {
  return <Home />;
}
