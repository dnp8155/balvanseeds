import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { testimonials, images } from "@/lib/siteData";

export default function FieldResults() {
  const { t, tc } = useLanguage();
  const major = testimonials[0];
  const minor = testimonials.slice(1, 4);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="editorial-label text-primary/60">Field Results</p>
            <h2 className="mt-4 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {t("home.farmer.title")}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{t("home.farmer.desc")}</p>
          </div>
          <Link to="/farmer-stories" className="group inline-flex items-center gap-2 text-sm font-600 text-primary transition">
            {t("common.readAll")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Major case study */}
          <article className="group lg:col-span-7">
            <div className="relative overflow-hidden">
              <Image
                src={major.fieldImage || images.hero}
                alt={`${major.farmer}'s ${major.crop} field in ${major.district}`}
                className="aspect-[16/10] w-full transition duration-700 group-hover:scale-105"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
              <div className="absolute left-0 top-0 h-1 w-16 bg-gold" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold">{major.highlight}</span>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-600 text-gold uppercase tracking-wider">Case Study</span>
                <span className="text-border">·</span>
                <MapPin className="h-3.5 w-3.5" />
                <span>{major.village}, {major.district}, {major.state}</span>
                <span className="text-border">·</span>
                <span>{major.crop} · <span className="capitalize">{major.variety.toLowerCase()}</span></span>
              </div>
              <h3 className="mt-3 font-heading text-2xl font-400 leading-snug text-foreground sm:text-3xl">
                "{tc(major.quote)}"
              </h3>
              <p className="mt-3 font-heading text-lg font-400 text-primary">— {major.farmer}</p>
            </div>
          </article>

          {/* Minor stories */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {minor.map((story) => (
              <Link
                key={story.id}
                to="/farmer-stories"
                className="group flex gap-4 border-b border-border pb-6 last:border-0 last:pb-0"
              >
                <div className="shrink-0 overflow-hidden">
                  <Image
                    src={story.fieldImage || images.fieldTexture}
                    alt={`${story.farmer} — ${story.crop}`}
                    className="h-20 w-20 transition duration-500 group-hover:scale-110"
                    fittingType="fill"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-600 text-gold">{story.crop}</span>
                    <span className="text-border">·</span>
                    <span className="capitalize">{story.variety.toLowerCase()}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 line-clamp-2">"{tc(story.quote)}"</p>
                  <p className="mt-1.5 text-xs font-600 text-primary">
                    {story.farmer}, {story.district}
                    <ArrowRight className="ml-1 inline h-3 w-3 transition group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}