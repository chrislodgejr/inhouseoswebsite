import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "inhouseos_admin";

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "development-session-secret-change-before-launch";
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function expectedSessionToken() {
  return hash(`inhouseos:${sessionSecret()}`);
}

export function isAdminRequest() {
  const cookie = cookies().get(ADMIN_COOKIE)?.value || "";
  const expected = expectedSessionToken();
  if (!cookie || cookie.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(cookie), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function setAdminCookie() {
  cookies().set(ADMIN_COOKIE, expectedSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 10,
  });
}

export function clearAdminCookie() {
  cookies().set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
