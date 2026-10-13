import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function FeaturedSeedCard({ seed, compact = false }) {
  const { tc } = useLanguage();
  const name = seed.variety_name || seed.name;
  const tags = (seed.key_features || seed.features || []).slice(0, 2);
  return <Link to={`/seeds/${seed.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-ring">
    <div className={`relative overflow-hidden bg-cream ${compact ? "aspect-square" : "aspect-[4/3] p-3"}`}><Image src={seed.thumbnail_image || seed.image || images.seed} alt={tc(name)} className="h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fit" loading="lazy" /></div>
    {compact ? <div className="flex items-center justify-between gap-2 px-3.5 py-3.5"><h3 className="text-[13px] font-700 leading-snug text-foreground line-clamp-1">{tc(name)}</h3><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-primary-foreground"><ArrowRight className="h-3 w-3" /></span></div> : <div className="flex flex-1 flex-col px-4 py-4"><h3 className="min-h-[42px] text-[15px] font-700 leading-snug text-foreground line-clamp-2">{tc(name)}</h3><div className="mt-2.5 flex min-h-[44px] flex-wrap items-start gap-1.5">{tags.map(tag => <span key={tag} className="inline-flex w-fit items-center rounded-full bg-muted px-2.5 py-1 text-[11px] font-500 text-muted-foreground">{tc(tag)}</span>)}</div><span className="mt-auto inline-flex items-center gap-1 pt-3.5 text-[12px] font-600 text-primary">{tc("View Details")}<ArrowRight className="h-3.5 w-3.5" /></span></div>}
  </Link>;
}