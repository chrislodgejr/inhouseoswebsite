import type { Inquiry, InquiryInput, InquiryStatus } from "./types";

const SUPABASE_PROJECT_URL = "https://ukjicmeketabsieoyflm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6KbwEzUGNQUqWlsM5FyTqw_YI0ykQtC";

const DEMO_INQUIRIES: Inquiry[] = [
  {
    id: "demo-1001",
    created_at: "2026-05-06T09:30:00.000Z",
    status: "New",
    company: "Harbor & Hearth Hospitality",
    contact: "Maya Calder",
    email: "maya@example.com",
    phone: "(555) 014-7201",
    locations: "8",
    segment: "Restaurant group",
    message: "Looking for one back office layer for food cost, labor review, purchasing, inventory counts, waste logs, and weekly P&L.",
    note: "High-fit multi-location operator. Ask about current POS, accounting stack, and invoice workflow.",
  },
  {
    id: "demo-1002",
    created_at: "2026-05-05T15:15:00.000Z",
    status: "Contacted",
    company: "Copperline Kitchen Collective",
    contact: "Evan Rousseau",
    email: "evan@example.com",
    phone: "(555) 019-3842",
    locations: "3",
    segment: "Food service operator",
    message: "Needs a daily manager workflow for purchases, prep waste, payroll readiness, and margin alerts.",
    note: "Send walkthrough focused on Live P&L and purchasing workflow.",
  },
];

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || SUPABASE_PROJECT_URL).replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || SUPABASE_PUBLISHABLE_KEY;
  return { url, key, usingServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY) };
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const config = supabaseConfig();

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${body}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function supabaseRpc(functionName: string, body: Record<string, unknown>) {
  const config = supabaseConfig();

  const response = await fetch(`${config.url}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase RPC failed: ${response.status} ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  const payload: Omit<Inquiry, "id" | "created_at"> = {
    status: "New",
    company: input.company,
    contact: input.contact,
    email: input.email,
    phone: input.phone || null,
    locations: input.locations || null,
    segment: input.segment || null,
    message: input.message,
    note: input.note || null,
  };

  const config = supabaseConfig();

  if (config.usingServiceRole) {
    const inserted = await supabaseFetch("inhouseos_inquiries", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });

    if (Array.isArray(inserted) && inserted[0]) return inserted[0] as Inquiry;
  }

  const rpcInserted = await supabaseRpc("create_inhouseos_inquiry", {
    company: payload.company,
    contact: payload.contact,
    email: payload.email,
    phone: payload.phone,
    locations: payload.locations,
    segment: payload.segment,
    message: payload.message,
  });

  if (rpcInserted) return rpcInserted as Inquiry;

  return {
    id: `demo-${Date.now()}`,
    created_at: new Date().toISOString(),
    ...payload,
  };
}

export async function listInquiries(): Promise<Inquiry[]> {
  const config = supabaseConfig();

  if (config.usingServiceRole) {
    const rows = await supabaseFetch("inhouseos_inquiries?select=*&order=created_at.desc");
    if (Array.isArray(rows)) return rows as Inquiry[];
  }

  const rows = await supabaseRpc("list_inhouseos_inquiries", {});
  if (Array.isArray(rows)) return rows as Inquiry[];
  return DEMO_INQUIRIES;
}

export async function updateInquiry(id: string, updates: { status?: InquiryStatus; note?: string | null }) {
  const config = supabaseConfig();

  if (config.usingServiceRole) {
    const rows = await supabaseFetch(`inhouseos_inquiries?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(updates),
    });
    if (Array.isArray(rows) && rows[0]) return rows[0] as Inquiry;
  }

  const row = await supabaseRpc("update_inhouseos_inquiry", {
    inquiry_id: id,
    next_status: updates.status || null,
    next_note: updates.note === undefined ? null : updates.note,
  });

  if (row) return row as Inquiry;
  return DEMO_INQUIRIES.find((lead) => lead.id === id) || null;
}
