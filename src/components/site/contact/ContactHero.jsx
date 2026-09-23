import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactHero() {
  const { tc } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <Image
          src={images.mustardMidday}
          alt="Mustard field in warm daylight"
          className="h-full w-full"
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.4}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/55 to-charcoal/85" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl font-400 leading-[1.05] text-white text-balance sm:text-5xl lg:text-6xl">
            {tc("Let's talk seeds.")}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {tc("Questions about varieties, agronomy, dealerships or compliance? Reach out — our team is here to help.")}
          </p>
        </div>
      </div>
    </section>
  );
}