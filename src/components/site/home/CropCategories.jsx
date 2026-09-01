import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { fetchFeaturedCategories } from "@/lib/seedCatalog";
import SectionHeading from "@/components/site/SectionHeading";

export default function CropCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchFeaturedCategories()
      .then((cats) => { if (active) { setCategories(cats); setLoading(false); } })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Crop Categories"
            title="Seeds for the crops that matter to you"
            description="Explore our varieties by crop — from hardy pearl millet to high-oil mustard and aromatic cumin."
          />
          <Link
            to="/seeds"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border px-5 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring sm:self-auto"
          >
            All Seeds
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-border bg-card/60" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((crop) => (
              <Link
                key={crop.slug}
                to={`/seeds?crop=${crop.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:shadow-lift hover:-translate-y-1 focus-ring"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={crop.cover_image}
                    alt={`${crop.name} crop`}
                    className="h-full w-full transition duration-700 group-hover:scale-105"
                    fittingType="fill"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-heading text-lg font-600 text-white">{crop.name}</p>
                  {crop.short_description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-white/80 line-clamp-2">{crop.short_description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}