import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images } from "@/lib/siteData";

export default function FarmerManifesto() {
  const { t, tc } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden">
              <Image
                src={images.farmer}
                alt="An Indian farmer in his field"
                className="aspect-[4/3] w-full sm:aspect-[4/5]"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.35}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="inline-block h-px w-12 bg-gold" />
            <blockquote className="mt-5 sm:mt-6">
              <p className="font-heading text-xl font-400 leading-[1.2] text-white text-balance sm:text-3xl lg:text-4xl">
                {tc("I am a farmer's son — and perhaps that is my greatest identity.")}
              </p>
            </blockquote>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/65 sm:mt-8 sm:text-lg">
              <p>
                {tc("A seed is no ordinary product to me. A seed is a farmer's trust, his hope — the first foundation of his future. When a farmer sows a seed, he entrusts his labour, his dreams and his family's tomorrow to that single seed.")}
              </p>
              <p>
                {tc("My dream was never merely to build a big company. My dream was that when a farmer sows Balavan's seed, a conviction stirs in his heart —")}
                <span className="italic text-gold"> {tc("Balavan stands with me.")}</span>
              </p>
            </div>

            <div className="mt-8">
              <p className="font-heading text-lg font-400 italic text-white">{tc("Shri Vajabhai Patel")}</p>
              <p className="text-sm text-white/50">{tc("Founder, Balavan Agro")}</p>
            </div>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-600 text-gold transition"
            >
              {t("home.brand.discover")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
