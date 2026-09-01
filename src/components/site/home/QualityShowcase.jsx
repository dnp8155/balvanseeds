import React from "react";
import { Image } from "@/components/ui/image";
import { Sprout, ShieldCheck } from "lucide-react";
import { images } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function QualityShowcase() {
  const { t } = useLanguage();
  const metrics = [
    { value: "≥ 90%", label: t("home.quality.m1"), note: t("home.quality.m1n") },
    { value: "≥ 98%", label: t("home.quality.m2"), note: t("home.quality.m2n") },
    { value: "≤ 8%", label: t("home.quality.m3"), note: t("home.quality.m3n") },
    { value: "100%", label: t("home.quality.m4"), note: t("home.quality.m4n") }
  ];

  const standards = [t("home.quality.s1"), t("home.quality.s2"), t("home.quality.s3"), t("home.quality.s4")];

  const testCards = [
    { title: t("home.quality.card1"), text: t("home.quality.card1d"), image: images.nurseryRack },
    { title: t("home.quality.card2"), text: t("home.quality.card2d"), image: images.greenhouse },
    { title: t("home.quality.card3"), text: t("home.quality.card3d"), image: images.greenhouseRow }
  ];

  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={t("home.quality.eyebrow")}
          title={t("home.quality.title")}
          description={t("home.quality.desc")}
        />

        {/* Editorial 7/5 split — image left, narrative + inline metrics right */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-7">
            <div className="relative overflow-hidden">
              <Image
                src={images.greenhouse}
                alt={t("home.quality.imgAlt")}
                className="aspect-[4/3] w-full"
                fittingType="fill"
              />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-600 text-primary shadow-soft backdrop-blur">
                  <Sprout className="h-3.5 w-3.5 text-leaf" /> {t("home.quality.germVerified")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-600 text-primary shadow-soft backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5 text-leaf" /> {t("home.quality.iso")}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Inline editorial metrics — no boxes, left accent rule */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-6">
              {metrics.map((m) => (
                <div key={m.label} className="border-l-2 border-gold/50 pl-4">
                  <p className="font-heading text-4xl font-600 leading-none text-primary">{m.value}</p>
                  <p className="mt-2 text-sm font-600 text-foreground">{m.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{m.note}</p>
                </div>
              ))}
            </div>

            {/* Standards as editorial list with dot markers */}
            <ul className="mt-10 space-y-3 border-t border-border pt-8">
              {standards.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Test areas as cinematic image-led overlays */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testCards.map((c, i) => (
            <div key={c.title} className="group relative h-80 overflow-hidden">
              <Image src={c.image} alt={c.title} className="h-full w-full transition duration-700 group-hover:scale-105" fittingType="fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/10" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-heading text-xs font-600 tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1.5 font-heading text-xl font-600 text-white">{c.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}