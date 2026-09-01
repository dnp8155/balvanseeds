import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { fetchFeaturedVarieties, fetchPublishedCategories, buildCategoryLookup, toSeedCardProps } from "@/lib/seedCatalog";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FeaturedSeeds() {
  const [varieties, setVarieties] = useState([]);
  const [lookup, setLookup] = useState({ byId: {}, bySlug: {} });
  const [loading, setLoading] = useState(true);
  const { t, tc } = useLanguage();

  useEffect(() => {
    let active = true;
    Promise.all([fetchFeaturedVarieties(6), fetchPublishedCategories()])
      .then(([vars, cats]) => {
        if (!active) return;
        setVarieties(vars);
        setLookup(buildCategoryLookup(cats));
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loading && varieties.length === 0) return null;
  const cards = varieties.map((v) => toSeedCardProps(v, lookup));
  const [feature, ...rest] = cards;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading
            eyebrow={t("home.featured.eyebrow")}
            title={t("home.featured.title")}
            description={t("home.featured.desc")}
          />
          <Link to="/seeds" className="group inline-flex items-center gap-2 self-start text-sm font-600 text-primary sm:self-auto">
            {t("common.viewAllSeeds")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="h-80 animate-pulse bg-card/60 lg:col-span-7" />
            <div className="h-80 animate-pulse bg-card/60 lg:col-span-5" />
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Link to={`/seeds/${feature.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-soft transition-all duration-300 group-hover:shadow-lift">
                  <Image src={feature.image} alt={feature.name} className="h-full w-full transition duration-700 group-hover:scale-105" fittingType="fill" />
                </div>
                <div className="mt-5">
                  <p className="text-xs font-600 uppercase tracking-[0.2em] text-gold">{tc(feature.cropName)} · {tc(feature.type)}</p>
                  <h3 className="mt-2 font-heading text-2xl font-600 text-foreground sm:text-3xl">{feature.name}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{tc(feature.short)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-primary">
                    {t("common.viewDetails")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-12">
              <ul className="divide-y divide-border">
                {rest.slice(0, 4).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/seeds/${s.slug}`} className="group flex items-center gap-4 py-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden bg-muted">
                        <Image src={s.image} alt={s.name} className="h-full w-full transition duration-700 group-hover:scale-110" fittingType="fill" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-600 uppercase tracking-[0.2em] text-gold">{tc(s.cropName)}</p>
                        <h3 className="mt-0.5 line-clamp-1 font-heading text-base font-600 text-foreground">{s.name}</h3>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{tc(s.short)}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}