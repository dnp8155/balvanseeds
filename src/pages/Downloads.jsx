import React, { useState, useMemo } from "react";
import { downloads, downloadCategories, images } from "@/lib/siteData";
import ResourcePageHeader from "@/components/site/ResourcePageHeader";
import DownloadCard from "@/components/site/DownloadCard";
import SectionHeading from "@/components/site/SectionHeading";
import FilterPills from "@/components/site/FilterPills";
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
      <ResourcePageHeader path="/downloads" prefix="downloads" image={images.seed} />
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <FilterPills options={[t("downloads.all"), ...downloadCategories]} value={category} onChange={setCategory} />
      </section>
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => <DownloadCard key={d.id} item={d} />)}
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