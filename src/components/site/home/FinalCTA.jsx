import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-3xl">
          <p className="editorial-label text-gold/80">Get Started</p>
          <h2 className="mt-6 font-heading text-4xl font-400 leading-[1.05] text-primary-foreground sm:text-5xl lg:text-7xl text-balance">
            The next harvest
            <br />
            starts with the
            <br />
            <span className="italic text-gold">right seed.</span>
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to="/seeds"
              className="group inline-flex items-center gap-2 text-sm font-600 text-gold transition"
            >
              {t("home.hero.explore")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
            <span className="h-4 w-px bg-gold/30" />
            <Link
              to="/seeds"
              className="group inline-flex items-center gap-2 text-sm font-600 text-primary-foreground/80 transition hover:text-primary-foreground"
            >
              <Search className="h-4 w-4" />
              {t("home.hero.find")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}