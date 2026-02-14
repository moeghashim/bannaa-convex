"use client";

import dynamic from "next/dynamic";

const Curriculum = dynamic(() => import("@/pages/curriculum"), { ssr: false });

export default function Page() {
  return <Curriculum />;
}
