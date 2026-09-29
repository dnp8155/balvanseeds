/**
 * Supabase REST API client for public (client-side) reads.
 *
 * Uses the publishable (anon) key — safe for the browser. Respects RLS
 * policies: only published rows are readable. For admin writes, a backend
 * function with the secret key is required (Builder plan).
 */

const SUPABASE_URL = (import.meta.env?.VITE_SUPABASE_URL || "https://yugouortjdtblrbmuhnu.supabase.co").replace(/\/$/, "");
const SUPABASE_PUBLISHABLE_KEY = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_dO4VywG_eU1OKokieJQQcA_bFyJhkCM";

function baseUrl() {
  let url = SUPABASE_URL;
  if (!url) return null;
  if (!url.startsWith("http")) url = `https://${url}.supabase.co`;
  return url.replace(/\/$/, "");
}

async function request(path, opts = {}) {
  const base = baseUrl();
  if (!base || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Supabase env vars not configured (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY)");
  }
  const headers = {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    "Content-Type": "application/json",
  };
  if (opts.single) headers["Accept"] = "application/vnd.pgrst.object+json";

  const res = await fetch(`${base}/rest/v1/${path}`, {
    method: opts.method || "GET",
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Supabase ${opts.method || "GET"} ${path} → ${res.status}: ${errText}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

/* ---------- Public read API ---------- */

export async function fetchCropCategories() {
  return request("crop_categories?select=*&order=display_order.asc,name.asc");
}

export async function fetchCropCategoryBySlug(slug) {
  return request(`crop_categories?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`, { single: true });
}

export async function fetchSeedVarieties({ categoryId, featured, status = "published" } = {}) {
  let filter = `status=eq.${status}`;
  if (categoryId) filter += `&crop_category_id=eq.${categoryId}`;
  if (featured) filter += `&is_featured=eq.true`;
  return request(`seed_varieties?select=*&${filter}&order=display_order.asc,variety_name.asc`);
}

export async function fetchSeedVarietyBySlug(slug) {
  return request(`seed_varieties?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`, { single: true });
}

export async function fetchSeedImages(varietyId) {
  return request(`seed_images?select=*&seed_variety_id=eq.${varietyId}&order=display_order.asc`);
}

export async function fetchSeedDocuments(varietyId) {
  return request(`seed_documents?select=*&seed_variety_id=eq.${varietyId}&status=eq.published&order=display_order.asc`);
}

export async function fetchDealers() {
  return request("dealers?select=*&is_active=eq.true&order=state.asc,district.asc,name.asc");
}

export async function fetchSiteSettings(group) {
  let path = "site_settings?select=setting_key,setting_value,setting_group";
  if (group) path += `&setting_group=eq.${encodeURIComponent(group)}`;
  return request(path);
}

/* ---------- Public form submissions (INSERT only via RLS) ---------- */

export async function insertEnquiry(data) {
  return request("enquiries", { method: "POST", body: data });
}

export async function insertExpertQuery(data) {
  return request("expert_queries", { method: "POST", body: data });
}

export async function insertDistributorApplication(data) {
  return request("distributor_applications", { method: "POST", body: data });
}

export async function insertNewsletterSubscriber(data) {
  return request("newsletter_subscribers", { method: "POST", body: data });
}

export function isSupabaseConfigured() {
  return !!(baseUrl() && SUPABASE_PUBLISHABLE_KEY);
}

export async function invokeEdgeFunction(functionName, body) {
  const base = baseUrl();
  if (!base || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Supabase env vars not configured");
  }
  const res = await fetch(`${base}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`Edge function error: ${await res.text()}`);
  }
  return res.json();
}

export { request };