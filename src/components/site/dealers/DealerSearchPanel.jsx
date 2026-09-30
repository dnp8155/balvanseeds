import React from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const selectClass =
  "h-[52px] w-full rounded-lg border border-[#dde3da] bg-white px-4 text-sm text-foreground focus:border-primary focus:outline-none transition";

export default function DealerSearchPanel({
  states,
  districts,
  cities,
  stateFilter,
  districtFilter,
  cityFilter,
  onStateChange,
  onDistrictChange,
  onCityChange,
  onSearch,
  onUseLocation,
  locating,
  locationMsg,
}) {
  const { tc } = useLanguage();
  return (
    <section className="bg-background pb-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)] sm:p-8">
          {/* Panel header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf/10">
                <MapPin className="h-5 w-5 text-leaf" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-xs font-600 uppercase tracking-[0.15em] text-[#8b7355]">
                  {tc("Dealer Network")}
                </span>
                <h2 className="mt-1 font-heading text-2xl font-400 leading-tight text-foreground sm:text-3xl">
                  {tc("Search Dealers by Location")}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {tc("Select your location to find the nearest Balavan Agro dealer in your area.")}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onUseLocation}
              disabled={locating}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-leaf/30 bg-leaf/5 px-4 py-2.5 text-sm font-600 text-leaf transition hover:bg-leaf/10 disabled:opacity-60"
            >
              <Navigation className="h-4 w-4" />
              {locating ? tc("Locating…") : tc("Use My Location")}
            </button>
          </div>

          {locationMsg && (
            <p className="mt-4 text-xs text-muted-foreground">{tc(locationMsg)}</p>
          )}

          {/* Search controls */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={stateFilter}
              onChange={(e) => onStateChange(e.target.value)}
              className={selectClass}
              aria-label={tc("Select State")}
            >
              <option value="">{tc("Select State")}</option>
              {states.map((s) => (
                <option key={s} value={s}>{tc(s)}</option>
              ))}
            </select>
            <select
              value={districtFilter}
              onChange={(e) => onDistrictChange(e.target.value)}
              className={selectClass}
              aria-label={tc("Select District")}
            >
              <option value="">{tc("Select District")}</option>
              {districts.map((d) => (
                <option key={d} value={d}>{tc(d)}</option>
              ))}
            </select>
            <select
              value={cityFilter}
              onChange={(e) => onCityChange(e.target.value)}
              className={selectClass}
              aria-label={tc("Select City / Taluka")}
            >
              <option value="">{tc("Select City / Taluka")}</option>
              {cities.map((c) => (
                <option key={c} value={c}>{tc(c)}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={onSearch}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-600 text-primary-foreground transition hover:bg-charcoal"
            >
              <Search className="h-4 w-4" />
              {tc("Search Dealers")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
