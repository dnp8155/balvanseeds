import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images } from "@/lib/siteData";

export default function FinalCTA() {
  const { t, tc } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <Image
          src={images.wheatHarvest}
          alt="Wheat harvest at golden hour"
          className="h-full w-full"
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/75 to-charcoal/55" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-3xl">
          <span className="inline-block h-px w-12 bg-gold" />
          <h2 className="mt-6 font-heading text-4xl font-400 leading-[1.02] text-white text-balance sm:text-5xl lg:text-7xl">
            {tc("The next harvest")}
            <br />
            {tc("starts with the")}
            <br />
            <span className="text-gold">{tc("right seed.")}</span>
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/seeds"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-4 text-sm font-600 text-charcoal transition hover:bg-white"
            >
              {t("home.hero.explore")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/seeds"
              className="group inline-flex items-center gap-2 border border-white/25 bg-white/5 px-8 py-4 text-sm font-600 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
              {t("home.hero.find")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
