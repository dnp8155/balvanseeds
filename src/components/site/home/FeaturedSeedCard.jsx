import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FeaturedSeedCard({ seed }) {
  const { tc } = useLanguage();
  const tags = (seed.key_features || seed.features || []).slice(0, 2);
  const name = seed.variety_name || seed.name;
  const image = seed.thumbnail_image || seed.image;

  return (
    <Link
      to={`/seeds/${seed.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4B34] focus-visible:ring-offset-2"
    >
      {/* Image — top half, show full product photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F9F8F4] p-3">
        <Image
          src={image}
          alt={tc(name)}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          fittingType="fit"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 py-4">
        <h3 className="min-h-[42px] text-[15px] font-700 leading-snug text-[#333333] line-clamp-2">
          {tc(name)}
        </h3>

        {/* Feature tags */}
        <div className="mt-2.5 flex min-h-[44px] flex-wrap items-start gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex w-fit items-center rounded-full bg-[#EFEFEF] px-2.5 py-1 text-[11px] font-500 text-[#444444] line-clamp-1"
            >
              {tc(tag)}
            </span>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-auto pt-3.5">
          <span className="inline-flex items-center gap-1 text-[12px] font-600 text-[#2D4B34] transition-colors group-hover:text-[#1a1a1a]">
            {tc("View Details")}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
