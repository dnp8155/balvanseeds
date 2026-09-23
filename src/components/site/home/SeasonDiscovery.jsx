import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { seasons } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SeasonDiscovery() {
  const { t, tc } = useLanguage();
  const [kharif, ...rest] = seasons;
  return (
    <section className="border-y border-border bg-cream/60">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={t("home.season.eyebrow")}
          title={t("home.season.title")}
          description={t("home.season.desc")}
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <Link to="/seeds" className="group relative min-h-[380px] overflow-hidden lg:col-span-7">
            <Image src={kharif.image} alt={tc(kharif.name)} className="h-full w-full transition duration-[1200ms] group-hover:scale-105" fittingType="fill" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{tc(kharif.period)}</p>
              <h3 className="mt-2 font-heading text-3xl font-600 text-white sm:text-4xl">{tc(kharif.name)}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{tc(kharif.description)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {kharif.crops.map((c) => (
                  <span key={c} className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/80">{tc(c)}</span>
                ))}
              </div>
            </div>
          </Link>
          <div className="grid gap-6 lg:col-span-5">
            {rest.map((s) => (
              <Link key={s.key} to="/seeds" className="group relative min-h-[180px] overflow-hidden">
                <Image src={s.image} alt={tc(s.name)} className="h-full w-full transition duration-[1200ms] group-hover:scale-105" fittingType="fill" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/40 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">{tc(s.period)}</p>
                  <h3 className="mt-1.5 font-heading text-2xl font-600 text-white">{tc(s.name)}</h3>
                  <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/80">{tc(s.description)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}