// Shared data layer for the Balavan Agro dynamic seed catalogue.
// All public reads go through the app-user SDK so RLS hides draft/archived
// records automatically. Published categories are cached in-memory to avoid
// repeated requests across pages.
import { base44 } from "@/api/base44Client";
import { images } from "@/lib/siteData";

const FALLBACK_IMAGE = images.seed;
let _categoryCache = null;

export async function fetchPublishedCategories() {
  if (_categoryCache) return _categoryCache;
  const cats = await base44.entities.CropCategory.filter(
    { status: "published" },
    "display_order",
    100
  );
  _categoryCache = cats;
  return cats;
}

export function clearCategoryCache() {
  _categoryCache = null;
}

export async function fetchFeaturedCategories() {
  const cats = await fetchPublishedCategories();
  return cats.filter((c) => c.is_featured);
}

export async function fetchPublishedVarieties() {
  const list = await base44.entities.SeedVariety.filter(
    { status: "published" },
    "display_order",
    300
  );
  return list;
}

export async function fetchFeaturedVarieties(limit = 6) {
  const list = await base44.entities.SeedVariety.filter(
    { status: "published", is_featured: true },
    "display_order",
    limit
  );
  return list;
}

export async function fetchVarietyBySlug(slug) {
  const list = await base44.entities.SeedVariety.filter(
    { slug, status: "published" },
    "-created_date",
    1
  );
  return list && list.length ? list[0] : null;
}

export async function fetchImagesForVariety(varietyId) {
  const list = await base44.entities.SeedImage.filter(
    { seed_variety_id: varietyId },
    "display_order",
    50
  );
  return list;
}

export async function fetchDocumentsForVariety(varietyId) {
  const list = await base44.entities.SeedDocument.filter(
    { seed_variety_id: varietyId, status: "published" },
    "display_order",
    50
  );
  return list;
}

export async function fetchRelatedVarieties(cropCategoryId, excludeId, limit = 4) {
  const list = await base44.entities.SeedVariety.filter(
    { crop_category_id: cropCategoryId, status: "published" },
    "display_order",
    20
  );
  return list.filter((v) => v.id !== excludeId).slice(0, limit);
}

export function buildCategoryLookup(categories) {
  const byId = {};
  const bySlug = {};
  categories.forEach((c) => {
    byId[c.id] = c;
    bySlug[c.slug] = c;
  });
  return { byId, bySlug };
}

/**
 * Normalize a DB SeedVariety record into the prop shape the SeedCard
 * component expects (slug, name, type, cropName, short, image).
 */
export function toSeedCardProps(variety, categoryLookup) {
  const cat = categoryLookup.byId[variety.crop_category_id];
  return {
    slug: variety.slug,
    name: variety.variety_name,
    type: variety.variety_type,
    cropName: cat ? cat.name : "Seeds",
    short: variety.short_description || "",
    image: variety.thumbnail_image || (cat && cat.cover_image) || FALLBACK_IMAGE,
    features: variety.key_features || []
  };
}

export function resolveMainImage(variety, galleryImages) {
  if (galleryImages && galleryImages.length) {
    const cover = galleryImages.find((i) => i.is_cover);
    if (cover) return cover.image_url;
    return galleryImages[0].image_url;
  }
  return variety.thumbnail_image || FALLBACK_IMAGE;
}

export function buildSeoTitle(variety, categoryName) {
  if (variety.seo_title) return variety.seo_title;
  return `${variety.variety_name} ${categoryName || ""} Seed | Balavan Agro`.replace(/\s+/g, " ").trim();
}

export function buildSeoDescription(variety) {
  if (variety.seo_description) return variety.seo_description;
  return (
    variety.short_description ||
    `${variety.variety_name} — a ${variety.variety_type.toLowerCase()} seed variety by Balavan Agro.`
  );
}