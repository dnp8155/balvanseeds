import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Star, RefreshCw, X, Calculator } from "lucide-react";
import {
  fetchPublishedCategories,
  fetchPublishedVarieties,
  buildCategoryLookup,
  toSeedCardProps,
} from "@/lib/seedCatalog";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SeedsHero from "@/components/site/seeds/SeedsHero";
import SeedGridCard from "@/components/site/seeds/SeedGridCard";
import SeedFilters from "@/components/site/seeds/SeedFilters";
import ExpertAdvice from "@/components/site/seeds/ExpertAdvice";
import EmptyState from "@/components/site/EmptyState";
import SeedCalculator from "@/components/site/seeds/SeedCalculator";
import { cn } from "@/lib/utils";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Seeds() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || searchParams.get("query") || "");
  const [crop, setCrop] = useState(searchParams.get("crop") || "all");
  const [type, setType] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [categories, setCategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const { t, tc } = useLanguage();
  const types = ["Hybrid", "Improved"];

  useEffect(() => {
    setCrop(searchParams.get("crop") || "all");
    const qFromUrl = searchParams.get("q") || searchParams.get("query") || "";
    if (qFromUrl !== query) {
      setQuery(qFromUrl);
    }
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
      .catch(() => { if (!active) return; setError(true); setLoading(false); });
    return () => { active = false; };
  }, [reloadKey]);

  const setCropParam = (value) => {
    setCrop(value);
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete("crop");
    else next.set("crop", value);
    setSearchParams(next, { replace: true });
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    const next = new URLSearchParams(searchParams);
    if (!val.trim()) {
      next.delete("q");
      next.delete("query");
    } else {
      next.set("q", val);
    }
    setSearchParams(next, { replace: true });
  };

  const lookup = useMemo(() => buildCategoryLookup(categories), [categories]);

  const filtered = useMemo(() => {
    const cropId = crop === "all" ? null : lookup.bySlug[crop]?.id;
    const q = query.trim().toLowerCase();
    return varieties.filter((v) => {
      const cat = lookup.byId[v.crop_category_id];
      const cropName = cat ? cat.name.toLowerCase() : "";
      const matchesQuery = q === "" || v.variety_name.toLowerCase().includes(q) || cropName.includes(q) || (v.short_description || "").toLowerCase().includes(q);
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
    const next = new URLSearchParams();
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <Seo {...seoConfig["/seeds"]} />
      <SeedsHero />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-2">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("seeds.breadcrumb") }]} />
      </div>
      <SeedFilters
        categories={categories}
        crop={crop}
        setCrop={setCropParam}
        query={query}
        setQuery={handleQueryChange}
        type={type}
        setType={setType}
        featured={featuredOnly}
        setFeatured={setFeaturedOnly}
        clearCrop={() => setCropParam("all")}
      />
      <section className="bg-background pt-10 pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Seed Calculator Toggle Banner */}
          <div className="mb-10 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-leaf-soft/40 to-cream/40 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-600 text-foreground sm:text-xl">
                    {tc("Farmer's Seed Rate & Acreage Calculator")}
                  </h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {tc("Calculate exact seed kilograms, pack sizes, and spacing for your field (in Acre, Bigha or Hectare).")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCalculator((v) => !v)}
                className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-700 transition ${
                  showCalculator
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-leaf shadow-soft"
                }`}
              >
                <Calculator className="h-4 w-4" />
                {showCalculator ? tc("Hide Calculator") : tc("Open Seed Calculator")}
              </button>
            </div>

            {showCalculator && (
              <div className="mt-6 animate-fade-up">
                <SeedCalculator initialCrop={crop !== "all" ? crop : ""} />
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" /></div>
          ) : error ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
              <p className="text-base font-600 text-foreground">{t("seeds.loadError")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("seeds.loadErrorDesc")}</p>
              <button type="button" onClick={() => setReloadKey((k) => k + 1)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring"><RefreshCw className="w-4 h-4" /> {t("common.retry")}</button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <span className="text-xs font-600 uppercase tracking-[0.2em] text-[#8b7355]">{tc("Seed Catalogue")}</span>
                <h2 className="mt-2 font-heading text-4xl font-400 leading-[1.1] text-foreground lg:text-[40px]">{tc("Explore Our Seed Varieties")}</h2>
              </div>
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{t("seeds.showing")} <span className="font-600 text-foreground">{filtered.length}</span> {filtered.length === 1 ? t("seeds.variety") : t("seeds.varieties")}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCalculator((v) => !v)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-xs font-600 text-primary transition hover:bg-primary/10"
                  >
                    <Calculator className="h-3.5 w-3.5" />
                    {tc("Calculate Dosage")}
                  </button>
                  {hasFilters && (
                    <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-[18px] py-1.5 text-xs font-600 text-foreground transition-colors duration-200 hover:border-leaf hover:text-leaf focus-ring"><X className="w-3.5 h-3.5" /> {t("common.clearFilters")}</button>
                  )}
                </div>
              </div>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((v, i) => (
                    <SeedGridCard key={v.id} seed={toSeedCardProps(v, lookup)} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyState title={t("seeds.noMatchTitle")} description={t("seeds.noMatchDesc")} action={<button type="button" onClick={clearFilters} className="rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring">{t("common.clearFilters")}</button>} />
              )}
            </>
          )}
        </div>
      </section>
      <ExpertAdvice />
    </>
  );
}