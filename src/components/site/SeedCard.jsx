import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/siteData";

export default function SeedCard({ seed, className }) {
  const { t, tc } = useLanguage();
  return (
    <article className={cn("group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-primary/40", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-white p-2">
        <Image
          src={seed.image}
          alt={`${seed.name} — ${seed.cropName} seed variety`}
          className="h-full w-full transition duration-500 group-hover:scale-105"
          fittingType="fit"
        />
        <span className="absolute left-0 top-0 bg-background/95 px-3 py-1.5 text-xs font-500 text-foreground">
          {tc(seed.type)}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-sm font-500 text-muted-foreground">{tc(seed.cropName)}</p>
        <h3 className="mt-1 font-heading text-xl font-600 leading-snug text-foreground">{seed.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{tc(seed.short)}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <Link
            to={`/seeds/${seed.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-600 text-primary transition group-hover:gap-2.5"
          >
            {t("common.viewDetails")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappLink(`Hello Balvan Agro, I am inquiring about ${seed.name} (${seed.cropName} Seed). Please share price and nearest dealer details.`)}
            target="_blank"
            rel="noopener noreferrer"
            title={tc("1-Click WhatsApp Enquiry")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1ebd5a] transition hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}