import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const STAGES = [
  {
    label: "Seed",
    title: "Selected & tested",
    text: "Every lot begins with verified parent lines and controlled germination — the foundation of a dependable harvest.",
    image: images.seed,
  },
  {
    label: "Soil",
    title: "Prepared & ready",
    text: "Guided sowing windows and seed rates matched to your soil type, moisture and regional conditions.",
    image: images.fieldTexture,
  },
  {
    label: "Sprout",
    title: "Established stand",
    text: "Uniform germination and strong early vigour ensure the plant population that carries the season.",
    image: images.greenhouseRow,
  },
  {
    label: "Crop",
    title: "Managed growth",
    text: "Agronomy support through the growing cycle — irrigation, nutrition and monitoring at every stage.",
    image: images.wheatField,
  },
  {
    label: "Harvest",
    title: "Realised yield",
    text: "The moment everything is measured — the harvest that confirms the seed was right for the field.",
    image: images.wheatHarvest,
  },
];

export default function SeedToHarvest() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-2xl">
          <span className="inline-block h-px w-12 bg-gold" />
          <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
            {tc("From seed to harvest.")}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {tc("Every stage matters — from the parent line we select to the day the crop is measured. Here's how we think about the journey.")}
          </p>
        </div>

        <div className="mt-14 grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((s, i) => (
            <div key={s.label} className="border-b border-border sm:border-r sm:last:border-r-0 lg:border-b-0">
              <div className="group relative overflow-hidden">
                <Image
                  src={s.image}
                  alt={`${tc(s.label)} — ${tc(s.title)}`}
                  className="aspect-[4/3] w-full transition duration-700 group-hover:scale-105"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.45}
                />
              </div>
              <div className="p-5 lg:p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-500 text-muted-foreground">{tc(s.label)}</span>
                </div>
                <h3 className="mt-1.5 font-heading text-lg font-400 text-foreground">{tc(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tc(s.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
