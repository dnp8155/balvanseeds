import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const STEPS = [
  { label: "One Line", desc: "A single bajra hybrid", image: images.seed },
  { label: "Field Trials", desc: "Multi-location testing", image: images.fieldTexture },
  { label: "Selection", desc: "Disciplined advancement", image: images.nurseryRack },
  { label: "Multi-Crop", desc: "Portfolio expansion", image: images.wheatField },
  { label: "Today", desc: "Farmer-trusted seeds", image: images.greenhouse },
];

export default function CompanyEvolution() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("From a single bajra line to a multi-crop portfolio.")}
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-4">
            <div className="hidden lg:block">
              <div className="grid grid-cols-5 gap-4">
                {STEPS.map((s, i) => (
                  <div key={s.label} className="group relative">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                      <Image
                        src={s.image}
                        alt={tc(s.label)}
                        className="h-full w-full transition duration-700 group-hover:scale-105"
                        fittingType="fill"
                        focalPointX={0.5}
                        focalPointY={0.4}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <span className="font-mono text-xs text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                        <p className="mt-1 font-heading text-lg font-400 text-white">{tc(s.label)}</p>
                        <p className="mt-0.5 text-xs text-white/80">{tc(s.desc)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:hidden">
              <ol className="relative space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s.label} className="relative overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                    <Image
                      src={s.image}
                      alt={tc(s.label)}
                      className="h-full w-full"
                      fittingType="fill"
                      focalPointX={0.5}
                      focalPointY={0.4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="font-mono text-xs text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-1 font-heading text-lg font-400 text-white">{tc(s.label)}</p>
                      <p className="mt-0.5 text-xs text-white/80">{tc(s.desc)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
