import React from "react";
import { MapPin } from "lucide-react";
import { presenceStates } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function OurPresence() {
  const { tc } = useLanguage();
  return (
    <section className="bg-cream/50 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("Growing across India's agricultural landscape.")}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tc("Our seeds reach farmers across the western and northern belts — through a network of authorised dealers and field demonstrations.")}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border border-border bg-card px-5 py-3">
              <MapPin className="h-5 w-5 text-gold" />
              <span className="font-heading text-2xl font-400 text-foreground">{presenceStates.length}</span>
              <span className="text-sm text-muted-foreground">{tc("states served")}</span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
              {presenceStates.map((state, i) => (
                <div key={state} className="group flex items-center gap-3 bg-card p-5 transition hover:bg-primary hover:text-primary-foreground">
                  <span className="font-mono text-xs text-muted-foreground/40 group-hover:text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-heading text-lg font-400 text-foreground group-hover:text-primary-foreground">{tc(state)}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {tc("Dealer network expanding season by season — bringing genuine, quality-tested seed closer to every farmer.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
