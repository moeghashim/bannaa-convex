export function getConvexUrlFromEnv() {
  const raw = process.env.NEXT_PUBLIC_CONVEX_URL;
  const url = raw?.trim();
  if (!url) throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");
  return url;
}

export function getInternalApiKeyFromEnv() {
  const raw = process.env.INTERNAL_API_KEY;
  const key = raw?.trim();
  if (!key) throw new Error("Missing INTERNAL_API_KEY");
  return key;
}
