import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images, presenceStates } from "@/lib/siteData";

export default function BrandIntro() {
  const { t, tc } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 lg:items-center">
          {/* Image with stat overlay */}
          <div className="lg:col-span-6 lg:order-2">
            <div className="relative">
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
              {/* Stat card overlay */}
              <div className="absolute -bottom-8 -left-4 bg-card p-6 shadow-lift sm:-left-8 lg:p-8">
                <p className="font-heading text-4xl font-400 text-primary lg:text-5xl">{presenceStates.length}</p>
                <p className="mt-1 text-xs font-500 uppercase tracking-[0.12em] text-muted-foreground">{tc("States served")}</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-6 lg:order-1">
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.08] text-foreground sm:text-4xl lg:text-[3.5rem] text-balance">
              {t("home.brand.title")}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("home.brand.desc")}
            </p>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-600 text-primary transition"
            >
              {t("home.brand.discover")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <div className="mt-14 border-t border-border pt-6">
              <p className="text-xs font-500 uppercase tracking-[0.12em] text-muted-foreground">{t("home.brand.presenceLabel")}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {presenceStates.map((state) => (
                  <span key={state} className="flex items-center gap-2 text-sm font-500 text-foreground/80">
                    <span className="h-1 w-1 bg-gold" />
                    {tc(state)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
