import { supaSelect } from "../../shared/supabaseRest.ts";

// Dynamic XML sitemap for balvanagro.com. Serves all static pages plus every
// published crop category, seed variety and news article, so the sitemap
// stays fresh as admins add content — no manual edits needed.
const SITE_DOMAIN = "https://www.balvanagro.com";

const STATIC_PAGES = [
  { path: "/", freq: "weekly", priority: "1.0" },
  { path: "/about", freq: "monthly", priority: "0.7" },
  { path: "/seeds", freq: "weekly", priority: "0.9" },
  { path: "/certificates", freq: "monthly", priority: "0.6" },
  { path: "/farmer-stories", freq: "monthly", priority: "0.7" },
  { path: "/videos", freq: "monthly", priority: "0.6" },
  { path: "/gallery", freq: "monthly", priority: "0.6" },
  { path: "/newsroom", freq: "weekly", priority: "0.8" },
  { path: "/downloads", freq: "monthly", priority: "0.6" },
  { path: "/contact", freq: "monthly", priority: "0.7" },
  { path: "/species", freq: "monthly", priority: "0.7" },
  { path: "/import-export", freq: "monthly", priority: "0.7" },
  { path: "/ask-expert", freq: "monthly", priority: "0.7" },
  { path: "/faq", freq: "monthly", priority: "0.6" },
  { path: "/compare", freq: "monthly", priority: "0.6" },
  { path: "/dealers", freq: "weekly", priority: "0.8" },
  { path: "/become-dealer", freq: "monthly", priority: "0.7" },
];

const HREFLANGS = ["en-in", "hi-in", "gu-in", "x-default"];

function escapeXml(s) {
  return String(s || "").replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c])
  );
}

function urlEntry(path, freq, priority, lastmod) {
  const loc = `${SITE_DOMAIN}${path}`;
  const mod = lastmod || new Date().toISOString().slice(0, 10);
  let xml = `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${mod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>`;
  for (const hl of HREFLANGS) {
    xml += `\n    <xhtml:link rel="alternate" hreflang="${hl}" href="${escapeXml(loc)}"/>`;
  }
  return xml + `\n  </url>`;
}

function dayOf(value) {
  const s = String(value || "");
  return s.length >= 10 ? s.slice(0, 10) : "";
}

export default async function(req) {
  try {
    const [crops, seeds, articles] = await Promise.all([
      supaSelect("crop_categories", { status: "published" }, { sort: "display_order", limit: 200 }),
      supaSelect("seed_varieties", { status: "published" }, { sort: "display_order", limit: 500 }),
      supaSelect("news_articles", { status: "published" }, { sort: "-published_date", limit: 200 }),
    ]);

    const lines = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ];
    for (const p of STATIC_PAGES) lines.push(urlEntry(p.path, p.freq, p.priority));
    for (const c of crops) lines.push(urlEntry(`/crops/${c.slug}`, "weekly", "0.7", dayOf(c.updated_date || c.created_date)));
    for (const s of seeds) lines.push(urlEntry(`/seeds/${s.slug}`, "weekly", "0.8", dayOf(s.updated_date || s.created_date)));
    for (const a of articles) lines.push(urlEntry(`/newsroom/${a.slug}`, "weekly", "0.7", dayOf(a.published_date || a.updated_date || a.created_date)));
    lines.push(`</urlset>`);

    return new Response(lines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}