import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, FlaskConical, Sprout, Wheat } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images } from "@/lib/siteData";

const features = [
  { icon: Leaf, title: "Farmer First", text: "Every variety is shaped by real field feedback from the farmers who grow it." },
  { icon: FlaskConical, title: "Research Driven", text: "Rigorous trials and disciplined selection across multiple locations and seasons." },
  { icon: Sprout, title: "Quality Assured", text: "Germination, purity and moisture verified on every seed lot before it reaches you." },
  { icon: Wheat, title: "Field Proven", text: "Performance confirmed in real farmer fields, not just trial plots." },
];

export default function OurApproach() {
  const { tc } = useLanguage();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left — text + feature grid */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="text-xs font-600 uppercase tracking-[0.2em] text-primary">
                {tc("OUR APPROACH")}
              </p>
            </div>
            <h2 className="mt-5 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-5xl lg:text-[3.5rem] text-balance">
              {tc("From Research to Real Fields")}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg">
              {tc("At Balavanagro, we combine scientific research with real farm conditions to develop seeds that perform where it matters — in your field.")}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10 lg:mt-12">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title}>
                    <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                    <h3 className="mt-4 text-base font-700 text-foreground">{tc(f.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tc(f.text)}</p>
                  </div>
                );
              })}
            </div>

            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring lg:mt-12"
            >
              {tc("Our Story")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right — image collage */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {/* Large vertical photo — spans 2 rows */}
            <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl">
              <Image
                src={images.greenhouse}
                alt="Researcher planting a seed with tweezers"
                className="h-full min-h-[300px] w-full sm:min-h-[420px]"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.4}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent p-5">
                <p className="text-xs font-600 uppercase tracking-wider text-white leading-relaxed">
                  {tc("RESEARCH TODAY / STRONGER TOMORROW")}
                </p>
              </div>
            </div>

            {/* Top-right — farmer in field */}
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={images.farmer}
                alt="Farmer working in field"
                className="aspect-[4/3] w-full"
                fittingType="fill"
              />
            </div>

            {/* Top-right — text block on dark green */}
            <div className="flex items-center rounded-2xl bg-primary p-4 sm:p-5">
              <p className="text-[11px] font-600 uppercase tracking-wider text-primary-foreground leading-relaxed sm:text-xs">
                {tc("REAL CONDITIONS. REAL RESULTS.")} —
              </p>
            </div>

            {/* Mid-right — hands holding seeds */}
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={images.seed}
                alt="Hands holding seeds"
                className="aspect-[4/3] w-full"
                fittingType="fill"
              />
            </div>

            {/* Mid-right — beige block */}
            <div className="flex items-center rounded-2xl bg-gold-soft p-4 sm:p-5">
              <p className="text-[11px] font-600 uppercase tracking-wider text-accent-foreground leading-relaxed sm:text-xs">
                {tc("BETTER SEEDS / STRONGER / FARMERS")}
              </p>
            </div>

            {/* Bottom — wide field photo spanning both columns */}
            <div className="col-span-2 overflow-hidden rounded-2xl">
              <Image
                src={images.wheatField}
                alt="Row-cropped field at harvest"
                className="aspect-[16/6] w-full"
                fittingType="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}