import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { news, newsCategories, images } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import NewsCard from "@/components/site/NewsCard";
import EmptyState from "@/components/site/EmptyState";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function News() {
  const { t, tc } = useLanguage();
  const [category, setCategory] = useState(t("news.all"));
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return news.filter((a) => {
      const matchesCat = category === t("news.all") || a.category === category;
      const matchesQuery = query.trim() === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [category, query, t]);

  const [featured, ...rest] = filtered;

  return (
    <>
      <Seo {...seoConfig["/news"]} />
      <PageHero
        eyebrow={t("news.eyebrow")}
        title={t("news.title")}
        subtitle={t("news.subtitle")}
        image={images.fieldTexture}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("news.breadcrumb") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("news.searchPlaceholder")} className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm focus-ring" aria-label={t("news.searchPlaceholder")} />
          </div>
          <div className="flex flex-wrap gap-2">
            {[t("news.all"), ...newsCategories].map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)} className={`rounded-full px-4 py-1.5 text-sm font-600 transition focus-ring ${category === c ? "bg-primary text-primary-foreground" : "bg-leaf-soft text-leaf hover:bg-leaf/15"}`}>{tc(c)}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {filtered.length === 0 ? (
          <EmptyState title={t("news.noMatchTitle")} description={t("news.noMatchDesc")} action={<button type="button" onClick={() => { setQuery(""); setCategory(t("news.all")); }} className="rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground">{t("common.clearFilters")}</button>} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <NewsCard article={featured} featured />
            <div className="grid gap-6 sm:grid-cols-2 content-start">
              {rest.map((a) => (
                <NewsCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}