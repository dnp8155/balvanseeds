import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Store } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { presenceStates } from "@/lib/siteData";

export default function DealerCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Content */}
          <div className="lg:col-span-7">
            <p className="editorial-label text-primary/60">Dealer Network</p>
            <h2 className="mt-4 font-heading text-3xl font-400 leading-[1.1] text-foreground sm:text-4xl lg:text-5xl text-balance">
              Find Balavanagro
              <br />
              <span className="italic text-primary">near you.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Genuine, quality-tested seed is always close by. Find an authorised dealer in your district — or become one yourself.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="/dealers"
                className="group inline-flex items-center gap-2 text-sm font-600 text-primary transition"
              >
                <MapPin className="h-4 w-4" />
                {t("home.cta.findDealer")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
              </Link>
              <span className="h-4 w-px bg-border" />
              <Link
                to="/become-dealer"
                className="group inline-flex items-center gap-2 text-sm font-600 text-foreground/70 transition hover:text-primary"
              >
                <Store className="h-4 w-4" />
                {t("home.cta.becomeDealer")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* States list */}
          <div className="lg:col-span-5">
            <div className="border-l border-border pl-6">
              <p className="editorial-label text-muted-foreground">{t("home.brand.presenceLabel")}</p>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {presenceStates.map((state) => (
                  <div key={state} className="flex items-center gap-2.5">
                    <span className="h-1 w-1 bg-gold" />
                    <span className="text-sm font-500 text-foreground/70">{state}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{presenceStates.length} STATES · GROWING NETWORK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}