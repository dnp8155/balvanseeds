import { secrets } from "base44:runtime";

const TIMEOUT = 12000;

function getCredentials() {
  const url = secrets.get("SUPABASE_URL");
  const key = secrets.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set");
  return { url: url.replace(/\/$/, ""), key };
}

function authHeaders() {
  const { key } = getCredentials();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

/** Map Supabase column names (created_at/updated_at) to Base44-style (created_date/updated_date) so the frontend sees the same shape. */
function mapRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) return row;
  const out = { ...row };
  if ("created_at" in out) { out.created_date = out.created_at; delete out.created_at; }
  if ("updated_at" in out) { out.updated_date = out.updated_at; delete out.updated_at; }
  return out;
}

/** Translate a Base44-style sort ("-created_date" or "display_order") to PostgREST order param ("created_at.desc" or "display_order.asc"). */
function toPostgrestSort(sort) {
  if (!sort) return undefined;
  const desc = sort.startsWith("-");
  let col = desc ? sort.slice(1) : sort;
  if (col === "created_date") col = "created_at";
  else if (col === "updated_date") col = "updated_at";
  return `${col}.${desc ? "desc" : "asc"}`;
}

/** Build PostgREST query string from a Base44-style filter object (equality only) + options. */
function buildQueryParams(filter = {}, opts = {}) {
  const parts = [];
  const { select, sort, limit } = opts;
  if (select) parts.push(`select=${encodeURIComponent(select)}`);
  else parts.push("select=*");
  for (const [key, value] of Object.entries(filter)) {
    if (value === null || value === undefined) continue;
    const col = key === "created_date" ? "created_at" : key === "updated_date" ? "updated_at" : key;
    if (typeof value === "boolean") parts.push(`${col}=eq.${value}`);
    else if (typeof value === "number") parts.push(`${col}=eq.${value}`);
    else parts.push(`${col}=eq.${encodeURIComponent(String(value))}`);
  }
  const order = toPostgrestSort(sort);
  if (order) parts.push(`order=${order}`);
  if (limit) parts.push(`limit=${limit}`);
  return parts.join("&");
}

export async function supaSelect(table, filter = {}, opts = {}) {
  const { url } = getCredentials();
  const qs = buildQueryParams(filter, opts);
  const res = await fetch(`${url}/rest/v1/${table}?${qs}`, {
    headers: authHeaders(),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase GET ${table}: ${res.status} ${text}`);
  }
  const rows = await res.json();
  return (rows || []).map(mapRow);
}

export async function supaCount(table, filter = {}) {
  const rows = await supaSelect(table, filter, { select: "id", limit: 10000 });
  return rows.length;
}

export async function supaInsert(table, data) {
  const { url } = getCredentials();
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...authHeaders(), Prefer: "return=representation" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase POST ${table}: ${res.status} ${text}`);
  }
  const rows = await res.json();
  return Array.isArray(rows) ? rows.map(mapRow) : mapRow(rows);
}

export async function supaUpdate(table, id, data) {
  const { url } = getCredentials();
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...authHeaders(), Prefer: "return=representation" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase PATCH ${table}: ${res.status} ${text}`);
  }
  const rows = await res.json();
  return Array.isArray(rows) && rows.length ? mapRow(rows[0]) : null;
}

export async function supaDelete(table, id) {
  const { url } = getCredentials();
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase DELETE ${table}: ${res.status} ${text}`);
  }
  return { ok: true };
}

/** Whitelisted entity name → Supabase table name. */
export const TABLE_MAP = {
  CropCategory: "crop_categories",
  SeedVariety: "seed_varieties",
  SeedImage: "seed_images",
  SeedDocument: "seed_documents",
  Dealer: "dealers",
  Enquiry: "enquiries",
  ExpertQuery: "expert_queries",
  DistributorApplication: "distributor_applications",
  NewsletterSubscriber: "newsletter_subscribers",
  SiteSetting: "site_settings",
  NewsArticle: "news_articles",
  ImportExportProduct: "import_export_products",
};