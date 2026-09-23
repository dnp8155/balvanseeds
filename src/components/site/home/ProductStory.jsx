import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images, whatsappLink } from "@/lib/siteData";
import { fetchFeaturedVarieties, fetchPublishedCategories, buildCategoryLookup } from "@/lib/seedCatalog";

const AUTO_ROTATE_MS = 5000;

export default function ProductStory() {
  const { t, tc } = useLanguage();
  const [products, setProducts] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchFeaturedVarieties(20), fetchPublishedCategories()])
      .then(([vars, cats]) => {
        if (!active) return;
        if (vars && vars.length) {
          const lookup = buildCategoryLookup(cats);
          const mapped = vars.map((v) => {
            const cat = lookup.byId[v.crop_category_id];
            return {
              slug: v.slug,
              name: v.variety_name,
              cropName: (cat && cat.name) || "Seeds",
              type: v.variety_type,
              image: v.thumbnail_image || (cat && cat.cover_image) || images.fieldTexture,
              short: v.short_description || "",
              characteristics: v.key_features || [],
              season: v.suitable_season || "",
              region: v.recommended_regions || "",
              maturity: v.maturity_duration || "",
            };
          });
          if (active) setProducts(mapped);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const next = useCallback(() => {
    setActiveIdx((i) => (i + 1) % Math.max(products.length, 1));
  }, [products.length]);

  const prev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + Math.max(products.length, 1)) % Math.max(products.length, 1));
  }, [products.length]);

  // Auto-rotate
  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [next, products.length]);

  // Reset index if out of bounds
  useEffect(() => {
    if (activeIdx >= products.length && products.length > 0) {
      setActiveIdx(0);
    }
  }, [products.length, activeIdx]);

  // Don't render anything if no real products in database
  if (!loading && products.length === 0) return null;

  const featured = products[activeIdx];

  // Loading skeleton
  if (loading || !featured) {
    return (
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center justify-center bg-sage/30 p-6" style={{ aspectRatio: "16 / 11" }}>
                <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="h-4 w-12 bg-border rounded animate-pulse" />
              <div className="mt-6 h-3 w-24 bg-border rounded animate-pulse" />
              <div className="mt-3 h-10 w-3/4 bg-border rounded animate-pulse" />
              <div className="mt-5 h-4 w-full bg-border rounded animate-pulse" />
              <div className="mt-2 h-4 w-5/6 bg-border rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="lg:col-span-7">
            <div className="relative flex items-center justify-center overflow-hidden bg-white p-6">
              <Image
                key={featured.slug}
                src={featured.image || images.fieldTexture}
                alt={`${featured.name} — ${featured.cropName} seed variety`}
                className="aspect-[16/11] w-full animate-fade-up"
                fittingType="fit"
              />
              {/* Navigation arrows */}
              {products.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous product"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/90 border border-border shadow-soft transition hover:bg-primary hover:text-primary-foreground focus-ring"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next product"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white/90 border border-border shadow-soft transition hover:bg-primary hover:text-primary-foreground focus-ring"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-5">
            <span className="inline-block h-px w-12 bg-gold" />
            <p className="mt-6 text-xs font-500 uppercase tracking-[0.15em] text-muted-foreground">{tc("Featured variety")}</p>
            <h2 key={`name-${featured.slug}`} className="mt-3 font-heading text-4xl font-400 leading-tight text-foreground sm:text-5xl animate-fade-up">
              {featured.name}
            </h2>
            <p key={`meta-${featured.slug}`} className="mt-4 text-sm font-500 text-muted-foreground animate-fade-up">{featured.cropName} · {featured.type}</p>
            <p key={`short-${featured.slug}`} className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground animate-fade-up">
              {featured.short}
            </p>

            {/* Technical info */}
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6">
              <div>
                <p className="text-xs text-muted-foreground">{t("common.maturity")}</p>
                <p className="mt-1 font-heading text-lg font-400 text-foreground">{featured.maturity || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t("common.season")}</p>
                <p className="mt-1 font-heading text-lg font-400 text-foreground">{featured.season || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t("common.region")}</p>
                <p className="mt-1 font-heading text-lg font-400 text-foreground">{featured.region || "—"}</p>
              </div>
            </div>

            {/* Key features */}
            {featured.characteristics && featured.characteristics.length > 0 && (
              <ul key={`feat-${featured.slug}`} className="mt-8 space-y-2.5 border-t border-border pt-6 animate-fade-up">
                {featured.characteristics.slice(0, 4).map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                    {c}
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to={`/seeds/${featured.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-600 text-primary transition"
              >
                {tc("View Variety")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <span className="h-4 w-px bg-border" />
              <a
                href={whatsappLink(`Hello, I'm interested in ${featured.name} seeds.`)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-600 text-foreground/70 transition hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire
              </a>
            </div>

            {/* Dot indicators */}
            {products.length > 1 && (
              <div className="mt-10 flex items-center gap-2">
                {products.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Show ${p.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 focus-ring ${i === activeIdx ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground/50"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}