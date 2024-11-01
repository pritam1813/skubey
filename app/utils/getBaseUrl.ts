export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Browser should use relative path
    return "";
  }

  if (process.env.VERCEL_URL) {
    // Reference: https://vercel.com/docs/environment-variables
    return `https://${process.env.VERCEL_URL}`;
  }

  // Development environment
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL || "domain.com"}`;
}
