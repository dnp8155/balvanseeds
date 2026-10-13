import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images } from "@/lib/siteData";
export default function FarmerManifesto() {
  const { t, tc } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-charcoal text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl">
              <Image src={images.farmer} alt="Shri Vajabhai Patel, Founder" className="aspect-[4/3] w-full sm:aspect-[4/5]" fittingType="fill" focalPointX={0.5} focalPointY={0.35} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="inline-block h-px w-12 bg-gold" />
            <blockquote className="mt-5 sm:mt-6">
              <p className="font-heading text-xl font-400 leading-[1.2] text-balance sm:text-3xl lg:text-4xl text-gold">
                {tc("“I am a farmer's son... and perhaps that is my greatest identity.”")}
              </p>
            </blockquote>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <span className="text-xs font-700 uppercase tracking-wider text-emerald-400">{tc("Section 1 · The Sacred Trust of a Seed")}</span>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  {tc("Since childhood, I have watched farmers pour their sweat into the soil—reaching fields before sunrise and returning after dusk. A farmer does not merely sow a seed; he sows his children's dreams, his family's hopes, and an entire year of labour. A seed is the farmer's trust, his hope, and the first foundation of his future.")}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <span className="text-xs font-700 uppercase tracking-wider text-gold">{tc("Section 2 · The Genesis of Balvan & Our Eternal Pledge")}</span>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  {tc("This very sentiment became the driving purpose behind Balvan Agro Seeds. My dream was never simply to build a big company, but that whenever a farmer sows our seed, he feels with conviction: ")}
                  <span className="italic text-gold font-600">{tc("“Balvan stands with me.”")}</span>
                  {" "}
                  {tc("Farmers must never have to struggle for quality seeds—pure, reliable seeds on time, reflecting their proud harvest smile.")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="font-heading text-lg font-400 italic text-white">{tc("Shri Vajabhai Patel")}</p>
                <p className="text-sm text-primary-foreground/50">{tc("Founder, Balvan Agro Seeds")}</p>
              </div>
              <Link to="/about#owner-vision" className="group inline-flex items-center gap-2 text-sm font-600 text-gold hover:text-accent">
                {t("home.brand.discover")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}