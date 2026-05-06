import type { Inquiry, InquiryInput, InquiryStatus } from "./types";

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
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const config = supabaseConfig();
  if (!config) return null;

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

  const inserted = await supabaseFetch("inhouseos_inquiries", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });

  if (Array.isArray(inserted) && inserted[0]) return inserted[0] as Inquiry;

  return {
    id: `demo-${Date.now()}`,
    created_at: new Date().toISOString(),
    ...payload,
  };
}

export async function listInquiries(): Promise<Inquiry[]> {
  const rows = await supabaseFetch("inhouseos_inquiries?select=*&order=created_at.desc");
  if (Array.isArray(rows)) return rows as Inquiry[];
  return DEMO_INQUIRIES;
}

export async function updateInquiry(id: string, updates: { status?: InquiryStatus; note?: string | null }) {
  const rows = await supabaseFetch(`inhouseos_inquiries?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(updates),
  });
  if (Array.isArray(rows) && rows[0]) return rows[0] as Inquiry;
  return DEMO_INQUIRIES.find((lead) => lead.id === id) || null;
}
