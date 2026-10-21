import React from "react";
import { Calendar, Sprout, ShieldAlert, Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SOWING_CALENDAR = [
  {
    season: "Kharif Season (Monsoon)",
    months: "June – July",
    badge: "Kharif",
    badgeColor: "bg-emerald-100 text-emerald-800",
    crops: [
      { name: "Hybrid Bajra / Fodder Bajra", varieties: "BALVAN-GORI, BALVAN 4488", seedRate: "3 – 5 kg/ha", maturity: "75 – 115 days", yield: "400+ q green fodder / 25-30 q grain" },
      { name: "Hybrid Castor (Divela)", varieties: "Gujarat Castor Hybrid", seedRate: "4 – 5 kg/ha", maturity: "180 – 210 days", yield: "30 – 35 q/ha" },
      { name: "Sesame (Til Oilseed)", varieties: "Gujarat Til 1 & 2", seedRate: "2.5 – 3 kg/ha", maturity: "85 – 90 days", yield: "6 – 8 q/ha" },
      { name: "Bt Cotton", varieties: "Research Hybrids", seedRate: "1.5 – 2 kg/ha", maturity: "150 – 165 days", yield: "25 – 30 q/ha" }
    ]
  },
  {
    season: "Rabi Season (Winter)",
    months: "October – November",
    badge: "Rabi",
    badgeColor: "bg-amber-100 text-amber-800",
    crops: [
      { name: "Cumin (Jeera)", varieties: "Gujarat Jeera 4 / Research", seedRate: "12 – 15 kg/ha", maturity: "100 – 110 days", yield: "8 – 12 q/ha" },
      { name: "Mustard (Rai / Sarsav)", varieties: "Bio-Mustard Research", seedRate: "3.5 – 4 kg/ha", maturity: "105 – 115 days", yield: "18 – 22 q/ha" },
      { name: "Fennel (Variyali)", varieties: "Gujarat Fennel 11", seedRate: "3 – 4 kg/ha (transplant)", maturity: "140 – 160 days", yield: "15 – 20 q/ha" },
      { name: "Chickpea (Chana)", varieties: "BALVAN 3 Bold Chickpea", seedRate: "8 – 10 kg/ha", maturity: "100 – 110 days", yield: "12 – 15 q/acre" },
      { name: "Isabgol (Psyllium)", varieties: "SAKTIMAN, BALVAN 33+", seedRate: "2 – 3 kg/ha", maturity: "110 – 115 days", yield: "9 – 11 q/acre" },
      { name: "Wheat (Tukdi / Sharbati)", varieties: "Bhal Region Certified", seedRate: "100 – 125 kg/ha", maturity: "110 – 120 days", yield: "40 – 50 q/ha" }
    ]
  },
  {
    season: "Zaid Season (Summer)",
    months: "February – March",
    badge: "Summer / Zaid",
    badgeColor: "bg-sky-100 text-sky-800",
    crops: [
      { name: "Summer Groundnut (Magfali)", varieties: "BALVAN G-37", seedRate: "100 – 110 kg/ha", maturity: "105 – 110 days", yield: "25 – 30 q/ha" },
      { name: "Summer Bajra", varieties: "Heat-Tolerant Hybrids", seedRate: "3.5 – 4 kg/ha", maturity: "80 – 85 days", yield: "28 – 32 q/ha" },
      { name: "Summer Fodder Bajra", varieties: "BALVAN-GORI (Irrigated)", seedRate: "4 – 5 kg/ha", maturity: "90 – 105 days", yield: "350+ q green fodder" }
    ]
  }
];

export default function SowingCalendarSection() {
  const { tc } = useLanguage();

  return (
    <section className="bg-background py-14 lg:py-20 border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/80">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" />
              <span className="text-xs font-700 uppercase tracking-widest text-primary">
                {tc("Agronomy Advisory & Crop Planning")}
              </span>
            </div>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-600 text-foreground">
              {tc("Indian Crop Sowing Calendar & Seed Rates")}
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm sm:text-base text-muted-foreground">
              {tc("Optimal sowing windows, recommended certified varieties, and accurate seed rates per hectare/acre tailored for Gujarat, Rajasthan and Western Indian agro-climates.")}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-600 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full w-fit">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>{tc("GSSCA & ICAR Recommended Guidelines")}</span>
          </div>
        </div>

        {/* Season Tables */}
        <div className="mt-10 space-y-8">
          {SOWING_CALENDAR.map((sec) => (
            <div key={sec.season} className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
              <div className="bg-muted/40 px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`rounded-md px-2.5 py-1 text-xs font-700 ${sec.badgeColor}`}>
                    {tc(sec.badge)}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-600 text-foreground">
                    {tc(sec.season)}
                  </h3>
                </div>
                <span className="text-xs sm:text-sm font-600 text-muted-foreground flex items-center gap-1.5">
                  <Sprout className="h-4 w-4 text-primary" />
                  {tc("Sowing Window:")} <strong className="text-foreground">{tc(sec.months)}</strong>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-background/80 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border font-600">
                    <tr>
                      <th className="px-6 py-3.5">{tc("Crop Name")}</th>
                      <th className="px-6 py-3.5">{tc("Recommended Balvan Variety")}</th>
                      <th className="px-6 py-3.5">{tc("Seed Rate")}</th>
                      <th className="px-6 py-3.5">{tc("Crop Duration")}</th>
                      <th className="px-6 py-3.5 text-right">{tc("Yield Potential")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {sec.crops.map((c) => (
                      <tr key={c.name} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-600 text-foreground">{tc(c.name)}</td>
                        <td className="px-6 py-4 text-primary font-600">{tc(c.varieties)}</td>
                        <td className="px-6 py-4 text-muted-foreground">{c.seedRate}</td>
                        <td className="px-6 py-4 text-muted-foreground">{c.maturity}</td>
                        <td className="px-6 py-4 text-right font-700 text-foreground">{c.yield}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Farmer Tip Box for SEO/AEO Rich Answers */}
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/50 p-5 flex items-start gap-4 text-xs sm:text-sm text-amber-900">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-700 text-amber-950 mb-1">{tc("Important Agronomist Recommendation for Gujarat & Rajasthan Farmers")}</h4>
            <p className="leading-relaxed text-amber-900/90">
              {tc("Always perform seed treatment with Trichoderma or approved fungicide before sowing Cumin (Jeera) and Bajra to prevent wilt and downy mildew. For sandy soils in Tharad, Deesa and Barmer, ensure light but frequent irrigations after germination.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
