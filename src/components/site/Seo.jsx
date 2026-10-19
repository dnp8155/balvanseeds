import { useEffect } from "react";
import { site } from "@/lib/siteData";
import { ORGANIZATION_JSONLD, WEBSITE_JSONLD } from "@/lib/seoConfig";

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

function upsertLink(rel, href, extra = {}) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
}



/**
 * Seo — sets document title, meta description, keywords, Open Graph, Twitter Card,
 * canonical link, hreflang alternates, geo tags, robots directive and optional
 * JSON-LD structured data for the current page. Cleans up JSON-LD on unmount.
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
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");

    // GEO signals — region, place, coordinates (GEO/AEO for local & answer engines)
    upsertMeta("name", "geo.region", "IN-GJ");
    upsertMeta("name", "geo.placename", "Tharad, Gujarat, India");
    upsertMeta("name", "geo.position", `${site.geo.latitude};${site.geo.longitude}`);
    upsertMeta("name", "ICBM", `${site.geo.latitude}, ${site.geo.longitude}`);

    upsertMeta("name", "theme-color", "#0f3d23");

    // Canonical
    upsertLink("canonical", url);



    let script;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      script.setAttribute("data-seo-jsonld", "true");
      document.head.appendChild(script);
    }

    // Global entity schema — ensures Organization + WebSite recognition on every
    // page (supplements the static block in index.html for SPA route changes).
    let orgScript;
    const hasOrg = document.head.querySelector('script[data-seo-org="true"]');
    if (!hasOrg) {
      orgScript = document.createElement("script");
      orgScript.type = "application/ld+json";
      orgScript.text = JSON.stringify({ "@context": "https://schema.org", "@graph": [ORGANIZATION_JSONLD, WEBSITE_JSONLD] });
      orgScript.setAttribute("data-seo-org", "true");
      document.head.appendChild(orgScript);
    }

    return () => {
      document.title = prevTitle;
      if (script) script.remove();
    };
     
  }, [title, description, image, canonical, noindex, keywords, ogType, publishedTime, modifiedTime, imageAlt, JSON.stringify(jsonLd)]);

  return null;
}