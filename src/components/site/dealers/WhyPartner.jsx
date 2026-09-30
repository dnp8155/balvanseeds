import React from "react";
import { Sprout, Megaphone, BookOpen, Network } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PILLARS = [
  { icon: Sprout, title: "Quality Seed Portfolio", text: "A diverse range of hybrid and improved varieties across field crops, fodder, spices and oilseeds." },
  { icon: Megaphone, title: "Marketing Support", text: "Co-branded materials, demonstration plots and local kisan mela participation to drive demand." },
  { icon: BookOpen, title: "Technical Guidance", text: "Agronomy resources, cultivation guides and direct access to our research and field team." },
  { icon: Network, title: "Expanding Network", text: "A growing presence across seven states with a trusted, quality-driven brand reputation." },
];

export default function WhyPartner() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <span className="text-xs font-600 uppercase tracking-[0.2em] text-[#8b7355]">
            {tc("Why Partner With Us")}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl lg:text-[2.75rem] text-balance">
            {tc("Growing Together")}
            <br />
            {tc("for a Better Tomorrow")}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="px-0 lg:px-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf/10">
                  <Icon className="h-5 w-5 text-leaf" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-sm font-600 uppercase tracking-wider text-foreground">
                  {tc(p.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tc(p.text)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
