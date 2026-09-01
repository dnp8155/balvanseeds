import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sprout } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { seeds, crops, regions, whatsappLink } from "@/lib/siteData";
import { Image } from "@/components/ui/image";

const STEPS = [
  { num: "01", key: "crop", label: "Choose Crop" },
  { num: "02", key: "season", label: "Choose Season" },
  { num: "03", key: "region", label: "Choose Region" },
  { num: "04", key: "condition", label: "Farming Condition" },
];

const SEASONS = [
  { key: "kharif", label: "Kharif" },
  { key: "rabi", label: "Rabi" },
  { key: "summer", label: "Summer" },
];

const CONDITIONS = ["Irrigated", "Rainfed", "Stress-prone", "Any"];

export default function SmartSeedFinder() {
  const { t } = useLanguage();
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState("");
  const [region, setRegion] = useState("");
  const [condition, setCondition] = useState("");

  const results = useMemo(() => {
    return seeds.filter((s) => {
      if (crop && s.crop !== crop) return false;
      if (season) {
        const seedSeason = (s.season || "").toLowerCase();
        if (!seedSeason.includes(season)) return false;
      }
      if (region) {
        const seedRegion = (s.region || "").toLowerCase();
        if (!seedRegion.includes(region.toLowerCase())) return false;
      }
      return true;
    });
  }, [crop, season, region]);

  const hasFilters = crop || season || region || condition;
  const clearAll = () => { setCrop(""); setSeason(""); setRegion(""); setCondition(""); };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          <p className="editorial-label text-primary/60">03 / SEED FINDER</p>
          <h2 className="mt-4 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t("home.find.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("home.find.desc")}
          </p>
        </div>

        {/* Steps selector */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Step 01 — Crop */}
          <div className="border-t-2 border-primary/20 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-gold">01</span>
              <span className="editorial-label text-muted-foreground">Choose Crop</span>
            </div>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="mt-3 w-full cursor-pointer border-0 border-b border-border bg-transparent pb-2 font-heading text-lg font-400 text-foreground focus:border-primary focus:outline-none focus:ring-0"
            >
              <option value="">{t("home.find.anyCrop")}</option>
              {crops.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Step 02 — Season */}
          <div className="border-t-2 border-primary/20 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-gold">02</span>
              <span className="editorial-label text-muted-foreground">Choose Season</span>
            </div>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="mt-3 w-full cursor-pointer border-0 border-b border-border bg-transparent pb-2 font-heading text-lg font-400 text-foreground focus:border-primary focus:outline-none focus:ring-0"
            >
              <option value="">Any season</option>
              {SEASONS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Step 03 — Region */}
          <div className="border-t-2 border-primary/20 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-gold">03</span>
              <span className="editorial-label text-muted-foreground">Choose Region</span>
            </div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-3 w-full cursor-pointer border-0 border-b border-border bg-transparent pb-2 font-heading text-lg font-400 text-foreground focus:border-primary focus:outline-none focus:ring-0"
            >
              <option value="">{t("home.find.anyRegion")}</option>
              {regions.map((r) => (
                <option key={r.key} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Step 04 — Condition */}
          <div className="border-t-2 border-primary/20 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-gold">04</span>
              <span className="editorial-label text-muted-foreground">Condition</span>
            </div>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-3 w-full cursor-pointer border-0 border-b border-border bg-transparent pb-2 font-heading text-lg font-400 text-foreground focus:border-primary focus:outline-none focus:ring-0"
            >
              <option value="">Any condition</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-400 text-foreground">
              {results.length > 0 ? `${results.length} Recommended Seed${results.length > 1 ? "s" : ""}` : "Recommended Seeds"}
            </h3>
            {hasFilters && (
              <button onClick={clearAll} className="inline-flex items-center gap-1 text-sm font-600 text-primary transition hover:text-gold">
                Clear All
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 6).map((seed) => (
                <article key={seed.slug} className="group flex flex-col border border-border bg-card p-6 transition hover:border-primary/30 hover:shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={seed.image}
                        alt={`${seed.name} — ${seed.cropName}`}
                        className="h-16 w-16"
                        fittingType="fill"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="editorial-label text-gold">{seed.cropName}</p>
                      <h3 className="mt-1.5 font-heading text-xl font-400 text-foreground capitalize">{seed.name.toLowerCase()}</h3>
                    </div>
                    <span className="rounded-full bg-sage px-2.5 py-1 text-xs font-600 uppercase tracking-wider text-primary">{seed.type}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">{seed.short}</p>
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-4 text-xs">
                    <div>
                      <span className="editorial-label text-muted-foreground/70">{t("common.season")}</span>
                      <p className="mt-0.5 font-500 text-foreground/80">{seed.season}</p>
                    </div>
                    <div>
                      <span className="editorial-label text-muted-foreground/70">{t("common.maturity")}</span>
                      <p className="mt-0.5 font-500 text-foreground/80">{seed.maturity}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="editorial-label text-muted-foreground/70">{t("common.region")}</span>
                      <p className="mt-0.5 font-500 text-foreground/80">{seed.region}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-5">
                    <Link to={`/seeds/${seed.slug}`} className="group/link inline-flex items-center gap-1.5 self-start rounded-full bg-primary px-4 py-2 text-sm font-600 text-primary-foreground transition hover:bg-primary/90">
                      View Seed
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            {results.length > 6 && (
              <div className="mt-8 text-center">
                <Link to="/seeds" className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-600 text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  Browse All Seeds
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            )}
            </>
          ) : (
            <div className="mt-8 border border-dashed border-border bg-sage/30 px-8 py-14 text-center">
              <Sprout className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">{t("home.find.noMatch")}</p>
              <a
                href={whatsappLink("I'd like a personalised seed recommendation for my field.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" />
                {t("home.find.talkExpert")}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}