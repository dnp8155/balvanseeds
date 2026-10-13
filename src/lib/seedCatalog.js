// Data layer for the Balvan Agro seed catalogue.
// Reads from Supabase via REST API (publishable/anon key — RLS-protected).
import { images } from "@/lib/siteData";
import {
  fetchCropCategories,
  fetchSeedVarieties,
  fetchSeedVarietyBySlug,
  fetchSeedImages,
  fetchSeedDocuments,
} from "@/lib/supabaseClient";

const FALLBACK_IMAGE = images.seed;

function parseFeatures(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try { return JSON.parse(val); } catch { return []; }
}

function normalizeVariety(v) {
  return { ...v, key_features: parseFeatures(v.key_features) };
}

export async function fetchPublishedCategories() {
  return fetchCropCategories();
}

export async function fetchFeaturedCategories() {
  return fetchCropCategories({ is_featured: true });
}

export async function fetchPublishedVarieties() {
  const list = await fetchSeedVarieties({ status: "published" });
  return (list || []).map(normalizeVariety);
}

export async function fetchFeaturedVarieties(limit) {
  const list = await fetchSeedVarieties({ featured: true, status: "published", limit: limit || 50 });
  return (list || []).map(normalizeVariety);
}

export async function fetchVarietyBySlug(slug) {
  try {
    const v = await fetchSeedVarietyBySlug(slug);
    return v ? normalizeVariety(v) : null;
  } catch {
    return null;
  }
}

export async function fetchImagesForVariety(seedVarietyId) {
  const list = await fetchSeedImages(seedVarietyId);
  return (list || []).sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function fetchDocumentsForVariety(seedVarietyId) {
  const list = await fetchSeedDocuments(seedVarietyId);
  return (list || []).sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function fetchRelatedVarieties(cropCategoryId, excludeId, limit = 4) {
  const list = await fetchSeedVarieties({ categoryId: cropCategoryId, status: "published", limit: limit + 2 });
  return (list || [])
    .filter((v) => v.id !== excludeId && v.slug !== excludeId)
    .slice(0, limit)
    .map(normalizeVariety);
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

export function toSeedCardProps(variety, categoryLookup) {
  const cat = categoryLookup.byId[variety.crop_category_id];
  return {
    slug: variety.slug,
    name: variety.variety_name,
    type: variety.variety_type,
    cropName: cat ? cat.name : "Seeds",
    short: variety.short_description || "",
    image: variety.thumbnail_image || (cat && cat.cover_image) || FALLBACK_IMAGE,
    features: variety.key_features || [],
    isFeatured: variety.is_featured === true,
  };
}

export function resolveMainImage(variety, galleryImages) {
  if (galleryImages && galleryImages.length) {
    const cover = galleryImages.find((i) => i.is_cover);
    if (cover) return cover.image_url;
  }
  return variety.thumbnail_image || (galleryImages && galleryImages.length ? galleryImages[0].image_url : FALLBACK_IMAGE);
}

export function buildSeoTitle(variety, categoryName) {
  if (variety.seo_title) return variety.seo_title;
  return `${variety.variety_name} ${categoryName || ""} Seed | Balvan Agro`
    .replace(/\s+/g, " ")
    .trim();
}

export function buildSeoDescription(variety) {
  if (variety.seo_description) return variety.seo_description;
  return (
    variety.short_description ||
    `${variety.variety_name} — a ${variety.variety_type.toLowerCase()} seed variety by Balvan Agro.`
  );
}