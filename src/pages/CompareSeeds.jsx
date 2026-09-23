import React, { useState, useEffect } from "react";
import { X, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/site/PageHero";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { fetchPublishedVarieties, fetchPublishedCategories, buildCategoryLookup } from "@/lib/seedCatalog";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CompareSeeds() {
  const { tc } = useLanguage();
  const [selected, setSelected] = useState([]);
  const [picker, setPicker] = useState("");
  const [varieties, setVarieties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([fetchPublishedVarieties(), fetchPublishedCategories()])
      .then(([vars, cats]) => {
        if (!active) return;
        const lookup = buildCategoryLookup(cats);
        const mapped = vars.map((v) => {
          const cat = lookup.byId[v.crop_category_id];
          return {
            slug: v.slug,
            name: v.variety_name,
            cropName: cat ? cat.name : "Seeds",
            type: v.variety_type,
            season: v.suitable_season || "—",
            maturity: v.maturity_duration || "—",
            region: v.recommended_regions || "—",
            yield: v.yield_information || "—",
            resistance: v.disease_resistance || "—",
            characteristics: v.key_features || [],
          };
        });
        if (active) setVarieties(mapped);
      })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const addSeed = (slug) => {
    if (!slug || selected.includes(slug) || selected.length >= 3) return;
    setSelected((s) => [...s, slug]);
    setPicker("");
  };
  const removeSeed = (slug) => setSelected((s) => s.filter((x) => x !== slug));

  const rows = [
    { key: "cropName", label: "Crop" },
    { key: "type", label: "Variety Type" },
    { key: "season", label: "Season" },
    { key: "maturity", label: "Maturity" },
    { key: "region", label: "Recommended Region" },
    { key: "yield", label: "Yield Potential" },
    { key: "resistance", label: "Disease Tolerance" },
    { key: "characteristics", label: "Special Benefits" },
  ];

  const items = selected.map((slug) => varieties.find((s) => s.slug === slug)).filter(Boolean);

  return (
    <>
      <Seo {...seoConfig["/compare"]} />
      <PageHero
        eyebrow={tc("Compare Seeds")}
        title={tc("Compare up to 3 varieties")}
        subtitle={tc("Side-by-side comparison of key agronomic traits to help you decide.")}
      />
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={picker}
              onChange={(e) => addSeed(e.target.value)}
              disabled={selected.length >= 3 || loading}
              className="rounded-sm border border-input bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none disabled:opacity-60"
            >
              <option value="">{loading ? tc("Loading varieties…") : tc("Add a seed to compare…")}</option>
              {varieties.map((s) => (
                <option key={s.slug} value={s.slug} disabled={selected.includes(s.slug)}>
                  {s.name} · {tc(s.cropName)}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">{selected.length}/3 {tc("selected")}</p>
          </div>

          {items.length === 0 ? (
            <div className="mt-10 rounded-sm border border-border bg-card p-12 text-center">
              <GitCompare className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                {loading ? tc("Loading available varieties…") : tc("Select seeds above to start comparing.")}
              </p>
            </div>
          ) : (
            <>
              <p className="mt-4 text-xs text-muted-foreground lg:hidden">
                ← {tc("Swipe to compare →")}
              </p>
              <div className="mt-4 overflow-x-auto pb-2 lg:mt-8">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-48 p-4 text-left text-xs font-600 uppercase tracking-wide text-muted-foreground">{tc("Variety")}</th>
                    {items.map((s) => (
                      <th key={s.slug} className="p-4 text-left align-top">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-heading text-lg font-600 text-foreground">{s.name}</p>
                            <p className="text-xs text-gold">{tc(s.cropName)}</p>
                          </div>
                          <button onClick={() => removeSeed(s.slug)} aria-label={`Remove ${s.name}`}>
                            <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.key} className={i % 2 ? "bg-cream/40" : "bg-card"}>
                      <td className="p-4 text-sm font-600 text-foreground">{tc(r.label)}</td>
                      {items.map((s) => {
                        const val = s[r.key];
                        const display = Array.isArray(val) ? val.map((v) => tc(v)).join(" · ") : tc(val) || "—";
                        return <td key={s.slug} className="p-4 text-sm text-muted-foreground">{display}</td>;
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4" />
                    {items.map((s) => (
                      <td key={s.slug} className="p-4">
                        <Link to={`/seeds/${s.slug}`} className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-600 text-primary-foreground transition hover:bg-leaf">
                          {tc("View Details")}
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}