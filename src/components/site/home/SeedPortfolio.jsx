import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { fetchPublishedCategories } from "@/lib/seedCatalog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SeedPortfolio() {
  const { tc } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchPublishedCategories()
      .then((cats) => {
        if (active) {
          // Show featured first, then fill with remaining — up to 8
          const featured = cats.filter((c) => c.is_featured);
          const rest = cats.filter((c) => !c.is_featured);
          setCategories([...featured, ...rest].slice(0, 8));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  // Asymmetric editorial grid sizes for up to 8 items
  const sizes = ["lg", "sm", "sm", "md", "sm", "sm", "sm", "sm"];

  if (loading) {
    return (
      <section className="bg-cream/50">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex items-center gap-4">
            <div className="h-4 w-12 bg-border rounded animate-pulse" />
            <div className="h-10 w-2/3 bg-border rounded animate-pulse" />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-border/50 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="bg-cream/50">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("Explore our seed catalogue.")}
            </h2>
          </div>
          <Link to="/seeds" className="group inline-flex items-center gap-2 text-sm font-600 text-primary transition">
            View All Seeds
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {categories.map((cat, idx) => {
            const size = sizes[idx % sizes.length];
            const isLarge = size === "lg";
            const isMedium = size === "md";
            return (
              <Link
                key={cat.id}
                to={`/seeds?crop=${cat.slug}`}
                className={`group relative overflow-hidden ${
                  isLarge
                    ? "col-span-2 lg:col-span-2 lg:row-span-2"
                    : isMedium
                    ? "col-span-2 lg:col-span-2"
                    : "col-span-1"
                }`}
              >
                <div className={`relative overflow-hidden ${isLarge ? "aspect-[4/3] lg:aspect-[4/5]" : isMedium ? "aspect-[16/9]" : "aspect-square"}`}>
                  <Image
                    src={cat.cover_image || images.fieldTexture}
                    alt={cat.name}
                    className="h-full w-full transition duration-700 group-hover:scale-105"
                    fittingType="fill"
                    focalPointX={0.5}
                    focalPointY={0.45}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-5 lg:p-6">
                  <h3 className={`font-heading font-400 text-white ${isLarge ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"}`}>
                    {tc(cat.name)}
                  </h3>
                  {cat.short_description && (
                    <p className="mt-1 text-xs text-white/90 line-clamp-2">{cat.short_description}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-600 text-gold transition group-hover:gap-2">
                    {tc("Explore")} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
