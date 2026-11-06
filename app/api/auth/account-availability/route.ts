import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import * as z from "zod";
import type { AccountAvailabilityStatus } from "@/app/(auth)/types";
import { emailSchema } from "@/app/(auth)/types";
import { db } from "@/lib/prisma/db";
import { getClientIp } from "@/lib/utils";

const payloadSchema = z.object({ email: emailSchema });

function respond(
  status: AccountAvailabilityStatus,
  httpStatus: number,
  extra: { message: string; headers?: Record<string, string> },
) {
  return NextResponse.json(
    { status, message: extra.message },
    {
      status: httpStatus,
      headers: {
        "Cache-Control": "no-store",
        ...extra.headers,
      },
    },
  );
}

const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  prefix: "acme:account-availability",
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return respond("invalid", 400, { message: "Invalid request" });
  }

  const { success, data } = payloadSchema.safeParse(payload);

  if (!success) {
    return respond("invalid", 400, { message: "Enter a valid email" });
  }

  const ip = getClientIp(request);

  if (!ip) {
    console.error("Missing or invalid client IP address");

    return respond("error", 500, {
      message: "Could not process your request. Try again.",
    });
  }

  try {
    const rateLimitResult = await rateLimiter.limit(ip);

    if (!rateLimitResult.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
      );
      return respond("rate_limited", 429, {
        message: "Too many attempts. Please wait a moment.",
        headers: { "Retry-After": String(retryAfter) },
      });
    }

    const user = await db.orm.public.User.where({ email: data.email }).first();
    if (user) {
      return respond("unavailable", 200, { message: "Account is unavailable" });
    }
  } catch (error) {
    console.error(error);
    return respond("error", 500, {
      message: "Could not check account availability. Try again.",
    });
  }

  return respond("available", 200, { message: "Account is available" });
}
