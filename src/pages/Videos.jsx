import React, { useState, useMemo } from "react";
import { videos, videoCategories, images } from "@/lib/siteData";
import ResourcePageHeader from "@/components/site/ResourcePageHeader";
import VideoCard from "@/components/site/VideoCard";
import VideoModal from "@/components/site/VideoModal";
import FilterPills from "@/components/site/FilterPills";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Videos() {
  const { t } = useLanguage();
  const [category, setCategory] = useState(t("videos.all"));
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (category === t("videos.all")) return videos;
    return videos.filter((v) => v.category === category);
  }, [category, t]);

  return (
    <>
      <ResourcePageHeader path="/videos" prefix="videos" image={images.fieldTexture} />
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">
        <FilterPills options={[t("videos.all"), ...videoCategories]} value={category} onChange={setCategory} />
      </section>
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => <VideoCard key={v.id} video={v} onPlay={setActive} />)}
        </div>
      </section>
      <VideoModal video={active} onClose={() => setActive(null)} />
    </>
  );
}