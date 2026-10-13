import React from "react";
import { Leaf } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const HERO_IMG =
  "https://media.base44.com/images/public/6ac3b31ca417959b7c2b9d1e/65325842d_generated_7eb21787.jpg";

export default function SeedsHero() {
  const { tc } = useLanguage();
  return (
    <section className="relative border-b border-border">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HERO_IMG}
          alt="Balvan Agro Seeds Catalogue — High-Yield Hybrid and Improved Agricultural Crops"
          className="h-full w-full opacity-50 animate-drift"
          fittingType="fill"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/55" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div className="max-w-[760px] animate-fade-up">
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-leaf" />
              <span className="text-[11px] font-600 uppercase tracking-[0.2em] text-leaf">
                {tc("Our Seed Varieties")}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-4xl font-400 leading-[1.05] text-foreground sm:text-5xl lg:text-[3.5rem] text-balance">
              {tc("Find the Right Variety")}
              <br />
              {tc("for Your Field")}
            </h1>
            <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-muted-foreground">
              {tc("Explore our wide range of high-performing seeds, developed for better yields, stronger crops and a brighter tomorrow.")}
            </p>
          </div>
          <div className="flex flex-col items-end gap-5 animate-fade-up [animation-delay:0.2s]">
            <p className="text-right font-heading text-3xl italic leading-[1.15] text-leaf">
              {tc("Good Seeds")}
              <br />
              {tc("Brighter Futures")}
            </p>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-primary px-5 py-3">
              <Leaf className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span className="text-[10px] font-600 uppercase tracking-[0.12em] text-primary-foreground">
                {tc("Trusted by Farmers. Proven in Fields.")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}