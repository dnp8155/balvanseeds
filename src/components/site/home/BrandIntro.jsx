import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images, site, presenceStates } from "@/lib/siteData";

export default function BrandIntro() {
  const { t } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 lg:items-center">
          {/* Left — editorial text */}
          <div className="lg:col-span-6">
            <p className="editorial-label text-primary/60">Field Note</p>
            <h2 className="mt-5 font-heading text-3xl font-400 leading-[1.1] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {t("home.brand.title")}
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("home.brand.desc")}
            </p>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-600 text-primary transition"
            >
              {t("home.brand.discover")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
            </Link>

            {/* Presence */}
            <div className="mt-12 border-t border-border pt-6">
              <p className="text-xs font-600 tracking-[0.15em] text-muted-foreground">{t("home.brand.presenceLabel")}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {presenceStates.map((state, i) => (
                  <span key={state} className="text-sm text-foreground/70">
                    {state}
                    {i < presenceStates.length - 1 && <span className="ml-4 text-border">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — offset image */}
          <div className="lg:col-span-6">
            <div className="relative lg:ml-8">
              <div className="overflow-hidden">
                <Image
                  src={images.greenhouseRow}
                  alt="Rows of healthy seedlings in a research greenhouse"
                  className="aspect-[4/5] w-full"
                  fittingType="fill"
                  focalPointX={0.5}
                  focalPointY={0.4}
                />
              </div>
              {/* EST. badge — clean, no decorative frame */}
              <div className="absolute -left-2 -top-2 bg-primary px-5 py-3 lg:-left-6">
                <p className="font-heading text-3xl font-400 leading-none text-primary-foreground">2014</p>
                <p className="mt-1 editorial-label text-primary-foreground/60">EST.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}