import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FarmerSupport() {
  const { tc } = useLanguage();
  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-2xl font-400 leading-[1.1] text-foreground sm:text-3xl lg:text-4xl text-balance">
              {tc("Need help choosing a seed?")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tc("Tell us your crop, season and location — we'll match you with the right variety, or connect you with an agronomy expert.")}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link to="/seeds" className="group inline-flex items-center justify-between gap-3 bg-primary px-6 py-4 text-sm font-600 text-primary-foreground transition hover:bg-charcoal">
                {tc("Find Your Seed")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/ask-expert" className="group inline-flex items-center justify-between gap-3 border border-border bg-card px-6 py-4 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary">
                {tc("Ask an Expert")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}