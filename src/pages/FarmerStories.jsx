import React, { useState } from "react";
import { testimonials, videos, images } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import TestimonialCard from "@/components/site/TestimonialCard";
import VideoModal from "@/components/site/VideoModal";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FarmerStories() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);

  const openVideo = (videoId) => {
    const v = videos.find((x) => x.id === videoId);
    if (v) setActive(v);
  };

  return (
    <>
      <Seo {...seoConfig["/farmer-stories"]} />
      <PageHero
        eyebrow={t("stories.eyebrow")}
        title={t("stories.title")}
        subtitle={t("stories.subtitle")}
        image={images.farmer}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("stories.breadcrumb") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 pt-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.id} className="group relative">
              <TestimonialCard t={item} />
              {item.video && (
                <button
                  type="button"
                  onClick={() => openVideo(item.video)}
                  className="absolute right-4 top-4 grid place-items-center w-10 h-10 rounded-full bg-white/90 text-primary shadow-soft transition hover:bg-white focus-ring"
                  aria-label={t("stories.watchVideo")}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 translate-x-0.5 fill-current"><path d="M8 5v14l11-7z" /></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </>
  );
}