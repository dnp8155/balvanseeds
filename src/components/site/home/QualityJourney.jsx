import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { qualitySteps, images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  FlaskConical,
  Sprout,
  Wheat,
  Settings2,
  ClipboardCheck,
  PackageCheck,
  Truck,
  UserRound,
  ShieldCheck,
  MapPinned,
  Microscope,
  ArrowUpRight,
} from "lucide-react";

const STEP_ICONS = [
  FlaskConical,
  Sprout,
  Wheat,
  Settings2,
  ClipboardCheck,
  PackageCheck,
  Truck,
  UserRound,
];

const STEP_IMAGES = [
  images.greenhouse,
  images.wheatField,
  images.nurseryRack,
  images.brownWheat,
  images.seed,
  images.mustard,
  images.fieldTexture,
  images.farmer,
];

const TRUST_POINTS = [
  { icon: ShieldCheck, badgeKey: "home.journey.badge1" },
  { icon: MapPinned, badgeKey: "home.journey.badge2" },
  { icon: Microscope, badgeKey: "home.journey.badge3" },
  { icon: UserRound, badgeKey: "home.journey.badge4" },
];

export default function QualityJourney() {
  const { t, tc } = useLanguage();

  return (
    <section className="bg-[#1A211D] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                {t("home.journey.eyebrow")}
              </span>
            </div>

            <h2 className="font-heading text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {t("home.journey.title")}
            </h2>

            <p className="mt-5 max-w-[520px] text-sm leading-7 text-white/70">
              {t("home.journey.desc")}
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2.5 lg:justify-end lg:max-w-md">
            {TRUST_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.badgeKey}
                  className="flex items-center gap-2.5 rounded-full border border-gold/25 px-4 py-2"
                >
                  <Icon size={15} strokeWidth={1.7} className="text-gold" />
                  <span className="text-xs font-medium text-white/70">
                    {t(item.badgeKey)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= LANDSCAPE GRID ================= */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gold/15 bg-gold/15 md:grid-cols-2">

          {qualitySteps.map((stage, i) => {
            const Icon = STEP_ICONS[i];
            const imageLeft = i % 2 === 0;

            return (
              <article
                key={stage.step}
                className="group relative flex items-center gap-5 bg-[#1A211D] p-5 transition-colors duration-300 hover:bg-[#1F2823] lg:p-7"
              >
                {/* IMAGE */}
                <div
                  className={`relative shrink-0 overflow-hidden rounded-xl w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 ${
                    imageLeft ? "order-1" : "order-2"
                  }`}
                >
                  <Image
                    src={STEP_IMAGES[i]}
                    alt={tc(stage.title)}
                    className="h-full w-full"
                    fittingType="fill"
                  />
                </div>

                {/* TEXT */}
                <div className="relative min-w-0 flex-1">
                  <span className="pointer-events-none absolute -top-5 -right-2 select-none font-heading text-5xl leading-none text-gold/10">
                    {stage.step}
                  </span>

                  <div className="relative">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30">
                      <Icon size={17} strokeWidth={1.7} className="text-gold" />
                    </div>

                    <h3 className="font-heading text-xl leading-tight text-white lg:text-2xl">
                      {tc(stage.title)}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {tc(stage.text)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ================= FOOTER BAR ================= */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-gold/15 pt-8 lg:flex-row lg:items-center">
          <p className="font-heading text-xl leading-tight text-white lg:text-2xl">
            <span className="text-gold">{t("home.journey.ctaLeft")}</span>,{" "}
            <span className="italic">{t("home.journey.ctaBold")}</span>
          </p>

          <Link
            to="/seeds"
            className="inline-flex shrink-0 items-center gap-3 rounded-lg border border-gold/40 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-gold/10"
          >
            {t("home.journey.ctaBtn")}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}