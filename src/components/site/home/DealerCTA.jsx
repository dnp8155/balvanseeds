import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Store } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { presenceStates } from "@/lib/siteData";

export default function DealerCTA() {
  const { t, tc } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.1] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("Find Balavanagro near you.")}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tc("Genuine, quality-tested seed is always close by. Find an authorised dealer in your district — or become one yourself.")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="/dealers"
                className="group inline-flex items-center gap-2 text-sm font-600 text-primary transition"
              >
                <MapPin className="h-4 w-4" />
                {t("home.cta.findDealer")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <span className="h-4 w-px bg-border" />
              <Link
                to="/become-dealer"
                className="group inline-flex items-center gap-2 text-sm font-600 text-foreground/70 transition hover:text-primary"
              >
                <Store className="h-4 w-4" />
                {t("home.cta.becomeDealer")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-border pt-6 pl-0 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-sm text-muted-foreground">{t("home.brand.presenceLabel")}</p>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {presenceStates.map((state) => (
                  <div key={state} className="flex items-center gap-2.5">
                    <span className="h-1 w-1 bg-gold" />
                    <span className="text-sm font-500 text-foreground/70">{tc(state)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">{presenceStates.length} {tc("states and growing")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
