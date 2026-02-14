import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing NEXT_PUBLIC_CONVEX_URL. Convex client will not be able to connect.",
  );
}

// Next.js may evaluate this during build-time. Ensure the URL is always absolute.
const fallbackUrl = "http://localhost:3210";
export const convex = new ConvexReactClient(convexUrl ?? fallbackUrl);
