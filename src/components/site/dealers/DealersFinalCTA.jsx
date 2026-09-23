import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DealersFinalCTA() {
  const { tc } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <Image
          src={images.wheatField}
          alt="Young crops in an Indian agricultural field under natural sunlight"
          className="h-full w-full"
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/65 to-charcoal/40" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="font-heading text-4xl font-400 leading-[1.05] text-white text-balance sm:text-5xl lg:text-6xl">
            {tc("Let's Grow")}
            <br />
            {tc("A Stronger Tomorrow")}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/dealers"
              className="group inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-600 text-charcoal transition hover:bg-white"
            >
              {tc("Find a Dealer")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/become-dealer"
              className="group inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-600 text-white transition hover:bg-white/10"
            >
              {tc("Become a Dealer")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}