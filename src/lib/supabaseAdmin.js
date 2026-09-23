/**
 * Supabase REST API client for admin (client-side) CRUD.
 *
 * Uses the service_role key — bypasses ALL RLS policies. This key is
 * exposed in the browser bundle, so the admin panel must be the only
 * entry point that triggers writes. For a secure setup, move these
 * operations behind a Base44 backend function (Builder+ plan).
 */

const SUPABASE_URL = (import.meta.env?.VITE_SUPABASE_URL || "https://yugouortjdtblrbmuhnu.supabase.co").replace(/\/$/, "");
const SERVICE_KEY = import.meta.env?.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

const TABLE_MAP = {
  SeedVariety: "seed_varieties",
  CropCategory: "crop_categories",
  Dealer: "dealers",
  Enquiry: "enquiries",
  ExpertQuery: "expert_queries",
  DistributorApplication: "distributor_applications",
  NewsletterSubscriber: "newsletter_subscribers",
  SiteSetting: "site_settings",
  SeedImage: "seed_images",
  SeedDocument: "seed_documents",
};

const SORT_FIELD_MAP = {
  created_date: "created_at",
  updated_date: "updated_at",
};

function baseUrl() {
  let url = SUPABASE_URL;
  if (!url) return null;
  if (!url.startsWith("http")) url = `https://${url}.supabase.co`;
  return url.replace(/\/$/, "");
}

function mapRow(row) {
  if (!row || typeof row !== "object") return row;
  const mapped = { ...row };
  if (row.created_at) mapped.created_date = row.created_at;
  if (row.updated_at) mapped.updated_date = row.updated_at;
  return mapped;
}

function mapResult(data) {
  if (Array.isArray(data)) return data.map(mapRow);
  return mapRow(data);
}

function parseSort(sort) {
  if (!sort) return "";
  const desc = sort.startsWith("-");
  let col = desc ? sort.slice(1) : sort;
  col = SORT_FIELD_MAP[col] || col;
  return `${col}.${desc ? "desc" : "asc"}`;
}

async function adminRequest(path, opts = {}) {
  const base = baseUrl();
  if (!base || !SERVICE_KEY) {
    throw new Error("Supabase service role key not configured (VITE_SUPABASE_SERVICE_ROLE_KEY)");
  }
  const headers = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  };
  if (opts.single) headers["Accept"] = "application/vnd.pgrst.object+json";
  if (opts.method && opts.method !== "GET") {
    headers["Prefer"] = "return=representation";
  }

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

  const data = await res.json();

  // POST/PATCH return an array — extract first element for single-row ops
  if ((opts.method === "POST" || opts.method === "PATCH") && Array.isArray(data)) {
    return mapRow(data[0]);
  }
  return mapResult(data);
}

/**
 * Returns an entity-like API matching the Base44 SDK interface so admin
 * components can swap `base44.entities.X` → `adminEntity("X")` with minimal
 * changes. Supports: list(sort, limit), filter(query, sort, limit),
 * create(data), update(id, data), delete(id).
 */
export function adminEntity(entityName) {
  const table = TABLE_MAP[entityName];
  if (!table) throw new Error(`Unknown entity: ${entityName}`);

  return {
    list: async (sort, limit) => {
      let path = `${table}?select=*`;
      const order = parseSort(sort);
      if (order) path += `&order=${order}`;
      if (limit) path += `&limit=${limit}`;
      return adminRequest(path);
    },

    filter: async (query = {}, sort, limit) => {
      let path = `${table}?select=*`;
      const filters = Object.entries(query).map(([k, v]) => {
        if (typeof v === "boolean") return `${k}=eq.${v}`;
        if (v === null || v === undefined) return `${k}=is.null`;
        return `${k}=eq.${encodeURIComponent(String(v))}`;
      });
      if (filters.length) path += `&${filters.join("&")}`;
      const order = parseSort(sort);
      if (order) path += `&order=${order}`;
      if (limit) path += `&limit=${limit}`;
      return adminRequest(path);
    },

    create: async (data) => adminRequest(table, { method: "POST", body: data }),

    update: async (id, data) =>
      adminRequest(`${table}?id=eq.${id}`, { method: "PATCH", body: data }),

    delete: async (id) =>
      adminRequest(`${table}?id=eq.${id}`, { method: "DELETE" }),
  };
}

export function isAdminConfigured() {
  return !!(baseUrl() && SERVICE_KEY);
}