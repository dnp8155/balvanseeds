import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProductCategoryCard({ category }) {
  const { tc } = useLanguage();

  return (
    <Link
      to={`/seeds?crop=${category.slug}`}
      className="group block overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2"
      aria-label={tc(category.name)}
    >
      {/* Image — 16:9, compact height */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={category.image}
          alt={tc(category.name)}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          fittingType="fill"
          focalPointX={0.5}
          focalPointY={0.45}
          loading="lazy"
        />
      </div>

      {/* Bottom — name + arrow */}
      <div className="flex items-center justify-between gap-2 px-3.5 py-3.5">
        <h3 className="text-[13px] font-700 leading-snug text-[#1F2933]">
          {tc(category.name)}
        </h3>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#174A2B]">
          <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}