import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { fetchPublishedCategories } from "@/lib/seedCatalog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProductCarousel() {
  const { tc } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetchPublishedCategories()
      .then((cats) => {
        if (active) setCategories(cats);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector("[data-card]");
    const cardWidth = card ? card.offsetWidth + 20 : 260;
    container.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="bg-[#F9FBF9]">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto h-3 w-28 bg-border rounded animate-pulse" />
            <div className="mx-auto mt-4 h-8 w-2/3 bg-border rounded animate-pulse" />
            <div className="mx-auto mt-3 h-4 w-full bg-border/50 rounded animate-pulse" />
          </div>
          <div className="mt-10 flex gap-5 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[240px] flex-shrink-0">
                <div className="aspect-[4/3] bg-border/50 rounded-lg animate-pulse" />
                <div className="mt-3 h-5 w-2/3 bg-border/50 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="bg-[#F9FBF9]">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-px w-8 bg-[#2E5B2E]" />
            <span className="text-[11px] font-600 uppercase tracking-[0.2em] text-[#2E5B2E]">
              {tc("Our Products")}
            </span>
            <span className="h-px w-8 bg-[#2E5B2E]" />
          </div>
          <h2 className="mt-3 font-heading text-2xl font-700 leading-tight text-[#1F1F1F] sm:text-3xl">
            {tc("Wide Range of Premium Seeds")}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#4A4A4A]">
            {tc("We offer a diverse range of high-quality seeds for various crops, designed to meet the needs of modern farmers and ensure maximum productivity.")}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2 shadow-sm transition hover:border-[#2E5B2E] hover:bg-[#2E5B2E] hover:text-white lg:flex"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2 shadow-sm transition hover:border-[#2E5B2E] hover:bg-[#2E5B2E] hover:text-white lg:flex"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/seeds?crop=${cat.slug}`}
                data-card
                className="group block min-w-[220px] flex-shrink-0 snap-start sm:min-w-[240px] lg:min-w-[220px]"
              >
                <div className="overflow-hidden rounded-lg bg-card shadow-sm transition duration-300 group-hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.cover_image || images.fieldTexture}
                      alt={cat.name}
                      className="h-full w-full transition duration-500 group-hover:scale-105"
                      fittingType="fill"
                      focalPointX={0.5}
                      focalPointY={0.45}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 px-3.5 py-3">
                    <h3 className="text-sm font-600 leading-snug text-[#1F1F1F]">
                      {tc(cat.name)}
                    </h3>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2E5B2E] text-white transition duration-300 group-hover:bg-gold">
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}