export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (typeof window !== "undefined") {
    return normalized;
  }
  const base = process.env.NEXT_PUBLIC_APP_URL || process.env.BETTERAUTH_BASE_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${normalized}`;
}
