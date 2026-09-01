import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images } from "@/lib/siteData";

export default function FarmerManifesto() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="overflow-hidden">
                <Image
                  src={images.farmer}
                  alt="An Indian farmer in his field"
                  className="aspect-[4/5] w-full"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.35}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gold px-5 py-3 lg:-right-6">
                <p className="font-heading text-sm font-400 italic text-charcoal">A farmer's son</p>
              </div>
            </div>
          </div>

          {/* Manifesto text */}
          <div className="lg:col-span-7">
            <p className="editorial-label text-gold/70">Our Story</p>
            <span className="mt-4 block font-heading text-7xl font-400 leading-none text-gold/20 lg:text-8xl">"</span>
            <blockquote className="-mt-4">
              <p className="font-heading text-2xl font-400 leading-[1.15] text-white text-balance sm:text-3xl lg:text-4xl">
                I am a farmer's son —
                <br />
                and perhaps that is
                <br />
                <span className="italic text-gold">my greatest identity.</span>
              </p>
            </blockquote>

            <div className="mt-8 space-y-4 text-base leading-relaxed text-white/65 sm:text-lg">
              <p>
                A seed is no ordinary product to me. A seed is a farmer's trust, his hope — the first foundation of his future. When a farmer sows a seed, he entrusts his labour, his dreams and his family's tomorrow to that single seed.
              </p>
              <p>
                My dream was never merely to build a big company. My dream was that when a farmer sows Balavan's seed, a conviction stirs in his heart — <span className="italic text-gold">"Balavan stands with me."</span>
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-gold/50" />
              <div>
                <p className="font-heading text-lg font-400 italic text-white">Shri Vajabhai Patel</p>
                <p className="editorial-label text-white/40">FOUNDER · BALAVAN AGRO</p>
              </div>
            </div>

            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-600 text-gold transition"
            >
              {t("home.brand.discover")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}