import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images } from "@/lib/siteData";

// Carousel slides — all crop field images from the site library.
const carouselSlides = [
  { img: images.wheatField, alt: "Golden wheat field under a blue sky" },
  { img: images.mustard, alt: "Yellow mustard flowering field" },
  { img: images.cottonField, alt: "White cotton field ready for harvest" },
  { img: images.riceField, alt: "Green rice paddy field" },
  { img: images.fieldTexture, alt: "Row-cropped field at harvest" },
  { img: images.stormyPlow, alt: "Oxen plowing at dusk" },
];

function CropCarousel() {
  const [index, setIndex] = useState(0);
  const count = carouselSlides.length;

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Auto-advance every 3.5s.
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 3500);
    return () => clearInterval(t);
  }, [count]);

  return (
    <div className="col-span-2 overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/6] w-full">
        {carouselSlides.map((s, i) => {
          const isCurrent = i === index;
          if (!isCurrent && Math.abs(i - index) > 1 && !(index === 0 && i === count - 1)) {
            return null;
          }
          return (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: isCurrent ? 1 : 0 }}
            >
              <Image
                src={s.img}
                alt={s.alt}
                className="h-full w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.5}
              />
            </div>
          );
        })}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal backdrop-blur transition hover:bg-white"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-charcoal backdrop-blur transition hover:bg-white"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function OurApproach() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left — editorial */}
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-gold" />
              <span className="text-xs font-700 uppercase tracking-widest text-gold">{tc("Founder & Owner's Vision")}</span>
            </div>
            <h2 className="mt-4 font-heading text-2xl font-400 leading-[1.15] text-foreground sm:text-3xl lg:text-[2.5rem] text-balance">
              {tc("“I am a farmer's son — and perhaps that is my greatest identity.”")}
            </h2>

            {/* Section 1 */}
            <div className="mt-6 rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
              <span className="text-[11px] font-700 uppercase tracking-wider text-leaf">
                {tc("Section 1 · The Sacred Trust of a Seed")}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {tc("Since childhood, I have watched farmers pour their sweat into the soil—reaching fields before sunrise and returning after dusk. A farmer does not merely sow a seed; he sows his children's dreams, his family's hopes, and an entire year of labour. A seed is the farmer's trust, his hope, and the first foundation of his future.")}
              </p>
            </div>

            {/* Section 2 */}
            <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
              <span className="text-[11px] font-700 uppercase tracking-wider text-gold">
                {tc("Section 2 · The Genesis of Balvan & Our Eternal Pledge")}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {tc("This very sentiment became the purpose behind Balvan Agro Seeds. My dream was never simply to build a big company, but that when a farmer sows our seed, he feels with conviction: ")}
                <strong className="text-foreground italic">{tc("“Balvan stands with me.”")}</strong>
                {" "}
                {tc("Farmers must never have to struggle for quality seeds—pure, reliable seeds on time, reflecting their proud harvest smile.")}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-base font-700 text-foreground">{tc("Shri Vajabhai Patel")}</p>
                <p className="text-xs text-muted-foreground">{tc("Founder, Balvan Agro Seeds")}</p>
              </div>
              <Link
                to="/about#owner-vision"
                className="group inline-flex items-center gap-1.5 text-xs font-600 text-gold transition hover:text-accent focus-ring"
              >
                {tc("Read Full Owner Vision")}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right — visual collage with real founder portrait */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl border-2 border-gold/40 shadow-xl">
              <img
                src="/images/founder.jpg"
                alt="Shri Vajabhai Patel — Founder, Balvan Agro Seeds"
                className="h-full min-h-[300px] w-full object-cover object-top sm:min-h-[420px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent p-4 sm:p-5">
                <span className="inline-block rounded bg-gold px-2 py-0.5 text-[10px] font-700 uppercase tracking-widest text-charcoal shadow-sm">
                  {tc("Founder")}
                </span>
                <p className="mt-1 text-sm sm:text-base font-700 text-white leading-snug">
                  {tc("Shri Vajabhai Patel")}
                </p>
                <p className="text-[11px] text-white/80">
                  {tc("Founder · Balvan Agro Seeds")}
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image src={images.greenhouse} alt="Balvan Agro R&D facility" className="aspect-[4/3] w-full" />
            </div>
            <div className="flex items-center rounded-2xl bg-primary p-4 sm:p-5">
              <p className="text-[11px] font-600 uppercase tracking-wider text-primary-foreground leading-relaxed sm:text-xs">
                {tc("REAL CONDITIONS. REAL RESULTS.")} —
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image src={images.seed} alt="Hands holding seeds" className="aspect-[4/3] w-full" />
            </div>
            <div className="flex items-center rounded-2xl bg-gold-soft p-4 sm:p-5">
              <p className="text-[11px] font-600 uppercase tracking-wider text-accent-foreground leading-relaxed sm:text-xs">
                {tc("BETTER SEEDS / STRONGER / FARMERS")}
              </p>
            </div>

            {/* Bottom row — cycling crop carousel (was a single wheat image) */}
            <CropCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}