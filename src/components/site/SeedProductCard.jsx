import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * SeedProductCard — A4 print-catalogue style horizontal product label.
 * Image position alternates per card index (even = left, odd = right).
 */
export default function SeedProductCard({ seed, index = 0 }) {
  const { tc } = useLanguage();
  const features = (seed.characteristics || []).filter(Boolean);
  const imageLeft = index % 2 === 0;

  return (
    <Link
      to={`/seeds/${seed.slug}`}
      className="flex h-full overflow-hidden rounded-2xl bg-leaf-soft/50 shadow-soft transition hover:shadow-lift"
    >
      {/* Image section (~30%) */}
      <div
        className={`flex w-[30%] shrink-0 items-center justify-center bg-white/40 p-3 ${
          imageLeft ? "order-1" : "order-2"
        }`}
      >
        <Image
          src={seed.image}
          alt={`${seed.name} — ${tc(seed.cropName)} Seeds`}
          className="h-full w-full"
          fittingType="fit"
        />
      </div>

      {/* Info section (~70%) */}
      <div
        className={`flex w-[70%] flex-col justify-center p-4 ${
          imageLeft ? "order-2" : "order-1"
        }`}
      >
        {/* Dark green title pill */}
        <div className="mb-3 inline-block self-start rounded-full bg-primary px-4 py-1.5">
          <h3 className="whitespace-nowrap text-xs font-700 leading-tight text-primary-foreground sm:text-sm">
            {seed.name} — {tc(seed.cropName)} Seeds
          </h3>
        </div>

        {/* Red triangle bullets */}
        <ul className="space-y-1.5">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs leading-snug text-foreground sm:text-[0.8rem]"
            >
              <span className="mt-px shrink-0 text-[0.7rem] text-red-600">▶</span>
              <span>{tc(f)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}