import { NextRequest, NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = String(body.password || "");
  const expected = process.env.ADMIN_PASSWORD || "change-this-before-launch";

  if (!password || password !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  setAdminCookie();
  return NextResponse.json({ ok: true });
}
