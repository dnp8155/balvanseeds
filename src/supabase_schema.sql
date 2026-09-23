-- ============================================================
-- Balavan Agro Seeds — Supabase Schema (BALVAN_ prefix)
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- CROP CATEGORIES ----------
create table if not exists public.BALVAN_crop_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text,
  full_description text,
  cover_image text,
  icon text,
  display_order numeric default 0,
  is_featured boolean default false,
  status text default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- SEED VARIETIES ----------
create table if not exists public.BALVAN_seed_varieties (
  id uuid primary key default gen_random_uuid(),
  crop_category_id uuid references public.BALVAN_crop_categories(id) on delete set null,
  variety_name text not null,
  slug text not null unique,
  variety_type text check (variety_type in ('Hybrid','Improved')),
  short_description text,
  full_description text,
  key_features jsonb default '[]'::jsonb,
  suitable_season text,
  recommended_regions text,
  maturity_duration text,
  yield_information text,
  sowing_guidance text,
  seed_rate text,
  plant_spacing text,
  irrigation_guidance text,
  soil_requirements text,
  disease_resistance text,
  packaging_information text,
  thumbnail_image text,
  brochure_url text,
  is_featured boolean default false,
  display_order numeric default 0,
  status text default 'published' check (status in ('draft','published','archived')),
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- SEED IMAGES ----------
create table if not exists public.BALVAN_seed_images (
  id uuid primary key default gen_random_uuid(),
  seed_variety_id uuid not null references public.BALVAN_seed_varieties(id) on delete cascade,
  image_url text not null,
  alt_text text,
  caption text,
  image_type text default 'product' check (image_type in ('product','field','packaging','farmer_result','other')),
  display_order numeric default 0,
  is_cover boolean default false,
  created_at timestamptz default now()
);

-- ---------- SEED DOCUMENTS ----------
create table if not exists public.BALVAN_seed_documents (
  id uuid primary key default gen_random_uuid(),
  seed_variety_id uuid not null references public.BALVAN_seed_varieties(id) on delete cascade,
  document_title text not null,
  document_type text check (document_type in ('brochure','cultivation_guide','certificate','product_sheet','other')),
  file_url text not null,
  language text,
  file_size text,
  display_order numeric default 0,
  status text default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz default now()
);

-- ---------- DEALERS ----------
create table if not exists public.BALVAN_dealers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  state text not null,
  district text not null,
  city text,
  pincode text,
  address text,
  mobile text not null,
  latitude double precision,
  longitude double precision,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS) — public read, no public write
-- ============================================================
alter table public.BALVAN_crop_categories enable row level security;
alter table public.BALVAN_seed_varieties enable row level security;
alter table public.BALVAN_seed_images enable row level security;
alter table public.BALVAN_seed_documents enable row level security;
alter table public.BALVAN_dealers enable row level security;

create policy "public read BALVAN_crop_categories" on public.BALVAN_crop_categories for select using (status = 'published');
create policy "public read BALVAN_seed_varieties" on public.BALVAN_seed_varieties for select using (status = 'published');
create policy "public read BALVAN_seed_images" on public.BALVAN_seed_images for select using (true);
create policy "public read BALVAN_seed_documents" on public.BALVAN_seed_documents for select using (status = 'published');
create policy "public read BALVAN_dealers" on public.BALVAN_dealers for select using (is_active = true);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_BALVAN_seed_varieties_category on public.BALVAN_seed_varieties(crop_category_id);
create index if not exists idx_BALVAN_seed_varieties_slug on public.BALVAN_seed_varieties(slug);
create index if not exists idx_BALVAN_seed_varieties_status on public.BALVAN_seed_varieties(status);
create index if not exists idx_BALVAN_seed_varieties_featured on public.BALVAN_seed_varieties(is_featured);
create index if not exists idx_BALVAN_crop_categories_slug on public.BALVAN_crop_categories(slug);
create index if not exists idx_BALVAN_seed_images_variety on public.BALVAN_seed_images(seed_variety_id);
create index if not exists idx_BALVAN_dealers_state on public.BALVAN_dealers(state);

-- ============================================================
-- updated_at trigger
-- ============================================================
create or replace function public.balvan_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  foreach t in array array['BALVAN_crop_categories','BALVAN_seed_varieties','BALVAN_dealers'] loop
    if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = t) then
      execute format('drop trigger if exists balvan_set_updated_at on public.%I;', t);
      execute format('create trigger balvan_set_updated_at before update on public.%I for each row execute function public.balvan_set_updated_at();', t);
    end if;
  end loop;
end$$;