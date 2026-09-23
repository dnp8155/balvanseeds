-- ============================================================
-- Balavan Agro Seeds — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ---------- CROP CATEGORIES ----------
create table if not exists public.crop_categories (
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
create table if not exists public.seed_varieties (
  id uuid primary key default gen_random_uuid(),
  crop_category_id uuid references public.crop_categories(id) on delete set null,
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
create table if not exists public.seed_images (
  id uuid primary key default gen_random_uuid(),
  seed_variety_id uuid not null references public.seed_varieties(id) on delete cascade,
  image_url text not null,
  alt_text text,
  caption text,
  image_type text default 'product' check (image_type in ('product','field','packaging','farmer_result','other')),
  display_order numeric default 0,
  is_cover boolean default false,
  created_at timestamptz default now()
);

-- ---------- SEED DOCUMENTS ----------
create table if not exists public.seed_documents (
  id uuid primary key default gen_random_uuid(),
  seed_variety_id uuid not null references public.seed_varieties(id) on delete cascade,
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
create table if not exists public.dealers (
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

-- ---------- SITE SETTINGS ----------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value text,
  setting_group text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS) — public read, no public write
-- ============================================================
alter table public.crop_categories enable row level security;
alter table public.seed_varieties enable row level security;
alter table public.seed_images enable row level security;
alter table public.seed_documents enable row level security;
alter table public.dealers enable row level security;
alter table public.site_settings enable row level security;

-- Public read policies (anon + authenticated can read published rows)
create policy "public read crop_categories" on public.crop_categories for select using (status = 'published');
create policy "public read seed_varieties" on public.seed_varieties for select using (status = 'published');
create policy "public read seed_images" on public.seed_images for select using (true);
create policy "public read seed_documents" on public.seed_documents for select using (status = 'published');
create policy "public read dealers" on public.dealers for select using (is_active = true);
create policy "public read site_settings" on public.site_settings for select using (true);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_seed_varieties_category on public.seed_varieties(crop_category_id);
create index if not exists idx_seed_varieties_slug on public.seed_varieties(slug);
create index if not exists idx_seed_varieties_status on public.seed_varieties(status);
create index if not exists idx_seed_varieties_featured on public.seed_varieties(is_featured);
create index if not exists idx_crop_categories_slug on public.crop_categories(slug);
create index if not exists idx_seed_images_variety on public.seed_images(seed_variety_id);
create index if not exists idx_dealers_state on public.dealers(state);
create index if not exists idx_site_settings_key on public.site_settings(setting_key);

-- ============================================================
-- updated_at trigger function
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  foreach t in array array['crop_categories','seed_varieties','dealers','site_settings'] loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at();', t);
  end loop;
end$$;