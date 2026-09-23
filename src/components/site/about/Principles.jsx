import React from "react";
import { Sprout, FlaskConical, ShieldCheck, Leaf, Recycle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PRINCIPLES = [
  { icon: Sprout, title: "Farmer First", desc: "Every variety is shaped by real field feedback from the farmers who grow it." },
  { icon: FlaskConical, title: "Research Integrity", desc: "Honest trials, transparent data and a refusal to overpromise on performance." },
  { icon: ShieldCheck, title: "Quality", desc: "Rigorous cleaning, grading and germination standards on every seed lot." },
  { icon: Leaf, title: "Climate Resilience", desc: "Breeding for heat, water stress and pest pressure that farmers actually face." },
  { icon: Recycle, title: "Responsible Innovation", desc: "Advancing genetics with care — for the soil, the season and the farmer." },
];

export default function Principles() {
  const { tc } = useLanguage();
  return (
    <section className="bg-cream/50">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-block h-px w-12 bg-gold" />
          <h2 className="mt-6 font-heading text-3xl font-400 leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
            {tc("What guides every variety we develop.")}
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="group bg-card p-8 transition hover:bg-sage/20">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center bg-primary/5 transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6 text-primary transition group-hover:text-primary-foreground" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-400 text-foreground">{tc(p.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tc(p.desc)}</p>
              </div>
            );
          })}
          <div className="hidden lg:block bg-primary p-8 text-primary-foreground">
            <p className="font-heading text-2xl font-400 leading-tight">
              {tc("Five principles.")}
              <br />
              {tc("One commitment.")}
            </p>
            <p className="mt-4 text-sm text-primary-foreground/70">
              {tc("Every seed we release carries these values from the breeding line to the farmer's field.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}