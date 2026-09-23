import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * SeedCatalogCard — full-width editorial zig-zag row.
 * Even index: image left, text right. Odd index: text left, image right.
 * 50% image / 50% text, ~280px desktop height, 16px radius, subtle shadow.
 * Mobile: stacks vertically (image top, text below).
 */
export default function SeedCatalogCard({ seed, index = 0 }) {
  const { tc } = useLanguage();
  const imageLeft = index % 2 === 0;
  const features = (seed.features || seed.characteristics || []).filter(Boolean).slice(0, 3);

  return (
    <Link
      to={`/seeds/${seed.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#f9f7f2] shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] md:flex-row md:items-stretch"
      aria-label={`${seed.name} — ${tc("View Details")}`}
    >
      {/* Image area — 50% on desktop, full width on mobile */}
      <div
        className={`relative flex shrink-0 items-center justify-center bg-white p-6 md:w-1/2 md:p-8 ${
          !imageLeft ? "md:order-2" : ""
        }`}
      >
        <Image
          src={seed.image}
          alt={`${seed.name} — ${tc(seed.cropName)} ${tc("Seeds")}`}
          className="h-[220px] w-full max-w-[320px] object-contain transition duration-700 ease-out group-hover:scale-[1.02] md:h-full"
          fittingType="fit"
          loading="lazy"
        />
      </div>

      {/* Text area — 50% on desktop, full width on mobile */}
      <div
        className={`flex flex-1 flex-col justify-center px-6 py-7 md:w-1/2 md:px-10 md:py-10 ${
          !imageLeft ? "md:order-1" : ""
        }`}
      >
        {/* Category label — muted harvest gold */}
        <span className="text-xs font-600 uppercase tracking-[0.15em] text-[#8b7355]">
          {tc(seed.cropName)}
        </span>

        {/* Product name — editorial serif */}
        <h3 className="mt-2.5 font-heading text-2xl font-400 leading-[1.2] text-[#1a1a1a] sm:text-[1.75rem]">
          {seed.name}
        </h3>

        {/* Short description */}
        {seed.short && (
          <p className="mt-3 text-[15px] leading-relaxed text-[#666666] line-clamp-2">
            {tc(seed.short)}
          </p>
        )}

        {/* Features — dark dot bullets */}
        {features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[15px] leading-snug text-[#333333]"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]" />
                <span>{tc(f)}</span>
              </li>
            ))}
          </ul>
        )}

        {/* View Details — text link with arrow */}
        <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-600 text-[#1a1a1a] transition-all duration-300 group-hover:gap-3.5">
          {tc("View Details")}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}