import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { qualitySteps } from "@/lib/siteData";

export default function SeedJourney() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,163,74,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="editorial-label text-gold/80">06 / THE JOURNEY</p>
          <h2 className="mt-4 font-heading text-3xl font-400 leading-[1.1] text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
            {t("home.journey.title")}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
            {t("home.journey.desc")}
          </p>
        </div>

        {/* Journey — compact grid overview */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {qualitySteps.map((step, i) => (
            <div key={step.step} className="rounded-2xl border border-primary-foreground/25 bg-primary-foreground/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary">
                  <span className="font-heading text-lg font-400 text-gold">{step.step}</span>
                </div>
                <span className="font-mono text-xs text-primary-foreground/60">{String(i + 1).padStart(2, "0")} / {String(qualitySteps.length).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-3 font-heading text-lg font-400 text-primary-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/80">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Final statement */}
        <div className="mt-12 border-t border-primary-foreground/15 pt-12 text-center">
          <p className="font-heading text-2xl font-400 italic text-primary-foreground/80 sm:text-3xl lg:text-4xl text-balance">
            {t("home.journey.ctaLeft")},{" "}
            <span className="text-gold">{t("home.journey.ctaBold")}</span>
          </p>
          <Link
            to="/seeds"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-600 text-primary transition hover:bg-primary-foreground hover:text-primary"
          >
            {t("home.journey.ctaBtn")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}