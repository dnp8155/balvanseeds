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
              <span className="text-xs font-700 uppercase tracking-widest text-gold">{tc("Our Guiding Philosophy")}</span>
            </div>
            <h2 className="mt-4 font-heading text-2xl font-400 leading-[1.15] text-foreground sm:text-3xl lg:text-[2.5rem] text-balance">
              {tc("Rooted in Indian Soil, Committed to Farmer Prosperity")}
            </h2>

            {/* Approach Highlight 1 */}
            <div className="mt-6 rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
              <span className="text-[11px] font-700 uppercase tracking-wider text-leaf">
                {tc("Field-Tested Genetic Strength")}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {tc("Every Balvan hybrid is bred and tested in realistic arid and semi-arid conditions. We prioritize drought tolerance, disease resistance, and robust root systems so farmers secure consistent yield even in tough weather.")}
              </p>
            </div>

            {/* Approach Highlight 2 */}
            <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
              <span className="text-[11px] font-700 uppercase tracking-wider text-gold">
                {tc("The Farmer's True Partner")}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {tc("We believe seed manufacturing is a sacred responsibility. From proper seed-treatment guidance to timely doorstep distribution through our verified network, we stand shoulder-to-shoulder with our farming community throughout the season.")}
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
                {tc("Read Full Founder Vision & Pledge")}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right — visual collage with wide landscape founder banner and balanced height cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {/* Wide Landscape Founder Card (Full 2-Column Width!) */}
            <div className="col-span-2 relative overflow-hidden rounded-2xl border-2 border-gold/40 shadow-xl bg-card">
              <div className="relative aspect-[16/9] sm:aspect-[2.1/1] w-full overflow-hidden">
                <img
                  src="/images/founder.jpg"
                  alt="Shri Vajabhai Patel — Founder, Balvan Agro Seeds"
                  className="h-full w-full object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <span className="inline-block rounded bg-gold px-2.5 py-0.5 text-[10px] font-700 uppercase tracking-widest text-charcoal shadow-sm">
                      {tc("Founder")}
                    </span>
                    <h3 className="mt-1 font-heading text-lg sm:text-2xl font-600 text-white">
                      {tc("Shri Vajabhai Patel")}
                    </h3>
                    <p className="text-xs sm:text-sm text-gold font-500">
                      {tc("Founder · Balvan Agro Seeds")}
                    </p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-xs text-white/80 italic font-heading">
                      {tc("Tharad, Banaskantha, Gujarat")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shorter Height Images */}
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image src={images.greenhouse} alt="Balvan Agro R&D facility" className="aspect-[4/3] w-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3">
                <p className="text-[11px] font-600 uppercase tracking-wider text-white">
                  {tc("R&D / TRIALS")}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image src={images.seed} alt="Hands holding seeds" className="aspect-[4/3] w-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3">
                <p className="text-[11px] font-600 uppercase tracking-wider text-white">
                  {tc("TESTED SEEDS")}
                </p>
              </div>
            </div>

            {/* Bottom row — cycling crop carousel */}
            <CropCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}