import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactFinalCTA() {
  const { tc } = useLanguage();
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl">
          <h2 className="font-heading text-4xl font-400 leading-[1.05] text-primary-foreground text-balance sm:text-5xl lg:text-6xl">
            {tc("Let's grow something better.")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            {tc("Whether you're looking for the right variety, need agronomy support or want to work with Balavanagro — we're here to help.")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/seeds" className="group inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-600 text-charcoal transition hover:bg-primary-foreground">
              {tc("Explore Our Seeds")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/dealers" className="group inline-flex items-center gap-2 text-sm font-600 text-primary-foreground/80 transition hover:text-primary-foreground">
              {tc("Find a Dealer")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="group inline-flex items-center gap-2 text-sm font-600 text-primary-foreground/80 transition hover:text-primary-foreground">
              {tc("Talk to Us")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}