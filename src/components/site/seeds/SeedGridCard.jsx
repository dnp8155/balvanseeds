import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Sprout, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/siteData";

export default function SeedGridCard({ seed, index = 0 }) {
  const { t, tc } = useLanguage();
  const features = (seed.features || seed.characteristics || []).filter(Boolean).slice(0, 2);
  const delay = `${(0.05 + index * 0.07).toFixed(2)}s`;
  return (
    <Link
      to={`/seeds/${seed.slug}`}
      className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-card text-foreground shadow-[0_1px_2px_rgba(31,42,36,0.03)] transition-[transform,box-shadow,border-color] duration-300 ease-out animate-fade-up hover:-translate-y-1 hover:border-leaf/50 hover:shadow-[0_18px_36px_-14px_rgba(27,61,43,0.2)] active:-translate-y-0.5 focus-ring"
      style={{ animationDelay: delay }}
      aria-label={`${seed.name} — ${tc("View Details")}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-leaf-soft">
        <Image
          src={seed.image}
          alt={`${seed.name} — ${tc(seed.cropName)} ${tc("Seeds")}`}
          className="h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
          fittingType="fit"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[10px] font-600 uppercase tracking-[0.08em] text-primary-foreground">
          {tc(seed.type)}
        </span>
        {seed.isFeatured && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold shadow-[0_2px_6px_rgba(0,0,0,0.15)]" title={t("common.featured")}>
            <Star className="h-3.5 w-3.5 text-charcoal" fill="currentColor" strokeWidth={0} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-[22px] pb-5 pt-[22px]">
        <div className="flex items-center gap-1.5 text-[11px] font-600 uppercase tracking-[0.15em] text-leaf">
          <Sprout className="h-3 w-3" strokeWidth={2} />
          {seed.name}
        </div>
        <h3 className="mt-2.5 font-heading text-[21px] font-400 leading-[1.3] text-foreground">
          {tc(seed.cropName)}
        </h3>
        {seed.short && (
          <p className="mt-2.5 text-sm leading-[1.6] text-muted-foreground line-clamp-2">
            {tc(seed.short)}
          </p>
        )}
        {features.length > 0 && (
          <ul className="mt-3.5 flex flex-wrap gap-1.5">
            {features.map((f) => (
              <li key={f} className="rounded-full bg-leaf-soft px-[11px] py-1 text-[11px] font-500 leading-tight text-foreground/70">
                {tc(f)}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-600 text-primary transition-all duration-300 group-hover:gap-3">
            {tc("View Details")}
            <ArrowRight className="h-4 w-4" />
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(
                whatsappLink(`Hello Balvan Agro, I am interested in ${seed.name} (${seed.cropName} Seed). Please share price and nearest dealer availability.`),
                "_blank",
                "noopener,noreferrer"
              );
            }}
            title={tc("1-Click WhatsApp Enquiry")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1ebd5a] transition hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}