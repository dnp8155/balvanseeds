import React, { useState, useMemo } from "react";
import { videos, videoCategories, images } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import VideoCard from "@/components/site/VideoCard";
import VideoModal from "@/components/site/VideoModal";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Videos() {
  const { t, tc } = useLanguage();
  const [category, setCategory] = useState(t("videos.all"));
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (category === t("videos.all")) return videos;
    return videos.filter((v) => v.category === category);
  }, [category, t]);

  return (
    <>
      <Seo {...seoConfig["/videos"]} />
      <PageHero
        eyebrow={t("videos.eyebrow")}
        title={t("videos.title")}
        subtitle={t("videos.subtitle")}
        image={images.fieldTexture}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("videos.breadcrumb") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2">
          {[t("videos.all"), ...videoCategories].map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={`rounded-full px-4 py-1.5 text-sm font-600 transition focus-ring ${category === c ? "bg-primary text-primary-foreground" : "bg-leaf-soft text-leaf hover:bg-leaf/15"}`}>{tc(c)}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <VideoCard key={v.id} video={v} onPlay={setActive} />
          ))}
        </div>
      </section>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </>
  );
}