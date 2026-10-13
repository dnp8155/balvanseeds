import { createClientFromRequest } from "npm:@base44/sdk@0.8.52";
import { secrets } from "base44:runtime";
import { supaInsert, supaUpdate } from "../../shared/supabaseRest.ts";

const EXT_BY_TYPE = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/**
 * Uploads a product image to Supabase Storage and links it to a seed variety.
 *
 * Payload:
 *   file_url        — public URL of the file (from UploadPublicFile) to pull bytes from
 *   seed_variety_id  — the SeedVariety this image belongs to
 *   image_type?     — product | field | packaging | farmer_result | other (default product)
 *   alt_text?       — alt text
 *   caption?        — caption
 *   is_cover?       — if true, also sets SeedVariety.thumbnail_image to this image
 *   display_order?  — sort order
 *
 * Admin only.
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "admin")
      return Response.json({ error: "Forbidden — admin only" }, { status: 403 });

    const body = await req.json();
    const {
      file_url,
      seed_variety_id,
      image_type = "product",
      alt_text,
      caption,
      is_cover = false,
      display_order,
    } = body || {};

    if (!file_url || typeof file_url !== "string")
      return Response.json({ error: "file_url is required" }, { status: 400 });
    if (!seed_variety_id || typeof seed_variety_id !== "string")
      return Response.json({ error: "seed_variety_id is required" }, { status: 400 });

    const supabaseUrl = (secrets.get("SUPABASE_URL") || "").replace(/\/$/, "");
    const serviceKey = secrets.get("SUPABASE_SERVICE_ROLE_KEY");
    const configuredBucket = secrets.get("SUPABASE_BUCKET");
    if (!supabaseUrl || !serviceKey || !configuredBucket)
      return Response.json(
        { error: "Supabase not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / SUPABASE_BUCKET)" },
        { status: 500 }
      );

    // Resolve the real bucket name: the configured value may be mistyped, so
    // verify it against the Storage API and fall back to the first available bucket.
    const authHeaders = { Authorization: `Bearer ${serviceKey}` };
    let bucket = configuredBucket;
    try {
      const listRes = await fetch(`${supabaseUrl}/storage/v1/bucket`, { headers: authHeaders });
      if (listRes.ok) {
        const buckets = await listRes.json();
        if (Array.isArray(buckets) && buckets.length) {
          const match = buckets.find((b) => b.name === configuredBucket);
          bucket = match ? match.name : buckets[0].name;
        }
      }
    } catch {
      // keep configured bucket on lookup failure
    }

    // Pull the file bytes from the transit URL.
    const fileRes = await fetch(file_url, { signal: AbortSignal.timeout(20000) });
    if (!fileRes.ok) return Response.json({ error: "Could not fetch source file" }, { status: 502 });
    const contentType = (fileRes.headers.get("content-type") || "image/jpeg").split(";")[0].trim();
    const ext = EXT_BY_TYPE[contentType] || "jpg";
    const bytes = new Uint8Array(await fileRes.arrayBuffer());
    if (bytes.length === 0)
      return Response.json({ error: "Source file is empty" }, { status: 400 });

    const safeId = String(seed_variety_id).replace(/[^a-zA-Z0-9_-]/g, "");
    const path = `products/${safeId}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

    // Upload to Supabase Storage (service role bypasses RLS).
    const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": contentType,
        "x-upsert": "true",
      },
      body: bytes,
      signal: AbortSignal.timeout(30000),
    });

    if (!uploadRes.ok) {
      const detail = await uploadRes.text().catch(() => "");
      return Response.json(
        { error: "Supabase upload failed", status: uploadRes.status, detail: detail.slice(0, 500) },
        { status: 502 }
      );
    }

    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;

    // Create the SeedImage record in Supabase.
    const seedImage = await supaInsert("seed_images", {
      seed_variety_id,
      image_url: publicUrl,
      alt_text: alt_text || "",
      caption: caption || "",
      image_type,
      display_order: typeof display_order === "number" ? display_order : 0,
      is_cover: !!is_cover,
    });

    // Optionally promote to the variety thumbnail in Supabase.
    if (is_cover) {
      await supaUpdate("seed_varieties", seed_variety_id, { thumbnail_image: publicUrl });
    }

    return Response.json({ ok: true, publicUrl, seedImage });
  } catch (error) {
    return Response.json({ error: error.message || String(error) }, { status: 500 });
  }
}