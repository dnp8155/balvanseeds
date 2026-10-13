import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Search, Store } from "lucide-react";
import Seo from "@/components/site/Seo";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import PageHero from "@/components/site/PageHero";
import EmptyState from "@/components/site/EmptyState";
import LoadingSkeleton from "@/components/site/LoadingSkeleton";
import { seoConfig } from "@/lib/seoConfig";
import { site, whatsappLink } from "@/lib/siteData";
import {
  fetchActiveDealers,
  getDealerStates,
  getDealerDistricts,
  filterDealers,
} from "@/lib/dealerCatalog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Dealers() {
  const { t, tc } = useLanguage();
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetchActiveDealers()
      .then((list) => { if (active) { setDealers(list); setLoading(false); } })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const states = useMemo(() => getDealerStates(dealers), [dealers]);
  const districts = useMemo(() => getDealerDistricts(dealers, stateFilter), [dealers, stateFilter]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return filterDealers(dealers, stateFilter, districtFilter, "").filter((d) => {
      if (!q) return true;
      return [d.name, d.city, d.district, d.state, d.address].filter(Boolean).join(" ").toLowerCase().includes(q);
    });
  }, [dealers, stateFilter, districtFilter, query]);

  return (
    <>
      <Seo {...seoConfig["/dealers"]} />
      <PageHero
        eyebrow={tc("Dealer Network")}
        title={tc("Find a Dealer")}
        subtitle={tc("Genuine, quality-tested Balvan Agro seeds are always close by. Search our authorised dealer network across 7 Indian states.")}
        image={site.ogImage}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: tc("Find a Dealer") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tc("Search by name, city…")}
              className="w-full rounded-sm border border-border bg-card pl-9 pr-3 py-2.5 text-sm focus-ring"
            />
          </div>
          <select
            value={stateFilter}
            onChange={(e) => { setStateFilter(e.target.value); setDistrictFilter(""); }}
            className="rounded-sm border border-border bg-card px-3 py-2.5 text-sm focus-ring"
          >
            <option value="">{tc("All States")}</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="rounded-sm border border-border bg-card px-3 py-2.5 text-sm focus-ring"
          >
            <option value="">{tc("All Districts")}</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <button
            onClick={() => { setStateFilter(""); setDistrictFilter(""); setQuery(""); }}
            className="rounded-sm border border-border px-4 py-2.5 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary"
          >
            {tc("Clear")}
          </button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? tc("dealer") : tc("dealers")} {tc("found")}
        </p>

        {loading ? (
          <div className="mt-6"><LoadingSkeleton count={4} /></div>
        ) : filtered.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title={tc("No dealers found")}
              description={tc("Try clearing the filters, or become a dealer in your area.")}
              action={<Link to="/become-dealer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf"><Store className="h-4 w-4" />{tc("Become a Dealer")}</Link>}
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <div key={d.id} className="flex flex-col rounded-sm border border-border bg-card p-5 transition hover:border-primary/30 hover:shadow-soft">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf"><MapPin className="h-4 w-4" /></span>
                  <div>
                    <h3 className="font-heading text-lg font-600 text-foreground">{d.name}</h3>
                    <p className="text-xs text-muted-foreground">{[d.city, d.district, d.state].filter(Boolean).join(", ")}</p>
                  </div>
                </div>
                {d.address && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.address}</p>}
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={`tel:${d.mobile}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-600 text-primary-foreground transition hover:bg-leaf"><Phone className="h-3.5 w-3.5" />{tc("Call")}</a>
                  <a
                    href={whatsappLink(`Hello, I'd like to buy Balvan Agro seeds. Nearest dealer: ${d.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-600 text-foreground transition hover:border-primary hover:text-primary"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />{tc("WhatsApp")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}