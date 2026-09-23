import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * SeedProductCard — alternating horizontal editorial card.
 * Even index: image left. Odd index: image right.
 */
export default function SeedProductCard({ seed, index = 0 }) {
  const { tc } = useLanguage();
  const imageLeft = index % 2 === 0;
  const features = (seed.characteristics || seed.features || []).filter(Boolean).slice(0, 4);

  return (
    <Link
      to={`/seeds/${seed.slug}`}
      className="group flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#e8e8e3] shadow-soft transition hover:shadow-lift sm:flex-row sm:items-stretch"
    >
      {/* Image */}
      <div className={`flex shrink-0 items-center justify-center bg-white p-3 ${!imageLeft ? "sm:order-2" : ""}`}>
        <Image
          src={seed.image}
          alt={`${seed.name} — Seeds`}
          className="aspect-[3/4] w-full transition duration-500 group-hover:scale-105 sm:w-[200px] lg:w-[240px]"
          fittingType="fit"
        />
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col justify-center p-5 sm:p-7 ${!imageLeft ? "sm:order-1" : ""}`}>
        <h3 className="inline-block self-start rounded-full bg-[#1a4331] px-5 py-2 font-heading text-base font-600 leading-tight text-white sm:text-lg">
          {seed.name}
        </h3>
        <p className="mt-2.5 text-xs font-500 text-foreground/60 sm:text-sm">{tc(seed.cropName)} {tc("Seeds")}</p>

        {features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs leading-snug text-foreground/80 sm:text-sm">
                <span className="mt-[4px] h-0 w-0 shrink-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#d32f2f]" />
                <span>{tc(f)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}