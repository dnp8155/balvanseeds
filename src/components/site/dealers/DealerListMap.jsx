import React, { useState } from "react";
import { MapPin, List, Map as MapIcon, SearchX } from "lucide-react";
import DealerCard from "@/components/site/dealers/DealerCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DealerListMap({
  dealers,
  selectedDealer,
  onSelectDealer,
  mapQuery,
  totalCount,
  locationLabel,
}) {
  const { tc } = useLanguage();
  const [mobileView, setMobileView] = useState("list"); // list | map
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <section className="bg-background pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-gold" />
            <span className="text-xs font-600 uppercase tracking-[0.15em] text-[#8b7355]">
              {tc("Dealer Network")}
            </span>
          </div>
          <h2 className="mt-3 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl">
            {tc("Find a Balavan Agro Dealer Near You")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-600 text-foreground">{dealers.length}</span>{" "}
            {dealers.length === 1 ? tc("dealer found") : tc("dealers found")}{" "}
            {locationLabel && <>— {tc(locationLabel)}</>}
          </p>
        </div>

        {/* Mobile toggle */}
        <div className="mb-4 flex rounded-lg border border-border bg-card p-1 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileView("list")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-600 transition ${
              mobileView === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <List className="h-4 w-4" /> {tc("List")}
          </button>
          <button
            type="button"
            onClick={() => setMobileView("map")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-600 transition ${
              mobileView === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <MapIcon className="h-4 w-4" /> {tc("Map")}
          </button>
        </div>

        {dealers.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <SearchX className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
            <p className="mt-3 font-heading text-lg font-400 text-foreground">
              {tc("No Balavan Agro dealer found in this location.")}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {tc("Try another location or become a dealer yourself.")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Dealer list — 65% */}
            <div className={`lg:col-span-7 ${mobileView === "map" ? "hidden lg:block" : ""}`}>
              <div className="flex flex-col gap-4">
                {dealers.map((d) => (
                  <DealerCard
                    key={d.id}
                    dealer={d}
                    selected={selectedDealer?.id === d.id}
                    onSelect={onSelectDealer}
                  />
                ))}
              </div>
            </div>

            {/* Map — 35% */}
            <div className={`lg:col-span-5 ${mobileView === "list" ? "hidden lg:block" : ""}`}>
              <div className="overflow-hidden rounded-xl border border-border lg:sticky lg:top-28">
                <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
                  <MapPin className="h-4 w-4 shrink-0 text-leaf" />
                  <span className="truncate text-sm font-600 text-foreground">
                    {selectedDealer ? selectedDealer.name : tc(locationLabel || "India")}
                  </span>
                </div>
                <iframe
                  title="Balavan Agro dealer location map"
                  src={mapSrc}
                  className="h-[400px] w-full border-0 lg:h-[520px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}