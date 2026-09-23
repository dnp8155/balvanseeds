import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Star, RefreshCw, X } from "lucide-react";
import {
  fetchPublishedCategories,
  fetchPublishedVarieties,
  buildCategoryLookup,
  toSeedCardProps,
} from "@/lib/seedCatalog";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SeedsHero from "@/components/site/seeds/SeedsHero";
import SeedCatalogCard from "@/components/site/seeds/SeedCatalogCard";
import ExpertAdvice from "@/components/site/seeds/ExpertAdvice";
import EmptyState from "@/components/site/EmptyState";
import { cn } from "@/lib/utils";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Seeds() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [crop, setCrop] = useState(searchParams.get("crop") || "all");
  const [type, setType] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const [categories, setCategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const { t, tc } = useLanguage();

  const types = ["Hybrid", "Improved"];

  useEffect(() => {
    setCrop(searchParams.get("crop") || "all");
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    Promise.all([fetchPublishedCategories(), fetchPublishedVarieties()])
      .then(([cats, vars]) => {
        if (!active) return;
        setCategories(cats);
        setVarieties(vars);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError(true);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const setCropParam = (value) => {
    setCrop(value);
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete("crop");
    else next.set("crop", value);
    setSearchParams(next, { replace: true });
  };

  const lookup = useMemo(() => buildCategoryLookup(categories), [categories]);

  const filtered = useMemo(() => {
    const cropId = crop === "all" ? null : lookup.bySlug[crop]?.id;
    const q = query.trim().toLowerCase();
    return varieties.filter((v) => {
      const cat = lookup.byId[v.crop_category_id];
      const cropName = cat ? cat.name.toLowerCase() : "";
      const matchesQuery =
        q === "" ||
        v.variety_name.toLowerCase().includes(q) ||
        cropName.includes(q) ||
        (v.short_description || "").toLowerCase().includes(q);
      const matchesCrop = !cropId || v.crop_category_id === cropId;
      const matchesType = type === "all" || v.variety_type === type;
      const matchesFeatured = !featuredOnly || v.is_featured === true;
      return matchesQuery && matchesCrop && matchesType && matchesFeatured;
    });
  }, [query, crop, type, featuredOnly, varieties, lookup]);

  const hasFilters = query.trim() !== "" || crop !== "all" || type !== "all" || featuredOnly;

  const clearFilters = () => {
    setQuery("");
    setCropParam("all");
    setType("all");
    setFeaturedOnly(false);
  };

  return (
    <>
      <Seo {...seoConfig["/seeds"]} />
      <SeedsHero />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-2">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("seeds.breadcrumb") }]} />
      </div>

      {/* Filter bar */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Crop pills — "All" filters here; crop pills link to dedicated crop pages */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCropParam("all")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-600 transition focus-ring",
                crop === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:bg-leaf-soft"
              )}
            >
              {t("seeds.allCrops")}
            </button>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/seeds/crop/${c.slug}`}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-600 transition focus-ring",
                  crop === c.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground/70 hover:bg-leaf-soft"
                )}
              >
                {tc(c.name)}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("seeds.searchPlaceholder")}
              className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm focus-ring"
              aria-label={t("seeds.searchPlaceholder")}
            />
          </div>
        </div>

        {/* Type + Featured filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-600 uppercase tracking-wider text-muted-foreground">
            {t("seeds.type")}
          </span>
          <button
            type="button"
            onClick={() => setType("all")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-600 transition focus-ring",
              type === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground/70 hover:bg-leaf-soft"
            )}
          >
            {t("common.all")}
          </button>
          {types.map((tp) => (
            <button
              key={tp}
              type="button"
              onClick={() => setType(tp)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-600 transition focus-ring",
                type === tp
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:bg-leaf-soft"
              )}
            >
              {tc(tp)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setFeaturedOnly((f) => !f)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-600 transition focus-ring",
              featuredOnly
                ? "bg-gold text-accent-foreground"
                : "bg-muted text-foreground/70 hover:bg-gold-soft"
            )}
          >
            <Star className="w-3.5 h-3.5" /> {t("common.featured")}
          </button>
        </div>
      </section>

      {/* Product grid — full-width zig-zag rows */}
      <section className="bg-background pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
              <p className="text-base font-600 text-foreground">{t("seeds.loadError")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("seeds.loadErrorDesc")}</p>
              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring"
              >
                <RefreshCw className="w-4 h-4" /> {t("common.retry")}
              </button>
            </div>
          ) : (
            <>
              {/* Section title */}
              <div className="mb-8 text-center">
                <span className="text-xs font-600 uppercase tracking-[0.2em] text-[#8b7355]">
                  {tc("Seed Catalogue")}
                </span>
                <h2 className="mt-2 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl">
                  {tc("Explore Our Seed Varieties")}
                </h2>
              </div>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {t("seeds.showing")} <span className="font-600 text-foreground">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? t("seeds.variety") : t("seeds.varieties")}
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring"
                  >
                    <X className="w-3.5 h-3.5" /> {t("common.clearFilters")}
                  </button>
                )}
              </div>

              {filtered.length > 0 ? (
                <div className="flex flex-col gap-8">
                  {filtered.map((v, i) => {
                    const props = toSeedCardProps(v, lookup);
                    return <SeedCatalogCard key={v.id} seed={props} index={i} />;
                  })}
                </div>
              ) : (
                <EmptyState
                  title={t("seeds.noMatchTitle")}
                  description={t("seeds.noMatchDesc")}
                  action={
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring"
                    >
                      {t("common.clearFilters")}
                    </button>
                  }
                />
              )}
            </>
          )}
        </div>
      </section>

      <ExpertAdvice />
    </>
  );
}