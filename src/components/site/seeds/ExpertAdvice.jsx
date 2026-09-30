import React from "react";
import { Link } from "react-router-dom";
import { Sprout, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ExpertAdvice() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-primary p-8 lg:flex-row lg:justify-between lg:p-10">
          {/* Icon */}
          <div className="flex shrink-0 items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Sprout className="w-6 h-6 text-gold" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:px-6 lg:text-left">
            <p className="font-heading text-xl font-400 text-foreground sm:text-2xl">
              {tc("Not sure which variety is right for your field?")}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              {tc("Talk to our agronomy team for expert guidance.")}
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/ask-expert"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-600 uppercase tracking-wider text-primary-foreground transition hover:bg-leaf focus-ring"
          >
            {tc("Get Expert Advice")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
