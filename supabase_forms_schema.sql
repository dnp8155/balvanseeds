-- ============================================================
-- Balavan Agro Seeds — Form Submission Tables
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ---------- ENQUIRIES ----------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  state text,
  district text,
  enquiry_type text,
  product_interest text,
  message text,
  source_page text,
  status text default 'New',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- EXPERT QUERIES ----------
create table if not exists public.expert_queries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mobile text not null,
  state text,
  district text,
  crop text,
  selected_seed text,
  question text not null,
  status text default 'New',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- DISTRIBUTOR APPLICATIONS ----------
create table if not exists public.distributor_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  business_name text,
  mobile text not null,
  email text,
  gst_number text,
  state text not null,
  district text not null,
  city text,
  existing_brands text,
  years_experience numeric,
  area_served text,
  message text,
  status text default 'New',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- RLS — public INSERT only (no public SELECT)
-- Service role bypasses RLS for admin reads/updates/deletes
-- ============================================================
alter table public.enquiries enable row level security;
alter table public.expert_queries enable row level security;
alter table public.distributor_applications enable row level security;

create policy "public insert enquiries" on public.enquiries for insert with check (true);
create policy "public insert expert_queries" on public.expert_queries for insert with check (true);
create policy "public insert distributor_applications" on public.distributor_applications for insert with check (true);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_enquiries_status on public.enquiries(status);
create index if not exists idx_enquiries_created on public.enquiries(created_at desc);
create index if not exists idx_expert_queries_status on public.expert_queries(status);
create index if not exists idx_expert_queries_created on public.expert_queries(created_at desc);
create index if not exists idx_distributor_apps_status on public.distributor_applications(status);
create index if not exists idx_distributor_apps_created on public.distributor_applications(created_at desc);

-- ============================================================
-- updated_at trigger (reuses set_updated_at() from main schema)
-- ============================================================
do $$
declare t text;
begin
  foreach t in array array['enquiries','expert_queries','distributor_applications'] loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at();', t);
  end loop;
end$$;