import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PILLARS = [
  { label: "Research", desc: "Parent lines bred and screened across multiple locations" },
  { label: "Field Trials", desc: "Multi-location evaluation for adaptability" },
  { label: "Seed Processing", desc: "Cleaning, grading and treatment under control" },
  { label: "Quality Testing", desc: "Germination, purity and moisture verified per lot" },
  { label: "Infrastructure", desc: "Controlled storage and traceable dispatch" },
];

export default function ResearchInfrastructure() {
  const { tc } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-6">
            <div className="overflow-hidden border border-primary-foreground/20">
              <Image
                src={images.greenhouse}
                alt="Research greenhouse with seedlings"
                className="aspect-[4/3] w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="border border-primary-foreground/15 p-4">
                <p className="font-heading text-2xl font-400 text-gold">5</p>
                <p className="mt-1 text-xs text-primary-foreground/60">{tc("Research stages")}</p>
              </div>
              <div className="border border-primary-foreground/15 p-4">
                <p className="font-heading text-2xl font-400 text-gold">3+</p>
                <p className="mt-1 text-xs text-primary-foreground/60">{tc("Trial states")}</p>
              </div>
              <div className="border border-primary-foreground/15 p-4">
                <p className="font-heading text-2xl font-400 text-gold">ISO</p>
                <p className="mt-1 text-xs text-primary-foreground/60">9001:2015</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.1] text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("Where research meets the field.")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
              {tc("Our breeding programmes pair field observation with rigorous testing — so every variety we release is built for real Indian growing conditions, not just trial plots.")}
            </p>
            <ol className="mt-10 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
              {PILLARS.map((p, i) => (
                <li key={p.label} className="group flex items-baseline gap-5 py-4 transition hover:bg-primary-foreground/5">
                  <span className="font-mono text-sm text-gold/60">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <h3 className="font-heading text-lg font-400 text-primary-foreground">{tc(p.label)}</h3>
                    <p className="text-sm text-primary-foreground/60 sm:max-w-xs sm:text-right">{tc(p.desc)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
