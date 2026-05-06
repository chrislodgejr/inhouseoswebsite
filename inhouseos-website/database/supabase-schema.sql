-- InHouseOS public website CRM persistence
-- Run this in Supabase SQL editor, then set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.

create extension if not exists pgcrypto;

create table if not exists public.inhouseos_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'New' check (status in ('New', 'Contacted', 'Qualified', 'Archived')),
  company text not null,
  contact text not null,
  email text not null,
  phone text,
  locations text,
  segment text,
  message text not null,
  note text
);

alter table public.inhouseos_inquiries enable row level security;

-- Public website visitors can create inquiries.
drop policy if exists "Allow public inquiry creation" on public.inhouseos_inquiries;
create policy "Allow public inquiry creation"
  on public.inhouseos_inquiries
  for insert
  to anon
  with check (true);

-- Reads and updates are performed through Next.js API routes with the service role key.
-- Do not add public select/update policies unless you intentionally want public access.

create index if not exists inhouseos_inquiries_created_at_idx
  on public.inhouseos_inquiries (created_at desc);

create index if not exists inhouseos_inquiries_status_idx
  on public.inhouseos_inquiries (status);
