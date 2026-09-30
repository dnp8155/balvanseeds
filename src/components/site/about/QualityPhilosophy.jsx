import React from "react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const STEPS = [
  { label: "Research", desc: "Parent lines bred and screened" },
  { label: "Selection", desc: "Disciplined advancement" },
  { label: "Testing", desc: "Germination, purity, moisture" },
  { label: "Verification", desc: "Genetic purity confirmed" },
  { label: "Farmer", desc: "Agronomy support throughout" },
];

export default function QualityPhilosophy() {
  const { tc } = useLanguage();
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-6 lg:order-2">
            <span className="inline-block h-px w-12 bg-gold" />
            <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.1] text-foreground sm:text-4xl lg:text-5xl text-balance">
              {tc("Every seed carries a responsibility.")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {tc("From breeding to the farmer's field, each seed passes through a disciplined chain of research, testing and verification — so what reaches your soil is genuine, vigorous and true to type.")}
            </p>

            <div className="mt-10 space-y-px overflow-hidden border border-border bg-border">
              {STEPS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-4 bg-card p-4 transition hover:bg-sage/20">
                  <div className="grid h-8 w-8 shrink-0 place-items-center bg-primary text-primary-foreground">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="flex flex-1 items-baseline justify-between gap-4">
                    <h3 className="font-heading text-lg font-400 text-foreground">{tc(s.label)}</h3>
                    <p className="text-sm text-muted-foreground">{tc(s.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="overflow-hidden">
              <Image
                src={images.nurseryRack}
                alt="Seed quality testing at Balavan Agro"
                className="aspect-[4/5] w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.4}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
