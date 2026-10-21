import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FeaturedSeedCard({ seed, compact = false }) {
  const { tc } = useLanguage();
  const name = seed.variety_name || seed.name;
  const tags = (seed.key_features || seed.features || []).slice(0, 2);

  const handleWhatsapp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(whatsappLink(`Hello Balvan Agro, I want to inquire about seed variety: ${name}. Please share price, availability & nearest dealer.`), "_blank");
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-ring">
      <Link to={`/seeds/${seed.slug}`} className="block">
        <div className={`relative overflow-hidden bg-cream ${compact ? "aspect-square" : "aspect-[4/3] p-3"}`}>
          <Image src={seed.thumbnail_image || seed.image || images.seed} alt={tc(name)} className="h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fit" loading="lazy" />
          <button
            type="button"
            onClick={handleWhatsapp}
            title={tc("Quick WhatsApp Price Inquiry")}
            aria-label={tc("Quick WhatsApp Price Inquiry")}
            className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-110 hover:bg-[#20ba59]"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
          </button>
        </div>
      </Link>
      {compact ? (
        <div className="flex items-center justify-between gap-2 px-3.5 py-3.5">
          <Link to={`/seeds/${seed.slug}`} className="text-[13px] font-700 leading-snug text-foreground hover:text-primary line-clamp-1">
            {tc(name)}
          </Link>
          <Link to={`/seeds/${seed.slug}`} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-primary-foreground">
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-1 flex-col px-4 py-4">
          <Link to={`/seeds/${seed.slug}`}>
            <h3 className="min-h-[42px] text-[15px] font-700 leading-snug text-foreground hover:text-primary line-clamp-2">{tc(name)}</h3>
          </Link>
          <div className="mt-2.5 flex min-h-[44px] flex-wrap items-start gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex w-fit items-center rounded-full bg-muted px-2.5 py-1 text-[11px] font-500 text-muted-foreground">{tc(tag)}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-border/60">
            <Link to={`/seeds/${seed.slug}`} className="inline-flex items-center gap-1 text-[12px] font-600 text-primary hover:underline">
              {tc("Details")}<ArrowRight className="h-3 w-3" />
            </Link>
            <button
              type="button"
              onClick={handleWhatsapp}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 px-3 py-1 text-[11px] font-700 text-[#1ebd5a] transition hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              {tc("Price Inquiry")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}