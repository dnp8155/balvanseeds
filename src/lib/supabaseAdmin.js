/**
 * Admin data client for the Balvan Agro site.
 *
 * Backed by the "adminData" backend function, which verifies admin auth
 * (base44.auth.me + role check) then reads/writes the external Supabase
 * project using the service role key. No secret keys are shipped to the
 * browser — a logged-in admin's session satisfies the server-side check.
 */
import { base44 } from "@/api/base44Client";

async function invokeAdmin(payload) {
  const response = await base44.functions.invoke("adminData", payload);
  if (response.status >= 400 || (response.data && response.data.error)) {
    throw new Error(response.data?.error || `adminData failed (${response.status})`);
  }
  return response.data;
}

/**
 * Returns an entity-like API matching the Base44 SDK interface so admin
 * components can swap `base44.entities.X` → `adminEntity("X")` with minimal
 * changes. Supports: list(sort, limit), filter(query, sort, limit),
 * create(data), update(id, data), delete(id).
 */
export function adminEntity(entityName) {
  return {
    list: async (sort, limit) =>
      invokeAdmin({ operation: "list", entity: entityName, sort, limit }),

    filter: async (query = {}, sort, limit) =>
      invokeAdmin({ operation: "filter", entity: entityName, query, sort, limit }),

    count: async (query = {}) =>
      invokeAdmin({ operation: "count", entity: entityName, query }),

    create: async (data) =>
      invokeAdmin({ operation: "create", entity: entityName, data }),

    update: async (id, data) =>
      invokeAdmin({ operation: "update", entity: entityName, id, data }),

    delete: async (id) =>
      invokeAdmin({ operation: "delete", entity: entityName, id }),
  };
}

export function isAdminConfigured() {
  return true;
}