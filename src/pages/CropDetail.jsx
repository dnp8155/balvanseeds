import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  fetchPublishedCategories,
  fetchPublishedVarieties,
  buildCategoryLookup,
  toSeedCardProps,
} from "@/lib/seedCatalog";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SeedCatalogCard from "@/components/site/seeds/SeedCatalogCard";
import ExpertAdvice from "@/components/site/seeds/ExpertAdvice";
import EmptyState from "@/components/site/EmptyState";
import { Image } from "@/components/ui/image";
import Seo from "@/components/site/Seo";
import { seoConfigCropDetail } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CropDetail() {
  const { slug } = useParams();
  const { t, tc } = useLanguage();
  const [category, setCategory] = useState(null);
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    setCategory(null);
    Promise.all([fetchPublishedCategories(), fetchPublishedVarieties()])
      .then(([cats, vars]) => {
        if (!active) return;
        const cat = cats.find((c) => c.slug === slug);
        if (!cat) {
          setError(true);
          setLoading(false);
          return;
        }
        setCategory(cat);
        setVarieties(vars.filter((v) => v.crop_category_id === cat.id));
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
  }, [slug, reloadKey]);

  const lookup = useMemo(
    () => buildCategoryLookup(category ? [category] : []),
    [category]
  );

  const seedCards = useMemo(
    () => varieties.map((v) => toSeedCardProps(v, lookup)),
    [varieties, lookup]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-base font-600 text-foreground">{t("seedDetail.loadError")}</p>
        <p className="mt-1 text-sm text-muted-foreground">This crop category could not be found.</p>
        <Link
          to="/seeds"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf"
        >
          {t("seedDetail.backToSeeds")}
        </Link>
      </div>
    );
  }

  const seo = seoConfigCropDetail(category, varieties);

  return (
    <>
      <Seo {...seo} imageAlt={`${category.name} Seeds | Balavan Agro`} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        {category.cover_image && (
          <>
            <Image
              src={category.cover_image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full opacity-20"
              fittingType="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/85 to-card/40" />
          </>
        )}
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-leaf" />
              <span className="text-[11px] font-600 uppercase tracking-[0.2em] text-leaf">
                {tc("Crop Category")}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-4xl font-600 leading-[1.05] text-foreground sm:text-5xl lg:text-6xl text-balance">
              {tc(category.name)} {tc("Seeds")}
            </h1>
            {category.short_description && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {tc(category.short_description)}
              </p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-leaf-soft px-4 py-2 text-sm font-600 text-leaf">
                {varieties.length} {varieties.length === 1 ? tc("Variety") : tc("Varieties")}
              </span>
              <Link
                to="/seeds"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary"
              >
                {tc("View All Seeds")}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: t("common.home"), to: "/" },
            { label: t("seeds.breadcrumb"), to: "/seeds" },
            { label: tc(category.name) },
          ]}
        />
      </div>

      {/* Full description */}
      {category.full_description && (
        <section className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {tc(category.full_description)}
          </p>
        </section>
      )}

      {/* Seed varieties list */}
      <section className="bg-background pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-600 uppercase tracking-[0.2em] text-[#8b7355]">
              {tc("Available Varieties")}
            </span>
            <h2 className="mt-2 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl">
              {tc(category.name)} {tc("Seed Varieties")}
            </h2>
          </div>

          {seedCards.length > 0 ? (
            <div className="flex flex-col gap-8">
              {seedCards.map((seed, i) => (
                <SeedCatalogCard key={seed.slug} seed={seed} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={tc("No varieties available yet")}
              description={tc(`We're working on adding ${category.name} seed varieties. Check back soon or contact us for availability.`)}
              action={
                <Link
                  to="/contact"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf"
                >
                  {tc("Contact Us")}
                </Link>
              }
            />
          )}
        </div>
      </section>

      <ExpertAdvice />
    </>
  );
}