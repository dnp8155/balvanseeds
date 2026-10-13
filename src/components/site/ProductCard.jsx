import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * ProductCard — editorial layout matching the client's reference design:
 * green pill header, product image on a circular light-green field with pedestal,
 * and red triangle bullet points for key features.
 * Borderless; the grid supplies the vertical divider between columns.
 */
export default function ProductCard({ seed, className }) {
  const { t, tc } = useLanguage();
  const features = (seed.features || []).filter(Boolean).slice(0, 7);

  return (
    <article className={cn("group flex flex-col p-4 sm:p-6", className)}>
      {/* Green pill header */}
      <div className="inline-flex self-start">
        <div className="rounded-full bg-primary px-5 py-2.5">
          <h3 className="font-heading text-sm font-600 leading-tight text-primary-foreground lg:text-base">
            {seed.name}
            <span className="ml-1.5 font-400 text-primary-foreground/70">— {tc(seed.cropName)}</span>
          </h3>
        </div>
      </div>

      {/* Content area */}
      <div className="mt-4 flex flex-1 flex-col sm:flex-row">
        {/* Image — circular light green field + pedestal */}
        <div className="relative flex shrink-0 items-center justify-center p-2 sm:w-[42%] lg:w-[38%]">
          <div className="absolute inset-1 rounded-full bg-leaf-soft" />
          <div className="absolute inset-1 rounded-full ring-1 ring-leaf/20" />
          {/* Pedestal shadow */}
          <div className="absolute bottom-3 left-1/2 h-2 w-2/3 -translate-x-1/2 rounded-[50%] bg-foreground/10 blur-[2px]" />
          <div className="relative aspect-square w-full max-w-[170px]">
            <Image
              src={seed.image}
              alt={`${seed.name} — ${tc(seed.cropName)} seed variety`}
              className="h-full w-full transition duration-700 group-hover:scale-105"
              fittingType="fit"
            />
          </div>
          <span className="absolute left-0 top-0 rounded-full bg-gold px-2.5 py-1 text-[0.6rem] font-600 uppercase tracking-wider text-charcoal">
            {tc(seed.type)}
          </span>
        </div>

        {/* Bullet points */}
        <div className="flex flex-1 flex-col">
          {features.length > 0 ? (
            <ul className="space-y-2">
              {features.map((f, i) => (
                <li key={i} className="flex gap-2.5 text-[0.82rem] leading-relaxed text-foreground/80">
                  <span className="mt-1 shrink-0 text-[0.5rem] text-red-600" aria-hidden>▶</span>
                  <span>{tc(f)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{tc(seed.short)}</p>
          )}

          <Link
            to={`/seeds/${seed.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-border px-4 py-2 text-sm font-600 text-primary transition hover:border-primary hover:bg-primary hover:text-primary-foreground focus-ring"
          >
            {t("common.viewDetails")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}