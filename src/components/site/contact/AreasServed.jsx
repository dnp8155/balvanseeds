import React from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AreasServed() {
  const { tc } = useLanguage();
  const notes = {
    Gujarat: "State Headquarters, R&D Breeding Station & Processing Facility (Tharad, Banaskantha)",
    Rajasthan: "Extensive Field Trials & Agronomy Support (Marwar & Hadoti)",
    Maharashtra: "High-yield Kharif & Rabi Hybrid Seed Distribution",
    "Madhya Pradesh": "Malwa & Nimar Regional Supply",
    Haryana: "Pearl Millet & Mustard Field Support",
    Punjab: "Fodder & Cereal Variety Distribution",
    "Uttar Pradesh": "Seasonal Field Seed Supply",
  };

  return (
    <section className="bg-background border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Top Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-gold" />
            <span className="text-xs font-700 uppercase tracking-widest text-gold">
              {tc("Local Presence & Nationwide Reach")}
            </span>
          </div>
          <h2 className="mt-4 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
            {tc("Deep Roots Across Gujarat, Supplying Farmers Across India.")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {tc(
              "Balvan Agro Seeds is proudly headquartered in Tharad, Banaskantha, delivering certified high-yield hybrid and improved seeds to farmers across all major agricultural districts of Gujarat and key farming states of India."
            )}
          </p>
        </div>

        {/* Gujarat Special Regional Coverage Block */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-cream via-card to-leaf-soft/20 p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-heading text-xl font-600 text-foreground sm:text-2xl">
                {tc("Pure Gujarat Agricultural Network")}
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {tc("Comprehensive seed supply, farm trials, and grower support across every district of Gujarat")}
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-600 text-primary">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              {tc("33 Districts Covered")}
            </span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(site.gujaratRegions || []).map((region) => (
              <div key={region.name} className="rounded-xl border border-border/80 bg-card p-4 shadow-sm">
                <p className="font-heading text-base font-600 text-primary flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold shrink-0" />
                  {tc(region.name)}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {region.districts.map((d) => (
                    <li key={d} className="flex items-start gap-1.5">
                      <span className="text-leaf font-bold">•</span>
                      <span>{tc(d)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pan-India States List */}
        <div className="mt-12">
          <h3 className="font-heading text-xl font-600 text-foreground sm:text-2xl mb-4">
            {tc("States Served Across India")}
          </h3>
          <ul className="border-t border-border">
            {site.areaServed.map((state) => (
              <li
                key={state}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-border py-4 transition hover:bg-muted/40"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-heading text-lg font-500 text-foreground">{tc(state)}</span>
                </div>
                <span className="sm:ml-auto text-xs text-muted-foreground sm:text-sm">
                  {tc(notes[state] || "Farmer service & distribution network")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}