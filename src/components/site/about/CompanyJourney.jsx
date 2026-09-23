import React from "react";
import { Image } from "@/components/ui/image";
import { milestones } from "@/lib/siteData";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const MILESTONE_IMAGES = [
  images.seed,
  images.fieldTexture,
  images.nurseryRack,
  images.wheatField,
  images.greenhouse,
  images.wheatHarvest,
];

export default function CompanyJourney() {
  const { tc } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-block h-px w-12 bg-gold" />
          <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
            {tc("Our journey so far.")}
          </h2>
        </div>

        {/* Image-rich timeline */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m, i) => (
            <div key={m.year} className="group relative overflow-hidden">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={MILESTONE_IMAGES[i % MILESTONE_IMAGES.length]}
                  alt={m.year}
                  className="h-full w-full transition duration-700 group-hover:scale-105"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />
                <div className="absolute top-0 left-0 p-5">
                  <span className="font-mono text-xs text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-heading text-3xl font-400 text-white">{m.year}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{tc(m.text)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}