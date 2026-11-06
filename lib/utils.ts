import { isIP } from "node:net";
import type { SearchParams } from "nuqs/server";

export { cn } from "cn";

export function getNameInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[1]}`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function generateURLSearchParams(params: SearchParams) {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        urlSearchParams.append(key, v);
      });
    } else {
      urlSearchParams.set(key, value);
    }
  }

  return urlSearchParams;
}

/**
 * @SEE https://vercel.com/docs/headers/request-headers#x-forwarded-for
 *
 * Extracts the client IP from Vercel's x-forwarded-for header.
 *
 * Assumes the request passes through Vercel's trusted proxy infrastructure.
 * Revisit this implementation if the hosting platform or proxy configuration changes.
 */
export function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return process.env.NODE_ENV === "development" ? "127.0.0.1" : null;
  }

  const ip = forwardedFor.trim();

  return isIP(ip) ? ip : null;
}
