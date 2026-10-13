import React from "react";
import { Link } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SeedFilters({ categories, crop, query, setQuery, type, setType, featured, setFeatured, clearCrop }) {
  const { t, tc } = useLanguage();
  const chip = (active) =>
    `inline-flex items-center gap-1.5 rounded-full border bg-card px-[18px] py-2.5 text-[13px] font-600 transition-colors duration-200 focus-ring ${
      active
        ? "border-primary bg-primary text-primary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
        : "border-border text-foreground hover:border-leaf hover:text-leaf"
    }`;
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* Crop pills */}
      <div className="flex flex-wrap gap-2.5 pt-6">
        <button type="button" onClick={clearCrop} className={chip(crop === "all")}>
          {t("seeds.allCrops")}
        </button>
        {categories.map((c) => (
          <Link key={c.id} to={`/seeds/crop/${c.slug}`} className={chip(crop === c.slug)}>
            {tc(c.name)}
          </Link>
        ))}
      </div>
      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3.5 border-b border-border py-4">
        <label className="flex min-w-[260px] items-center gap-2.5 rounded-full border border-border bg-card px-[18px] py-2.5 text-sm text-muted-foreground transition-colors hover:border-leaf focus-within:border-leaf focus-within:shadow-[0_0_0_3px_rgba(63,122,82,0.15)]">
          <Search className="h-4 w-4 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("seeds.searchPlaceholder")}
            aria-label={t("seeds.searchPlaceholder")}
            className="w-full border-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
        {["all", "Hybrid", "Improved"].map((tp) => (
          <button key={tp} type="button" onClick={() => setType(tp)} className={chip(type === tp)}>
            {tp === "all" ? t("common.all") : tc(tp)}
          </button>
        ))}
        <span className="flex-1" />
        <button type="button" onClick={() => setFeatured(!featured)} className={chip(featured)}>
          <Star className={`h-3 w-3 ${featured ? "text-primary-foreground" : "text-gold"}`} fill="currentColor" strokeWidth={0} />
          {t("common.featured")}
        </button>
      </div>
    </section>
  );
}