import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const STATS = [
  { value: "25+", labelKey: "home.stats.label1" },
  { value: "50K+", labelKey: "home.stats.label2" },
  { value: "12", labelKey: "home.stats.label3" },
  { value: "100+", labelKey: "home.stats.label4" },
];

export default function StatsBand() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-[#173E2A]/10 bg-[#F7F4EC] py-14 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.labelKey}
              className={`lg:px-10 ${i > 0 ? "lg:border-l lg:border-[#173E2A]/10" : ""}`}
            >
              <p className="font-heading text-[44px] leading-none text-[#0f5c2e] lg:text-[56px]">
                {stat.value}
              </p>
              <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.15em] text-[#516158]">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}