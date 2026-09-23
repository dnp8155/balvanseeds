import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";

export default function BrandStatement() {
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
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-3xl">
          <p className="font-heading text-2xl font-400 leading-[1.2] text-white/90 sm:text-3xl lg:text-4xl text-balance">
            A seed is a farmer's trust. When he sows it, he entrusts his labour, his hopes and his family's tomorrow to that single seed.
          </p>
          <p className="mt-8 text-sm font-500 text-gold">— Shri Vajabhai Patel, Founder</p>
        </div>
      </div>
    </section>
  );
}