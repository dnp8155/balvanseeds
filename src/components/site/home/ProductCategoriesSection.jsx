import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { fetchPublishedVarieties } from "@/lib/seedCatalog";
import { fetchSettings } from "@/lib/siteSettings";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ROTATE_INTERVAL = 3000;
const VISIBLE_COUNT = 6;

function ProductCard({ seed, tc }) {
  const name = seed.variety_name || seed.name;
  const image = seed.thumbnail_image || seed.image;
  const slug = seed.slug;

  return (
    <Link
      to={`/seeds/${slug}`}
      className="group block overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F] focus-visible:ring-offset-2"
      aria-label={tc(name)}
    >
      <div className="relative aspect-square overflow-hidden bg-[#F9F8F4]">
        <Image
          src={image}
          alt={tc(name)}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          fittingType="fit"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-3.5 py-3.5">
        <h3 className="text-[13px] font-700 leading-snug text-[#000000] line-clamp-1">
          {tc(name)}
        </h3>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2D6A4F] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1B4332]">
          <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}

export default function ProductCategoriesSection() {
  const { tc } = useLanguage();
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  // Single shared offset — all 6 cards show consecutive unique products
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [all, settings] = await Promise.all([
          fetchPublishedVarieties(),
          fetchSettings("home_page"),
        ]);
        if (!active) return;
        const selectedIds = settings.wide_range_seeds
          ? settings.wide_range_seeds.split(",").filter(Boolean)
          : [];
        if (selectedIds.length > 0) {
          const selected = selectedIds
            .map((id) => all.find((s) => s.id === id))
            .filter(Boolean);
          setSeeds(selected.length > 0 ? selected : all);
        } else {
          setSeeds(all);
        }
      } catch (e) {
        // silent fail
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // Rotate the whole row together — every card shifts by 1, keeping all unique
  useEffect(() => {
    if (seeds.length <= VISIBLE_COUNT) return;
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % seeds.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [seeds.length]);

  const visible = seeds.length
    ? Array.from({ length: Math.min(VISIBLE_COUNT, seeds.length) }, (_, i) =>
        seeds[(offset + i) % seeds.length]
      )
    : [];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[650px] text-center"
        >
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-px w-8 bg-[#1B4332]" />
            <span className="text-[11px] font-700 uppercase tracking-[0.15em] text-[#1B4332]">
              {tc("Our Products")}
            </span>
            <span className="h-px w-8 bg-[#1B4332]" />
          </div>
          <h2 className="mt-3.5 font-heading text-[30px] font-700 leading-tight text-[#1B4332] sm:text-[32px] lg:text-[34px]">
            {tc("Wide Range of Premium Seeds")}
          </h2>
          <p className="mx-auto mt-3 max-w-[650px] text-[13px] leading-relaxed text-[#4A4A4A] sm:text-sm">
            {tc("We offer a diverse range of high-quality seeds for various crops, designed to meet the needs of modern farmers and ensure maximum productivity.")}
          </p>
        </motion.div>

        {/* Card grid — each card rotates independently */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:mt-12 lg:grid-cols-6 lg:gap-5">
          {loading
            ? Array.from({ length: VISIBLE_COUNT }).map((_, i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-black/5 bg-white">
                  <div className="aspect-[16/10] bg-gray-200" />
                  <div className="flex items-center justify-between px-3.5 py-3.5">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="h-6 w-6 rounded-full bg-gray-200" />
                  </div>
                </div>
              ))
            : visible.map((seed, i) => (
                <AnimatePresence mode="wait" key={`${i}-${offset}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ProductCard seed={seed} tc={tc} />
                  </motion.div>
                </AnimatePresence>
              ))}
        </div>
      </div>
    </section>
  );
}
