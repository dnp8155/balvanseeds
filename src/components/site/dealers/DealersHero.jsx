import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DealersHero() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left — text */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-600 uppercase tracking-[0.2em] text-leaf">
                {tc("Our Dealers")}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-4xl font-400 leading-[1.05] text-foreground sm:text-5xl lg:text-[3.25rem] text-balance">
              {tc("Find Your Nearest")}
              <br />
              {tc("Balavan Agro Dealer")}
            </h1>
            <p className="mt-4 font-heading text-xl font-400 italic leading-snug text-leaf/80 sm:text-2xl">
              {tc("Quality seeds are closer than you think.")}
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {tc("Find authorised Balavan Agro dealers near you and connect with trusted local partners for genuine seed varieties and farmer support.")}
            </p>
          </div>

          {/* Right — image */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl lg:rounded-[24px] shadow-soft">
              <div className="aspect-[4/3] lg:aspect-[16/11]">
                <Image
                  src={images.farmer}
                  alt="Indian farmer in a green agricultural field"
                  className="h-full w-full"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.4}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
              {/* Editorial text overlay */}
              <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                <div className="mb-3 h-px w-12 bg-gold/80" />
                <p className="font-heading text-2xl font-400 italic leading-tight text-white sm:text-3xl">
                  {tc("Stronger Farmers")}
                  <br />
                  {tc("Brighter Futures")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
