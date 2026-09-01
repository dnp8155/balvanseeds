import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PROCESS_STEPS = [
  { num: "01", label: "Germination", desc: "Controlled germination trials per lot" },
  { num: "02", label: "Physical Purity", desc: "Clean, graded seed — no inert matter" },
  { num: "03", label: "Genetic Purity", desc: "Isolation & field inspection verified" },
  { num: "04", label: "Moisture", desc: "Moisture-safe, sealed packaging" },
  { num: "05", label: "Field Testing", desc: "Multi-location performance screening" },
  { num: "06", label: "Lot Verification", desc: "Every bag traceable to source" },
];

export default function QualityProcess() {
  const { t } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — statement */}
          <div className="lg:col-span-4">
            <p className="editorial-label text-primary/60">Quality</p>
            <h2 className="mt-4 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              Quality is not a claim.
              <br />
              <span className="italic text-primary">It's a process.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("home.quality.desc")}
            </p>
            <Link
              to="/certificates"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-600 text-primary transition"
            >
              {t("header.certifications")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Right — horizontal process, lab-document style */}
          <div className="lg:col-span-8">
            <ol className="divide-y divide-border border-y border-border">
              {PROCESS_STEPS.map((step) => (
                <li key={step.num} className="group flex items-baseline gap-6 py-5 transition hover:bg-sage/20 sm:gap-10 sm:py-6">
                  <span className="font-mono text-xs text-gold sm:text-sm">{step.num}</span>
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <h3 className="font-heading text-lg font-400 text-foreground sm:text-xl">{step.label}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-xs sm:text-right">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Lot verified badge — minimal, inline */}
            <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold font-heading text-xs font-700 tracking-wider text-gold">
                ISO
              </div>
              <div>
                <p className="font-heading text-base font-400 text-foreground">ISO 9001:2015 Certified</p>
                <p className="text-xs text-muted-foreground">Quality management across the full process</p>
              </div>
              <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-primary/50">LOT VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}