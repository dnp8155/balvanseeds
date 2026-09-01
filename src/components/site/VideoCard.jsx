import React, { useState } from "react";
import { Play, Calendar, Tag } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function VideoCard({ video, onPlay }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
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
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-600 text-primary">
          {video.category}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-600 leading-snug text-foreground line-clamp-2">{video.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />{video.crop}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(video.date)}</span>
        </div>
        {video.variety && video.variety !== "—" && (
          <span className="mt-2 inline-block rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-600 text-gold self-start">{video.variety}</span>
        )}
      </div>
    </article>
  );
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}