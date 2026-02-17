import { Suspense } from "react";
import AdminCourseClient from "./client";

export const dynamic = "force-static";

export default function AdminCoursePage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <AdminCourseClient />
    </Suspense>
  );
}
