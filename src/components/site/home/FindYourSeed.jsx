import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { seeds, crops, regions, images, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FindYourSeed() {
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState("");
  const [region, setRegion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t, tc } = useLanguage();

  const results = useMemo(() => {
    return seeds.filter((s) => {
      if (crop && s.crop !== crop) return false;
      if (season && !s.season.toLowerCase().includes(season)) return false;
      if (region && !s.region.toLowerCase().includes(region)) return false;
      return true;
    });
  }, [crop, season, region]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { num: "01", label: t("home.find.crop"), value: crop, set: setCrop, options: crops.map((c) => ({ value: c.slug, label: tc(c.name) })), placeholder: t("home.find.anyCrop") },
    { num: "02", label: t("home.find.season"), value: season, set: setSeason, options: [{ value: "kharif", label: t("home.find.kharif") }, { value: "rabi", label: t("home.find.rabi") }, { value: "summer", label: t("home.find.summer") }], placeholder: t("home.find.anySeason") },
    { num: "03", label: t("home.find.regionLabel"), value: region, set: setRegion, options: regions.map((r) => ({ value: r.name, label: tc(r.name) })), placeholder: t("home.find.anyRegion") },
  ];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — statement */}
          <div className="lg:col-span-4">
            <p className="editorial-label text-primary/60">Find Your Seed</p>
            <h2 className="mt-4 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              Find the right seed
              <br />
              for your <span className="italic text-primary">field.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("home.find.desc")}
            </p>
          </div>

          {/* Right — editorial selector */}
          <div className="lg:col-span-8">
            <form onSubmit={onSubmit}>
              <div className="grid gap-px border-y border-border">
                {steps.map((step) => (
                  <label key={step.num} className="group flex items-center gap-5 bg-background py-6 transition hover:bg-sage/20 sm:gap-8 sm:py-7">
                    <span className="font-mono text-xs text-gold sm:text-sm">{step.num}</span>
                    <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                      <span className="font-heading text-lg font-400 text-foreground sm:text-xl">{step.label}</span>
                      <select
                        value={step.value}
                        onChange={(e) => step.set(e.target.value)}
                        className="w-full max-w-xs border-0 border-b border-transparent bg-transparent pb-1 font-500 text-foreground transition focus:border-primary focus:outline-none focus:ring-0 sm:text-right"
                      >
                        <option value="">{step.placeholder}</option>
                        {step.options.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-600 text-primary transition"
              >
                {t("common.findSeeds")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
              </button>
            </form>

            {submitted && (
              <div className="mt-10">
                {results.length === 0 ? (
                  <div className="border border-border p-8 text-center">
                    <p className="text-sm text-muted-foreground">{t("home.find.noMatch")}</p>
                    <a
                      href={whatsappLink("Hello Balavan Agro, I need help choosing a seed for my field.")}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-4 inline-flex items-center gap-2 text-sm font-600 text-primary transition"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {t("home.find.talkExpert")}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
                    </a>
                  </div>
                ) : (
                  <div className="grid gap-px border-t border-border">
                    {results.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/seeds/${s.slug}`}
                        className="group grid grid-cols-12 items-center gap-4 border-b border-border py-5 transition hover:bg-sage/20"
                      >
                        <div className="col-span-3 sm:col-span-2">
                          <div className="overflow-hidden">
                            <Image
                              src={s.image || images.fieldTexture}
                              alt={s.name}
                              className="aspect-square w-full transition duration-500 group-hover:scale-105"
                              fittingType="fill"
                            />
                          </div>
                        </div>
                        <div className="col-span-9 sm:col-span-6">
                          <span className="font-mono text-[10px] tracking-[0.15em] text-gold">{tc(s.cropName)}</span>
                          <h3 className="mt-1 font-heading text-xl font-400 text-foreground transition group-hover:text-primary sm:text-2xl">{s.name}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-1">{tc(s.short)}</p>
                        </div>
                        <div className="col-span-12 sm:col-span-4 sm:text-right">
                          <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground sm:justify-end">
                            <div><dt className="inline">{t("common.maturity")}: </dt><dd className="inline font-500 text-foreground">{s.maturity}</dd></div>
                            <div><dt className="inline">{t("common.season")}: </dt><dd className="inline font-500 text-foreground">{tc(s.season)}</dd></div>
                          </dl>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-600 text-primary/70 transition group-hover:text-primary">
                            View Variety <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}