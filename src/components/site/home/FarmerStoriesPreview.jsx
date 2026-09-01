import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { testimonials } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FarmerStoriesPreview() {
  const { t, tc } = useLanguage();
  const [feature, ...rest] = testimonials;
  return (
    <section className="bg-cream/50">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-600 uppercase tracking-[0.2em] text-muted-foreground">
              {t("home.farmer.eyebrow")}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-600 leading-[1.08] text-foreground sm:text-4xl text-balance">
              {t("home.farmer.title")}
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              {t("home.farmer.desc")}
            </p>
            <Link to="/farmer-stories" className="group mt-7 inline-flex items-center gap-2 text-sm font-600 text-primary">
              {t("common.readAll")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <Link to="/farmer-stories" className="group block">
              <div className="relative">
                <span aria-hidden className="absolute -left-2 -top-10 select-none font-heading text-8xl leading-none text-gold/30 sm:text-9xl">&ldquo;</span>
                <blockquote className="relative font-heading text-xl font-500 leading-[1.5] text-foreground sm:text-2xl text-balance">
                  {tc(feature.quote)}
                </blockquote>
                <div className="mt-7 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40">
                    <Image src={feature.image} alt={feature.farmer} className="h-full w-full" fittingType="fill" />
                  </div>
                  <div>
                    <p className="font-heading text-base font-600 text-foreground">{feature.farmer}</p>
                    <p className="text-sm text-muted-foreground">{feature.village}, {feature.district}, {tc(feature.state)}</p>
                  </div>
                  <span className="ml-auto hidden rounded-full bg-leaf-soft px-3 py-1.5 text-xs font-600 uppercase tracking-wide text-leaf sm:inline-block">
                    {tc(feature.highlight)}
                  </span>
                </div>
              </div>
            </Link>

            <div className="mt-10 grid gap-px border-t border-border pt-8 sm:grid-cols-3">
              {rest.slice(0, 3).map((item) => (
                <Link key={item.id} to="/farmer-stories" className="group flex flex-col py-2 sm:px-5 sm:first:pl-0">
                  <p className="text-xs font-600 uppercase tracking-[0.18em] text-gold">{tc(item.crop)}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground">&ldquo;{tc(item.quote)}&rdquo;</p>
                  <p className="mt-3 text-xs font-600 text-muted-foreground">— {item.farmer}, {tc(item.state)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}