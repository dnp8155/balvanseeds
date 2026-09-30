import { useEffect } from "react";
import { site } from "@/lib/siteData";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Seo — sets document title, meta description, Open Graph, Twitter Card,
 * canonical link, robots directive and optional JSON-LD structured data
 * for the current page. Cleans up JSON-LD on unmount to avoid duplicates.
 */
export default function Seo({ title, description, image, canonical, jsonLd, noindex, keywords, ogType = "website", publishedTime, modifiedTime, imageAlt }) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    const url = canonical || window.location.href;
    const img = image || site.ogImage || "";

    upsertMeta("name", "description", description || "");
    upsertMeta("name", "keywords", keywords || "");
    upsertMeta("property", "og:title", title || "");
    upsertMeta("property", "og:description", description || "");
    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", site.name);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:image:width", img ? "1200" : "");
    upsertMeta("property", "og:image:height", img ? "630" : "");
    upsertMeta("property", "og:image:alt", imageAlt || title || "");
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("property", "article:published_time", publishedTime || "");
    upsertMeta("property", "article:modified_time", modifiedTime || "");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title || "");
    upsertMeta("name", "twitter:description", description || "");
    upsertMeta("name", "twitter:image", img);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    let canon = document.head.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", url);

    let script;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      script.setAttribute("data-seo-jsonld", "true");
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      if (script) script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, canonical, noindex, keywords, ogType, publishedTime, modifiedTime, imageAlt, JSON.stringify(jsonLd)]);

  return null;
}
