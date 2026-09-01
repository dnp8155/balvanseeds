import React, { useState, useMemo } from "react";
import { downloads, downloadCategories, images } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import DownloadCard from "@/components/site/DownloadCard";
import SectionHeading from "@/components/site/SectionHeading";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Downloads() {
  const { t, tc } = useLanguage();
  const [category, setCategory] = useState(t("downloads.all"));

  const filtered = useMemo(() => {
    if (category === t("downloads.all")) return downloads;
    return downloads.filter((d) => d.category === category);
  }, [category, t]);

  return (
    <>
      <Seo {...seoConfig["/downloads"]} />
      <PageHero
        eyebrow={t("downloads.eyebrow")}
        title={t("downloads.title")}
        subtitle={t("downloads.subtitle")}
        image={images.seed}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("downloads.breadcrumb") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2">
          {[t("downloads.all"), ...downloadCategories].map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={`rounded-full px-4 py-1.5 text-sm font-600 transition focus-ring ${category === c ? "bg-primary text-primary-foreground" : "bg-leaf-soft text-leaf hover:bg-leaf/15"}`}>{tc(c)}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <DownloadCard key={d.id} item={d} />
          ))}
        </div>
      </section>

      <section className="bg-cream/60 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <SectionHeading align="center" eyebrow={t("downloads.printedEyebrow")} title={t("downloads.printedTitle")} description={t("downloads.printedDesc")} />
        </div>
      </section>
    </>
  );
}