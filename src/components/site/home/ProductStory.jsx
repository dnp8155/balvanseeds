import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { seeds, images } from "@/lib/siteData";
import { fetchFeaturedVarieties } from "@/lib/seedCatalog";

export default function ProductStory() {
  const { t } = useLanguage();
  const [featured, setFeatured] = useState(seeds[0]);
  const [cmsVarieties, setCmsVarieties] = useState([]);

  useEffect(() => {
    let active = true;
    fetchFeaturedVarieties(6)
      .then((vars) => {
        if (active && vars && vars.length) {
          setCmsVarieties(vars);
          setFeatured({
            slug: vars[0].slug,
            name: vars[0].variety_name,
            crop: vars[0].crop_category_id,
            cropName: vars[0].cropName || "Seeds",
            type: vars[0].variety_type,
            image: vars[0].thumbnail_image || images.seed,
            short: vars[0].short_description || "",
            characteristics: vars[0].key_features || [],
            season: vars[0].suitable_season || "",
            region: vars[0].recommended_regions || "",
            maturity: vars[0].maturity_duration || "",
          });
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const otherVarieties = (cmsVarieties.length > 1 ? cmsVarieties.slice(1, 5) : seeds.slice(1, 5))
    .filter((v) => v.slug !== featured.slug)
    .filter((v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i);

  return (
    <section className="bg-sage/30 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="editorial-label text-primary/60">Featured Seed</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden">
              <Image
                src={featured.image || images.fieldTexture}
                alt={`${featured.name} — ${featured.cropName} seed variety`}
                className="aspect-[4/3] w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
              <span className="absolute left-0 top-0 bg-primary px-4 py-2 text-xs font-600 uppercase tracking-wider text-primary-foreground">
                {featured.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6">
            <p className="editorial-label text-gold">{featured.cropName}</p>
            <h2 className="mt-3 font-heading text-4xl font-400 leading-tight text-foreground capitalize sm:text-5xl lg:text-6xl">
              {featured.name.toLowerCase()}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              {featured.short}
            </p>

            {/* Technical info grid */}
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6">
              <div>
                <span className="editorial-label text-muted-foreground/60">{t("common.maturity")}</span>
                <p className="mt-1 font-heading text-lg font-400 text-foreground">{featured.maturity || "—"}</p>
              </div>
              <div>
                <span className="editorial-label text-muted-foreground/60">{t("common.season")}</span>
                <p className="mt-1 font-heading text-lg font-400 text-foreground">{featured.season || "—"}</p>
              </div>
              <div className="col-span-2">
                <span className="editorial-label text-muted-foreground/60">{t("common.region")}</span>
                <p className="mt-1 font-heading text-lg font-400 text-foreground">{featured.region || "—"}</p>
              </div>
            </div>

            <Link
              to={`/seeds/${featured.slug}`}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-600 text-primary transition"
            >
              View Variety
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {otherVarieties.length > 0 && (
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex items-center justify-between">
            <p className="editorial-label text-muted-foreground">Explore Our Seed Portfolio</p>
            <Link to="/seeds" className="group/link inline-flex items-center gap-1.5 text-sm font-600 text-primary transition">
              View All Seeds
              <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1.5" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {otherVarieties.map((v) => {
              const name = v.variety_name || v.name;
              const slug = v.slug;
              const cropName = v.cropName || v.crop || "Seeds";
              return (
                <Link
                  key={slug}
                  to={`/seeds/${slug}`}
                  className="group flex flex-col gap-3 border-l border-border pl-5 py-2 transition hover:border-gold"
                >
                  <span className="font-mono text-[10px] tracking-[0.15em] text-gold">{cropName}</span>
                  <span className="font-heading text-xl font-400 capitalize text-foreground transition group-hover:text-primary">{name.toLowerCase()}</span>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-600 text-primary/70 transition group-hover:text-primary">
                    View <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}