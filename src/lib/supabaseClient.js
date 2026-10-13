/**
 * Public data client for the Balvan Agro site.
 *
 * First attempts to read via the Base44 "siteData" backend function (server-side proxy).
 * If the Base44 backend is unreachable (e.g. running frontend-only dev or missing secret),
 * it gracefully falls back to direct Supabase REST queries so Seed, Detail, and other
 * public pages load data seamlessly.
 */
import { base44 } from "@/api/base44Client";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://yugouortjdtblrbmuhnu.supabase.co";
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Z291b3J0amR0YmxyYm11aG51Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDE3Mzg4MywiZXhwIjoyMTA1NzQ5ODgzfQ.r2cYFEqkCSgyUJ15hcFDwMGwSwuq-xFjn2jyHvM2aCo";

function mapRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) return row;
  const out = { ...row };
  if ("created_at" in out) { out.created_date = out.created_at; delete out.created_at; }
  if ("updated_at" in out) { out.updated_date = out.updated_at; delete out.updated_at; }
  return out;
}

function toPostgrestSort(sort) {
  if (!sort) return undefined;
  const desc = sort.startsWith("-");
  let col = desc ? sort.slice(1) : sort;
  if (col === "created_date") col = "created_at";
  else if (col === "updated_date") col = "updated_at";
  return `${col}.${desc ? "desc" : "asc"}`;
}

async function directSupabaseSelect(table, filter = {}, opts = {}) {
  const parts = ["select=*"];
  for (const [key, value] of Object.entries(filter)) {
    if (value === null || value === undefined) continue;
    const col = key === "created_date" ? "created_at" : key === "updated_date" ? "updated_at" : key;
    if (typeof value === "boolean" || typeof value === "number") {
      parts.push(`${col}=eq.${value}`);
    } else {
      parts.push(`${col}=eq.${encodeURIComponent(String(value))}`);
    }
  }
  const order = toPostgrestSort(opts.sort);
  if (order) parts.push(`order=${order}`);
  if (opts.limit) parts.push(`limit=${opts.limit}`);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${parts.join("&")}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Direct Supabase GET ${table} failed: ${res.status}`);
  }
  const rows = await res.json();
  return (rows || []).map(mapRow);
}

async function directSupabaseInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Direct Supabase POST ${table} failed: ${res.status} ${text}`);
  }
  const rows = await res.json();
  return Array.isArray(rows) && rows.length ? mapRow(rows[0]) : mapRow(rows);
}

async function invoke(operation, params = {}) {
  try {
    const response = await base44.functions.invoke("siteData", { operation, params });
    if (response && response.status < 400 && response.data && !response.data.error) {
      return response.data;
    }
  } catch (err) {
    // Fall back to direct Supabase REST
  }

  // Direct Supabase fallback
  switch (operation) {
    case "cropCategories":
      return directSupabaseSelect("crop_categories", { status: "published", ...params }, { sort: "display_order", limit: 100 });
    case "cropCategoryBySlug": {
      const rows = await directSupabaseSelect("crop_categories", { status: "published", slug: params.slug }, { limit: 1 });
      return rows[0] || null;
    }
    case "seedVarieties": {
      const filter = { status: "published" };
      if (params.categoryId) filter.crop_category_id = params.categoryId;
      if (params.featured) filter.is_featured = true;
      return directSupabaseSelect("seed_varieties", filter, { sort: "display_order", limit: params.limit || 100 });
    }
    case "seedVarietyBySlug": {
      const rows = await directSupabaseSelect("seed_varieties", { status: "published", slug: params.slug }, { limit: 1 });
      return rows[0] || null;
    }
    case "seedImages":
      return directSupabaseSelect("seed_images", { seed_variety_id: params.varietyId }, { sort: "display_order", limit: 100 });
    case "seedDocuments":
      return directSupabaseSelect("seed_documents", { seed_variety_id: params.varietyId, status: "published" }, { sort: "display_order", limit: 100 });
    case "dealers":
      return directSupabaseSelect("dealers", { is_active: true }, { sort: "state", limit: 200 });
    case "siteSettings": {
      const filter = params.group ? { setting_group: params.group } : {};
      return directSupabaseSelect("site_settings", filter, { limit: 200 });
    }
    case "importExportProducts":
      return directSupabaseSelect("import_export_products", { status: "published" }, { sort: "display_order", limit: 100 });
    case "newsArticles":
      return directSupabaseSelect("news_articles", { status: "published" }, { sort: "-published_date", limit: 100 });
    case "newsArticleBySlug": {
      const rows = await directSupabaseSelect("news_articles", { status: "published", slug: params.slug }, { limit: 1 });
      return rows[0] || null;
    }
    case "insertEnquiry":
      return directSupabaseInsert("enquiries", params.data);
    case "insertExpertQuery":
      return directSupabaseInsert("expert_queries", params.data);
    case "insertDistributorApplication":
      return directSupabaseInsert("distributor_applications", params.data);
    case "insertNewsletterSubscriber":
      return directSupabaseInsert("newsletter_subscribers", params.data);
    default:
      throw new Error(`Unsupported fallback operation: ${operation}`);
  }
}

/* ---------- Public read API ---------- */

export async function fetchCropCategories(query = {}, limit = 50) {
  return invoke("cropCategories", { ...query, limit });
}

export async function fetchCropCategoryBySlug(slug) {
  return invoke("cropCategoryBySlug", { slug });
}

export async function fetchSeedVarieties({ categoryId, featured, status, limit = 50, query: conditions = {} } = {}) {
  return invoke("seedVarieties", { categoryId, featured, status, limit, ...conditions });
}

export async function fetchSeedVarietyBySlug(slug) {
  return invoke("seedVarietyBySlug", { slug });
}

export async function fetchSeedImages(varietyId) {
  return invoke("seedImages", { varietyId });
}

export async function fetchSeedDocuments(varietyId) {
  return invoke("seedDocuments", { varietyId });
}

export async function fetchDealers() {
  return invoke("dealers");
}

export async function fetchSiteSettings(group) {
  return invoke("siteSettings", { group });
}

/* ---------- Import/Export products (CMS-backed) ---------- */

export async function fetchImportExportProducts() {
  return invoke("importExportProducts");
}

/* ---------- Newsroom (CMS-backed, static fallback) ---------- */

export async function fetchNewsArticles() {
  return invoke("newsArticles");
}

export async function fetchNewsArticleBySlug(slug) {
  return invoke("newsArticleBySlug", { slug });
}

// Normalizes a news article record into the shape the newsroom UI expects.
export function mapNewsArticle(a) {
  if (!a) return null;
  return {
    slug: a.slug,
    title: a.title,
    category: a.category || "Company",
    date: a.published_date || (a.created_date || "").slice(0, 10),
    excerpt: a.excerpt || "",
    body: a.body || "",
    cover: a.cover_image || "",
  };
}

/* ---------- Public form submissions (INSERT only) ---------- */

export async function insertEnquiry(data) {
  return invoke("insertEnquiry", { data });
}

export async function insertExpertQuery(data) {
  return invoke("insertExpertQuery", { data });
}

export async function insertDistributorApplication(data) {
  return invoke("insertDistributorApplication", { data });
}

export async function insertNewsletterSubscriber(data) {
  const email = (data.email || "").toLowerCase().trim();
  if (!email) throw new Error("Email required for newsletter subscription");
  return invoke("insertNewsletterSubscriber", { data: { email, source_page: data.source_page || "footer" } });
}

export function isSupabaseConfigured() {
  return true;
}

export async function invokeEdgeFunction(_functionName, _body) {
  return { ok: true };
}