import React from "react";
import { Play, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TestimonialCard({ t, className }) {
  const { tc } = useLanguage();
  return (
    <article className={cn("group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/40", className)}>
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image src={t.fieldImage} alt={`${t.farmer}'s ${t.crop} field`} className="h-full w-full" fittingType="fill" />
        <div className="absolute inset-0 grid place-items-center bg-charcoal/20 opacity-0 transition group-hover:opacity-100">
          <span className="grid place-items-center w-14 h-14 rounded-full bg-white/90 text-primary shadow-lift">
            <Play className="w-6 h-6 translate-x-0.5" />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-sm leading-relaxed text-foreground/80">“{tc(t.quote)}”</p>
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
          <Image src={t.image} alt={t.farmer} className="w-11 h-11 rounded-full object-cover" fittingType="fill" />
          <div className="min-w-0">
            <p className="font-600 text-foreground truncate">{t.farmer}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {t.village}, {t.state}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-500 text-muted-foreground">{tc(t.crop)}</span>
          <span className="text-xs text-border">·</span>
          <span className="text-xs font-500 text-foreground">{t.variety}</span>
        </div>
        {t.highlight && (
          <p className="mt-3 text-xs font-600 text-primary">{tc(t.highlight)}</p>
        )}
      </div>
    </article>
  );
}