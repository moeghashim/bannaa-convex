"use client";

import dynamic from "next/dynamic";

const Admin = dynamic(() => import("@/pages/admin"), { ssr: false });

export default function Page() {
  return <Admin />;
}
