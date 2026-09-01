import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SeedCard({ seed, className }) {
  const { t, tc } = useLanguage();
  return (
    <article className={cn("group flex flex-col overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={seed.image}
          alt={`${seed.name} — ${seed.cropName} seed variety`}
          className="h-full w-full transition duration-700 group-hover:scale-105"
          fittingType="fill"
        />
        <span className="absolute left-0 top-0 bg-background/95 px-3 py-1.5 text-xs font-600 uppercase tracking-[0.15em] text-foreground">
          {tc(seed.type)}
        </span>
      </div>
      <div className="pt-4">
        <p className="text-xs font-600 uppercase tracking-[0.2em] text-gold">{tc(seed.cropName)}</p>
        <h3 className="mt-1.5 font-heading text-xl font-600 leading-snug text-foreground">{seed.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{tc(seed.short)}</p>
        <Link
          to={`/seeds/${seed.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-600 text-primary transition group-hover:gap-2.5"
        >
          {t("common.viewDetails")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}