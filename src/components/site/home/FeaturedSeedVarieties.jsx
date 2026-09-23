import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchPublishedVarieties } from "@/lib/seedCatalog";
import { fetchSettings } from "@/lib/siteSettings";
import FeaturedSeedCard from "./FeaturedSeedCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FeaturedSeedVarieties() {
  const { tc } = useLanguage();
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [all, settings] = await Promise.all([
          fetchPublishedVarieties(),
          fetchSettings("home_page"),
        ]);
        if (!active) return;
        const selectedIds = settings.best_performing_seeds
          ? settings.best_performing_seeds.split(",").filter(Boolean)
          : [];
        if (selectedIds.length > 0) {
          const selected = selectedIds
            .map((id) => all.find((s) => s.id === id))
            .filter(Boolean);
          setSeeds(selected.slice(0, 4));
        } else {
          // Fall back to featured, then first 4
          const featured = all.filter((s) => s.is_featured);
          setSeeds((featured.length >= 4 ? featured : all).slice(0, 4));
        }
      } catch (e) {
        // silent fail — section just won't render cards
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-[600px]"
          >
            <span className="text-[11px] font-700 uppercase tracking-[0.15em] text-[#2D4B34]">
              {tc("Featured Seed Varieties")}
            </span>
            <h2 className="mt-2.5 font-heading text-[28px] font-700 leading-tight text-[#1A1A1A] sm:text-[32px] lg:text-[34px]">
              {tc("Our Best-Performing Varieties")}
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-[#5A5A5A] sm:text-sm">
              {tc("Trusted by farmers for their consistent performance and higher yields.")}
            </p>
          </motion.div>

          {/* View All Seeds button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/seeds"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#2D4B34] px-5 py-2.5 text-[13px] font-600 text-[#2D4B34] transition-all duration-300 hover:bg-[#2D4B34] hover:text-white"
            >
              {tc("View All Seeds")}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>

        {/* Card grid — 4 columns */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl border border-black/5 bg-white">
                  <div className="aspect-[4/3] rounded-t-xl bg-gray-200" />
                  <div className="space-y-2 p-4">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="flex gap-1.5 pt-1">
                      <div className="h-5 w-16 rounded-full bg-gray-200" />
                      <div className="h-5 w-14 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))
            : seeds.map((seed, i) => (
                <motion.div
                  key={seed.id || seed.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <FeaturedSeedCard seed={seed} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}