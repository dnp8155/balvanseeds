import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { seasons } from "@/lib/siteData";

export default function SeasonPanels() {
  const { t } = useLanguage();
  const [kharif, rabi, summer] = seasons;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="editorial-label text-primary/60">05 / SEASONS</p>
          <h2 className="mt-4 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t("home.season.title")}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{t("home.season.desc")}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Kharif — dominant */}
          <div className="group relative overflow-hidden lg:col-span-7 lg:min-h-[520px]">
            <Image
              src={kharif.image}
              alt={`${kharif.name} season — ${kharif.period}`}
              className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105"
              fittingType="fill"
              focalPointX={0.5}
              focalPointY={0.4}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />
            <div className="absolute left-0 top-0 h-1 w-16 bg-gold" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-gold">01</span>
                <span className="editorial-label text-white/60">{kharif.period}</span>
              </div>
              <h3 className="mt-2 font-heading text-5xl font-400 text-white sm:text-6xl lg:text-7xl">{kharif.name}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">{kharif.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {kharif.crops.map((c) => (
                  <span key={c} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-500 text-white/70 backdrop-blur-sm">{c}</span>
                ))}
              </div>
              <Link to="/seeds" className="group/link mt-6 inline-flex items-center gap-2 text-sm font-600 text-white transition">
                Explore {kharif.name} Seeds
                <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Rabi + Summer — stacked smaller */}
          <div className="grid gap-5 lg:col-span-5">
            {[rabi, summer].map((s, i) => (
              <div key={s.key} className="group relative overflow-hidden">
                <Image
                  src={s.image}
                  alt={`${s.name} season — ${s.period}`}
                  className="aspect-[16/9] w-full transition duration-700 group-hover:scale-105"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/10" />
                <div className="absolute left-0 top-0 h-0.5 w-12 bg-gold" />
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-gold">{String(i + 2).padStart(2, "0")}</span>
                    <span className="editorial-label text-white/60">{s.period}</span>
                  </div>
                  <h3 className="mt-1.5 font-heading text-3xl font-400 text-white sm:text-4xl">{s.name}</h3>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/70 sm:text-sm">{s.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.crops.map((c) => (
                      <span key={c} className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-xs font-500 text-white/70 backdrop-blur-sm">{c}</span>
                    ))}
                  </div>
                  <Link to="/seeds" className="group/link mt-4 inline-flex items-center gap-1.5 text-xs font-600 text-white transition">
                    Explore {s.name} Seeds
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}