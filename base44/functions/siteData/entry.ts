import { supaSelect, supaInsert, TABLE_MAP } from "../../shared/supabaseRest.ts";

/**
 * Public site data — reads published content and accepts public form submissions.
 * No auth required: all reads filter status=published; inserts go to form tables.
 */
export default async function(req) {
  try {
    const body = await req.json();
    const { operation, params = {} } = body;
    switch (operation) {
      case "cropCategories":
        return Response.json(await supaSelect("crop_categories", { status: "published", ...params }, { sort: "display_order", limit: 100 }));
      case "cropCategoryBySlug":
        return Response.json((await supaSelect("crop_categories", { status: "published", slug: params.slug }, { limit: 1 }))[0] || null);
      case "seedVarieties": {
        const filter = { status: "published" };
        if (params.categoryId) filter.crop_category_id = params.categoryId;
        if (params.featured) filter.is_featured = true;
        return Response.json(await supaSelect("seed_varieties", filter, { sort: "display_order", limit: params.limit || 100 }));
      }
      case "seedVarietyBySlug":
        return Response.json((await supaSelect("seed_varieties", { status: "published", slug: params.slug }, { limit: 1 }))[0] || null);
      case "seedImages":
        return Response.json(await supaSelect("seed_images", { seed_variety_id: params.varietyId }, { sort: "display_order", limit: 100 }));
      case "seedDocuments":
        return Response.json(await supaSelect("seed_documents", { seed_variety_id: params.varietyId, status: "published" }, { sort: "display_order", limit: 100 }));
      case "dealers":
        return Response.json(await supaSelect("dealers", { is_active: true }, { sort: "state", limit: 200 }));
      case "siteSettings": {
        const filter = params.group ? { setting_group: params.group } : {};
        return Response.json(await supaSelect("site_settings", filter, { select: "setting_key,setting_value,setting_group", limit: 200 }));
      }
      case "importExportProducts":
        return Response.json(await supaSelect("import_export_products", { status: "published" }, { sort: "display_order", limit: 100 }));
      case "newsArticles":
        return Response.json(await supaSelect("news_articles", { status: "published" }, { sort: "-published_date", limit: 100 }));
      case "newsArticleBySlug":
        return Response.json((await supaSelect("news_articles", { status: "published", slug: params.slug }, { limit: 1 }))[0] || null);
      case "insertEnquiry":
        return Response.json(await supaInsert(TABLE_MAP.Enquiry, params.data));
      case "insertExpertQuery":
        return Response.json(await supaInsert(TABLE_MAP.ExpertQuery, params.data));
      case "insertDistributorApplication":
        return Response.json(await supaInsert(TABLE_MAP.DistributorApplication, params.data));
      case "insertNewsletterSubscriber":
        return Response.json(await supaInsert(TABLE_MAP.NewsletterSubscriber, params.data));
      default:
        return Response.json({ error: `Unknown operation: ${operation}` }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}