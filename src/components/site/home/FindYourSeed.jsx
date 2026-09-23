import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  fetchPublishedCategories,
  fetchPublishedVarieties,
  buildCategoryLookup,
  toSeedCardProps,
} from "@/lib/seedCatalog";

const SEASONS = [
  { value: "kharif", label: "Kharif" },
  { value: "rabi", label: "Rabi" },
  { value: "summer", label: "Summer" },
];

const CONDITIONS = [
  { value: "irrigated", label: "Irrigated" },
  { value: "rainfed", label: "Rainfed" },
  { value: "drought-prone", label: "Drought-prone" },
];

export default function FindYourSeed() {
  const [step, setStep] = useState(0);
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState("");
  const [region, setRegion] = useState("");
  const [condition, setCondition] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const { t, tc } = useLanguage();

  useEffect(() => {
    let active = true;
    Promise.all([fetchPublishedCategories(), fetchPublishedVarieties()])
      .then(([cats, vars]) => {
        if (!active) return;
        setCategories(cats);
        setVarieties(vars);
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const lookup = useMemo(() => buildCategoryLookup(categories), [categories]);

  const allSeeds = useMemo(
    () => varieties.map((v) => toSeedCardProps(v, lookup)),
    [varieties, lookup]
  );

  const results = useMemo(() => {
    return allSeeds.filter((s) => {
      if (crop) {
        const cat = lookup.bySlug[crop];
        if (!cat || s.cropName !== cat.name) return false;
      }
      if (season) {
        const seasonLabel = SEASONS.find((sn) => sn.value === season)?.label || "";
        if (seasonLabel && !s.short.toLowerCase().includes(season.toLowerCase()) && !s.short.toLowerCase().includes(seasonLabel.toLowerCase())) return false;
      }
      return true;
    });
  }, [allSeeds, crop, season, lookup]);

  const steps = [
    { label: "What are you growing?", value: crop, set: setCrop, options: categories.map((c) => ({ value: c.slug, label: c.name })) },
    { label: "Which season?", value: season, set: setSeason, options: SEASONS },
    { label: "Where are you farming?", value: region, set: setRegion, options: [{ value: "Gujarat", label: "Gujarat" }, { value: "Rajasthan", label: "Rajasthan" }, { value: "Maharashtra", label: "Maharashtra" }, { value: "Madhya Pradesh", label: "Madhya Pradesh" }] },
    { label: "Growing conditions", value: condition, set: setCondition, options: CONDITIONS },
  ];

  const current = steps[step];
  const canProceed = current.value !== "";
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (isLast) setSubmitted(true);
    else if (canProceed) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0); setCrop(""); setSeason(""); setRegion(""); setCondition(""); setSubmitted(false);
  };

  return (
    <section className="bg-cream/50">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — statement + step list */}
          <div className="lg:col-span-4">
            <h2 className="font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              Find the right seed for your field.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tell us what you're growing, where you're farming and when you're planting. We'll match you with varieties suited to your conditions.
            </p>

            {!submitted && (
              <div className="mt-10 space-y-1">
                {steps.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setStep(i)}
                    className={`flex w-full items-center gap-3 border-l-2 py-2 pl-4 text-left transition ${
                      i === step ? "border-primary text-foreground" : i < step ? "border-gold text-muted-foreground" : "border-border text-muted-foreground/50"
                    }`}
                  >
                    <span className="text-xs font-600 uppercase tracking-wide">{s.label}</span>
                    {i < step && s.value && <span className="ml-auto text-xs text-foreground/60">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — step selector */}
          <div className="lg:col-span-8">
            {!submitted ? (
              <div>
                <div className="flex items-baseline gap-4 border-b border-border pb-5">
                  <span className="font-heading text-sm font-500 text-muted-foreground">Step {step + 1} of {steps.length}</span>
                  <h3 className="font-heading text-xl font-400 text-foreground sm:text-2xl">{current.label}</h3>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => current.set(opt.value)}
                      className={`border px-5 py-4 text-left transition ${
                        current.value === opt.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-sage/20"
                      }`}
                    >
                      <span className="font-heading text-lg font-400">{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className={`text-sm font-600 transition ${step === 0 ? "cursor-not-allowed text-muted-foreground/40" : "text-foreground hover:text-primary"}`}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className={`group inline-flex items-center gap-2 text-sm font-600 transition ${
                      canProceed ? "text-primary" : "cursor-not-allowed text-muted-foreground/40"
                    }`}
                  >
                    {isLast ? "Show Recommended Seeds" : "Next"}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <h3 className="font-heading text-xl font-400 text-foreground sm:text-2xl">
                    {[crop, season, region].filter(Boolean).map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join(" · ")}
                  </h3>
                  <button onClick={reset} className="text-sm font-600 text-primary transition hover:text-charcoal">
                    Start over
                  </button>
                </div>

                <div className="mt-6">
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
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
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
                            <div className="flex items-center justify-center overflow-hidden bg-white p-1">
                              <Image
                                src={s.image || images.fieldTexture}
                                alt={s.name}
                                className="aspect-square w-full transition duration-500 group-hover:scale-105"
                                fittingType="fit"
                              />
                            </div>
                          </div>
                          <div className="col-span-9 sm:col-span-6">
                            <span className="text-xs font-600 uppercase tracking-wider text-muted-foreground">{tc(s.cropName)}</span>
                            <h3 className="mt-1 font-heading text-xl font-400 text-foreground transition group-hover:text-primary sm:text-2xl">{s.name}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-1">{tc(s.short)}</p>
                          </div>
                          <div className="col-span-12 sm:col-span-4 sm:text-right">
                            <span className="mt-2 inline-flex items-center gap-1 text-xs font-600 text-primary/70 transition group-hover:text-primary">
                              View Variety <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}