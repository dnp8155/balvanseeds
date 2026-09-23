import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PROCESS_STEPS = [
  { label: "Germination", desc: "Controlled germination trials per lot" },
  { label: "Physical Purity", desc: "Clean, graded seed — no inert matter" },
  { label: "Genetic Purity", desc: "Isolation & field inspection verified" },
  { label: "Moisture", desc: "Moisture-safe, sealed packaging" },
  { label: "Field Testing", desc: "Multi-location performance screening" },
  { label: "Lot Verification", desc: "Every bag traceable to source" },
];

export default function QualityProcess() {
  const { t, tc } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("Six checks before a seed reaches your field.")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("home.quality.desc")}
            </p>
            <Link
              to="/certificates"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-600 text-primary transition"
            >
              {t("header.certifications")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <ol className="divide-y divide-border border-y border-border">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.label} className="group flex items-baseline gap-6 py-5 transition hover:bg-sage/20 sm:gap-10 sm:py-6">
                  <span className="font-heading text-sm font-500 text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <h3 className="font-heading text-lg font-400 text-foreground sm:text-xl">{tc(step.label)}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-xs sm:text-right">{tc(step.desc)}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-border pt-6">
              <p className="font-heading text-base font-400 text-foreground">{tc("ISO 9001:2015 Certified")}</p>
              <p className="text-xs text-muted-foreground">{tc("Quality management across the full process")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}