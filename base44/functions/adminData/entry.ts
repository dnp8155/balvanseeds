import { createClientFromRequest } from "npm:@base44/sdk@0.8.52";
import { supaSelect, supaInsert, supaUpdate, supaDelete, supaCount, TABLE_MAP } from "../../shared/supabaseRest.ts";

/**
 * Admin CRUD on Supabase tables. Requires a logged-in admin (base44.auth.me + role check).
 * Operations: list, filter, create, update, delete — scoped to a whitelisted entity.
 */
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { operation, entity, data, id, query = {}, sort, limit } = body;
    const table = TABLE_MAP[entity];
    if (!table) return Response.json({ error: `Unknown entity: ${entity}` }, { status: 400 });

    switch (operation) {
      case "list":
        return Response.json(await supaSelect(table, {}, { sort, limit: limit || 200 }));
      case "filter":
        return Response.json(await supaSelect(table, query, { sort, limit: limit || 200 }));
      case "count":
        return Response.json(await supaCount(table, query));
      case "create":
        return Response.json(await supaInsert(table, data));
      case "update":
        return Response.json(await supaUpdate(table, id, data));
      case "delete":
        return Response.json(await supaDelete(table, id));
      default:
        return Response.json({ error: `Unknown operation: ${operation}` }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}