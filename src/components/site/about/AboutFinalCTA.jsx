import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutFinalCTA() {
  const { tc } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <Image
          src={images.wheatHarvest}
          alt="Wheat harvest field"
          className="h-full w-full"
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/75 to-charcoal/60" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="max-w-2xl">
          <span className="inline-block h-px w-12 bg-gold" />
          <h2 className="mt-6 font-heading text-4xl font-400 leading-[1.05] text-white text-balance sm:text-5xl lg:text-6xl">
            {tc("Explore our seeds, connect with our team or find a Balavanagro dealer near you.")}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/seeds" className="group inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-600 text-charcoal transition hover:bg-white">
              {tc("Explore Our Seeds")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
            <Link to="/dealers" className="group inline-flex items-center gap-2 text-sm font-600 text-white/80 transition hover:text-white">
              {tc("Find a Dealer")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}