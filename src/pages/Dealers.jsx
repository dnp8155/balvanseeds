import React, { useState, useEffect } from "react";
import { Phone, MapPin, Search, Navigation } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PageHero from "@/components/site/PageHero";
import { site } from "@/lib/siteData";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";

export default function Dealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  useEffect(() => {
    base44.entities.Dealer.filter({ is_active: true }, "state", 200)
      .then(setDealers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const states = [...new Set(dealers.map((d) => d.state).filter(Boolean))].sort();
  const filtered = dealers.filter((d) => {
    const q = query.toLowerCase();
    const matchesQ =
      !q ||
      [d.name, d.city, d.district, d.state, d.pincode]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    const matchesState = !stateFilter || d.state === stateFilter;
    return matchesQ && matchesState;
  });

  return (
    <>
      <Seo {...seoConfig["/dealers"]} />
      <PageHero
        eyebrow="Dealer Network"
        title="Find an Authorized Dealer"
        subtitle="Genuine, quality-tested Balavan Agro seed is available through our authorised dealers across India."
      />
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-[1fr_240px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by PIN code, city, district or state"
                className="w-full rounded-sm border border-input bg-card py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="rounded-sm border border-input bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">All states</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 animate-pulse rounded-sm border border-border bg-card" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-12 rounded-sm border border-border bg-card p-10 text-center">
              <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                No dealers found for your search.{" "}
                <a href={`tel:${site.phoneHref}`} className="font-600 text-primary">Call us</a> and we'll connect you.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => (
                <div key={d.id} className="flex flex-col rounded-sm border border-border bg-card p-5 shadow-soft">
                  <h3 className="font-heading text-lg font-600 text-foreground">{d.name}</h3>
                  <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    {[d.address, d.city, d.district, d.state, d.pincode].filter(Boolean).join(", ")}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <a href={`tel:${d.mobile}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-600 text-primary-foreground">
                      <Phone className="h-3.5 w-3.5" /> Call
                    </a>
                    {d.latitude && d.longitude && (
                      <a
                        href={`https://www.google.com/maps?q=${d.latitude},${d.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-600 text-foreground transition hover:border-primary hover:text-primary"
                      >
                        <Navigation className="h-3.5 w-3.5" /> Directions
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}