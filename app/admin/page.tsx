"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Inquiry, InquiryStatus } from "@/lib/types";

function IconBase({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
const ArrowRight = (props: { className?: string }) => <IconBase {...props}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></IconBase>;
const Building2 = (props: { className?: string }) => <IconBase {...props}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></IconBase>;

const statuses: InquiryStatus[] = ["New", "Contacted", "Qualified", "Archived"];

function Logo() {
  return (
    <a href="/" className="logoLink" aria-label="InHouseOS public site">
      <img src="/logo.png" className="logoImage" alt="InHouseOS logo" />
      <span className="logoText"><span className="logoWord">InHouseOS CRM</span><span className="logoSub">Inquiry pipeline</span></span>
    </a>
  );
}

function statusClass(status: string) {
  if (status === "New") return "statusNew";
  if (status === "Contacted") return "statusContacted";
  if (status === "Qualified") return "statusQualified";
  return "statusArchived";
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const active = useMemo(() => inquiries.find((item) => item.id === activeId) || inquiries[0] || null, [inquiries, activeId]);

  async function loadInquiries() {
    setLoading(true);
    const response = await fetch("/api/inquiries", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }
    const body = await response.json().catch(() => ({}));
    setAuthenticated(true);
    setInquiries(body.inquiries || []);
    setLoading(false);
  }

  useEffect(() => { loadInquiries(); }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (!response.ok) {
      setError("Invalid password. Check ADMIN_PASSWORD in your deployment environment.");
      return;
    }
    setPassword("");
    await loadInquiries();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setInquiries([]);
  }

  async function patchActive(updates: { status?: InquiryStatus; note?: string | null }) {
    if (!active) return;
    setSaving(true);
    const response = await fetch("/api/inquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: active.id, ...updates }) });
    const body = await response.json().catch(() => ({}));
    if (body.inquiry) {
      setInquiries((items) => items.map((item) => item.id === active.id ? { ...item, ...body.inquiry, ...updates } : item));
    } else {
      setInquiries((items) => items.map((item) => item.id === active.id ? { ...item, ...updates } : item));
    }
    setSaving(false);
  }

  if (loading) {
    return <main className="siteShell adminShell"><div className="noise" /><div className="container"><div className="adminCard loginCard"><Logo /><p className="sectionCopy">Loading CRM...</p></div></div></main>;
  }

  if (!authenticated) {
    return (
      <main className="siteShell adminShell">
        <div className="noise" /><div className="orb orbOne" /><div className="orb orbTwo" />
        <div className="container">
          <form className="adminCard loginCard form" onSubmit={login}>
            <Logo />
            <div><div className="eyebrow"><span className="eyebrowDot" />Protected area</div><h1 className="sectionTitle" style={{ fontSize: "3rem", marginBottom: 14 }}>Admin CRM</h1><p className="sectionCopy">Login to review restaurant and food service inquiries captured from the public website.</p></div>
            <label>Password<input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus /></label>
            <button className="btn btnPrimary" type="submit">Login <ArrowRight className="icon" /></button>
            {error && <div className="formStatus" style={{ color: "#fb7185" }}>{error}</div>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="siteShell adminShell">
      <div className="noise" /><div className="orb orbOne" /><div className="orb orbTwo" />
      <div className="container">
        <div className="adminTop">
          <Logo />
          <div className="headerActions"><a href="/" className="btn btnTiny">Public site</a><button className="btn btnTiny" onClick={logout}>Logout</button></div>
        </div>
        <div className="headingGrid"><div><div className="eyebrow"><span className="eyebrowDot" />Inquiry CRM</div><h1 className="sectionTitle">Early access pipeline.</h1></div><p className="sectionCopy">This admin area is wired to the inquiry API. Add Supabase credentials to persist leads across devices and deployments.</p></div>
        <div className="adminGrid">
          <aside className="adminCard">
            <div className="panelHeader"><div className="panelTitle">Leads</div><span className="statusPill">{inquiries.length} total</span></div>
            <div className="leadList">
              {inquiries.map((lead) => <button key={lead.id} className={`leadButton ${active?.id === lead.id ? 'active' : ''}`} onClick={() => setActiveId(lead.id)}><strong>{lead.company}</strong><br /><span style={{ color: "#94a3b8" }}>{lead.contact}</span><br /><span className={`statusPill ${statusClass(lead.status)}`}>{lead.status}</span></button>)}
            </div>
          </aside>
          <section className="adminCard">
            {active ? (
              <>
                <div className="panelHeader"><div><div className="eyebrow"><Building2 className="icon" /> {active.segment || "Operator"}</div><h2 className="sectionTitle" style={{ fontSize: "2.8rem", margin: "8px 0 0" }}>{active.company}</h2></div><span className={`statusPill ${statusClass(active.status)}`}>{active.status}</span></div>
                <div className="fieldGrid" style={{ marginBottom: 18 }}>
                  <label>Status<select className="select" value={active.status} onChange={(event) => patchActive({ status: event.target.value as InquiryStatus })}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label>Locations<input className="input" value={active.locations || ""} readOnly /></label>
                </div>
                <div className="kv"><span>Contact</span><span>{active.contact}</span></div>
                <div className="kv"><span>Email</span><span>{active.email}</span></div>
                <div className="kv"><span>Phone</span><span>{active.phone || "Not provided"}</span></div>
                <div className="kv"><span>Created</span><span>{new Date(active.created_at).toLocaleString()}</span></div>
                <div className="kv"><span>Message</span><span>{active.message}</span></div>
                <label style={{ marginTop: 18 }}>Internal note<textarea className="textarea" value={active.note || ""} onChange={(event) => setInquiries((items) => items.map((item) => item.id === active.id ? { ...item, note: event.target.value } : item))} onBlur={(event) => patchActive({ note: event.target.value })} /></label>
                <div className="formStatus">{saving ? "Saving..." : "Saved locally. Supabase persistence activates when environment variables are configured."}</div>
              </>
            ) : <p className="sectionCopy">No inquiries yet.</p>}
          </section>
        </div>
      </div>
    </main>
  );
}
