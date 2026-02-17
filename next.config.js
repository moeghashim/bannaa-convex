/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We currently run the legacy SPA (client/src/App) inside Next as a transitional step.

  // Ensure Markdown course files are bundled into the serverless output so
  // /api/admin/courses/sync can read them at runtime on Vercel.
  outputFileTracingIncludes: {
    "/api/admin/courses/sync": ["./courses/**/*.md"],
  },
};

export default nextConfig;
