import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function SeedCatalogCard({ seed, index = 0 }) {
  const { tc } = useLanguage();
  const features = (seed.features || seed.characteristics || []).filter(Boolean).slice(0, 3);
  return <Link to={`/seeds/${seed.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-cream shadow-soft transition duration-300 hover:shadow-lift md:flex-row md:items-stretch" aria-label={`${seed.name} — ${tc("View Details")}`}>
    <div className={`relative flex shrink-0 items-center justify-center bg-card p-6 md:w-1/2 md:p-8 ${index % 2 ? "md:order-2" : ""}`}><Image src={seed.image} alt={`${seed.name} — ${tc(seed.cropName)} ${tc("Seeds")}`} className="h-[220px] w-full max-w-[320px] object-contain transition duration-700 ease-out group-hover:scale-[1.02] md:h-full" fittingType="fit" loading="lazy" /></div>
    <div className={`flex flex-1 flex-col justify-center px-6 py-7 md:w-1/2 md:px-10 md:py-10 ${index % 2 ? "md:order-1" : ""}`}><span className="text-xs font-600 uppercase tracking-[0.15em] text-gold">{tc(seed.cropName)}</span><h3 className="mt-2.5 font-heading text-2xl font-400 leading-[1.2] text-foreground sm:text-[1.75rem]">{seed.name}</h3>{seed.short && <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground line-clamp-2">{tc(seed.short)}</p>}{features.length > 0 && <ul className="mt-4 space-y-2">{features.map(f => <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug text-foreground"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" /><span>{tc(f)}</span></li>)}</ul>}<span className="mt-6 inline-flex items-center gap-2 text-[15px] font-600 text-foreground transition-all duration-300 group-hover:gap-3.5">{tc("View Details")}<ArrowRight className="w-4 h-4" /></span></div>
  </Link>;
}