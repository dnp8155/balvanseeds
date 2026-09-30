import React from "react";
import { Cog, Users, Headset, Truck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const features = [
  {
    icon: Cog,
    title: "Advanced Technology",
    desc: "Modern breeding and processing methods for superior seed quality.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Experienced agronomists guiding farmers at every stage.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    desc: "Dedicated helpline for crop guidance and seed queries.",
  },
  {
    icon: Truck,
    title: "Pan-India Distribution",
    desc: "Authorised dealer network across 7 states for easy access.",
  },
];

export default function WhyChooseUs() {
  const { tc } = useLanguage();

  return (
    <section className="bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-px w-8 bg-[#3B4F35]" />
            <span className="text-[11px] font-700 uppercase tracking-[0.2em] text-[#3B4F35]">
              {tc("Why Choose Us")}
            </span>
            <span className="h-px w-8 bg-[#3B4F35]" />
          </div>
          <h2 className="mt-3.5 font-heading text-[28px] font-700 leading-tight text-[#1D1D1B] sm:text-[32px] lg:text-[34px]">
            {tc("Your Trusted Seed Partner")}
          </h2>
        </div>

        {/* Feature list */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative flex flex-col items-center rounded-2xl border border-[#3B4F35]/10 bg-white/60 px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#3B4F35]/25 hover:bg-white hover:shadow-[0_12px_40px_rgba(59,79,53,0.10)] lg:items-start lg:text-left"
              >
                {/* Top accent line */}
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-[#3B4F35] transition-transform duration-300 group-hover:scale-x-100" />

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8E7E0] transition-colors duration-300 group-hover:bg-[#3B4F35]">
                  <Icon
                    className="h-6 w-6 text-[#3B4F35] transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mt-5 font-heading text-[17px] font-700 leading-snug text-[#1D1D1B]">
                  {tc(f.title)}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#5A5A55]">
                  {tc(f.desc)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
