import React from "react";
import { Image } from "@/components/ui/image";
import { researchAreas } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ResearchInnovation() {
  const { t, tc } = useLanguage();
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2.5 text-xs font-600 uppercase tracking-[0.2em] text-primary-foreground/80">
              <span className="h-px w-8 bg-gold" />
              {t("home.research.eyebrow")}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-400 leading-[1.1] text-primary-foreground sm:text-[2.6rem] text-balance">
              {t("home.research.title")}
            </h2>
            <p className="mt-5 leading-relaxed text-primary-foreground/75">
              {t("home.research.desc")}
            </p>
            <div className="mt-8 hidden aspect-[4/3] overflow-hidden border border-primary-foreground/20 lg:block">
              <Image src={researchAreas[0].image} alt="Research field" className="h-full w-full" fittingType="fill" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:border-l lg:border-primary-foreground/15 lg:pl-12">
            <ul>
              {researchAreas.map((r, i) => (
                <li key={r.title} className="flex gap-6 border-b border-primary-foreground/15 py-6 first:pt-0 last:border-0">
                  <span className="font-heading text-sm font-600 text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-heading text-xl font-400 text-primary-foreground">{tc(r.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{tc(r.text)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}