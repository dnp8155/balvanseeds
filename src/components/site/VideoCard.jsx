import React, { useState } from "react";
import { Play, Calendar, Tag } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function VideoCard({ video, onPlay }) {
  const { tc, lang } = useLanguage();
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/40">
      <button
        type="button"
        onClick={() => onPlay?.(video)}
        className="relative aspect-video w-full overflow-hidden bg-muted focus-ring"
        aria-label={`Play ${video.title}`}
      >
        <Image src={video.thumb} alt={video.title} className="h-full w-full transition duration-500 group-hover:scale-105" fittingType="fill" />
        <div className="absolute inset-0 bg-charcoal/25 transition group-hover:bg-charcoal/40" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid place-items-center w-14 h-14 rounded-full bg-white/90 text-primary shadow-lift transition group-hover:scale-110">
            <Play className="w-6 h-6 translate-x-0.5 fill-current" />
          </span>
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-600 leading-snug text-foreground line-clamp-2">{tc(video.title)}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span>{tc(video.category)}</span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />{tc(video.crop)}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(video.date, lang)}</span>
        </div>
        {video.variety && video.variety !== "—" && (
          <p className="mt-2 text-xs font-500 text-foreground">{tc(video.variety)}</p>
        )}
      </div>
    </article>
  );
}

function formatDate(d, lang = "en") {
  const locale = lang === "hi" ? "hi-IN" : lang === "gu" ? "gu-IN" : "en-IN";
  return new Date(d).toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}