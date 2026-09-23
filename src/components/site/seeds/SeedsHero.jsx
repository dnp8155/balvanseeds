import React from "react";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SeedsHero() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          {/* Left — title block */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-leaf" />
              <span className="text-[11px] font-600 uppercase tracking-[0.2em] text-leaf">
                {tc("Our Seed Varieties")}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-4xl font-400 leading-[1.05] text-foreground sm:text-5xl lg:text-[3.5rem] text-balance">
              {tc("Find the Right Variety")}
              <br />
              {tc("for Your Field")}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {tc("Explore our wide range of high-performing seeds, developed for better yields, stronger crops and a brighter tomorrow.")}
            </p>
          </div>

          {/* Right — script + trusted badge */}
          <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
            <p className="font-heading text-2xl italic leading-tight text-leaf sm:text-3xl">
              {tc("Good Seeds")}
              <br />
              {tc("Brighter Futures")}
            </p>
            <div className="inline-flex items-center gap-2.5 rounded-full bg-primary px-5 py-3">
              <Leaf className="w-4 h-4 shrink-0 text-gold" strokeWidth={1.5} />
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