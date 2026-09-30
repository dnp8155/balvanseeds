import React from "react";
import { MapPin } from "lucide-react";
import { site } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AreasServed() {
  const { tc } = useLanguage();
  const STATE_NOTES = {
    Gujarat: "Research & processing base",
    Rajasthan: "Field trials & dealer network",
    Maharashtra: "Authorised dealers",
    "Madhya Pradesh": "Authorised dealers",
    "Uttar Pradesh": "Authorised dealers",
    Haryana: "Authorised dealers",
    Punjab: "Authorised dealers",
  };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("Bringing quality seed to farmers across India.")}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tc("Our research and processing base, authorised dealer network and farmer support ecosystem connect Balavanagro with growers across verified regions.")}
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-border">
              {site.areaServed.map((state, i) => (
                <li key={state} className="flex items-center gap-4 border-b border-border py-4 transition hover:bg-sage/20">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="font-heading text-lg font-400 text-foreground">{tc(state)}</span>
                  <span className="ml-auto text-xs text-muted-foreground sm:text-sm">{tc(STATE_NOTES[state] || "Authorised dealers")}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
