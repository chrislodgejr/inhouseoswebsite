import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { createInquiry, listInquiries, updateInquiry } from "@/lib/crm";
import type { InquiryInput, InquiryStatus } from "@/lib/types";

const statuses: InquiryStatus[] = ["New", "Contacted", "Qualified", "Archived"];

function clean(value: unknown) {
  return String(value || "").trim();
}

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const inquiries = await listInquiries();
  return NextResponse.json({ ok: true, inquiries });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  const input: InquiryInput = {
    company: clean(body.company),
    contact: clean(body.contact),
    email: clean(body.email),
    phone: clean(body.phone),
    locations: clean(body.locations),
    segment: clean(body.segment),
    message: clean(body.message),
    note: null,
  };

  if (!input.company || !input.contact || !input.email || !input.message) {
    return NextResponse.json({ ok: false, error: "Company, contact, email, and message are required." }, { status: 400 });
  }

  const inquiry = await createInquiry(input);
  return NextResponse.json({ ok: true, inquiry }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const id = clean(body.id);
  const status = clean(body.status) as InquiryStatus;
  const note = typeof body.note === "string" ? body.note : undefined;

  if (!id) return NextResponse.json({ ok: false, error: "Inquiry id is required." }, { status: 400 });
  if (status && !statuses.includes(status)) return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });

  const inquiry = await updateInquiry(id, { ...(status ? { status } : {}), ...(note !== undefined ? { note } : {}) });
  return NextResponse.json({ ok: true, inquiry });
}
