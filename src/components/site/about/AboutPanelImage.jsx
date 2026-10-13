import React from "react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function AboutPanelImage({ panel, aspect }) {
  const { tc } = useLanguage();
  return <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift"><Image src={panel.src} alt={tc(panel.alt)} className={`w-full ${aspect} object-cover`} fittingType="fill" focalPointX={0.5} focalPointY={0.42} /><span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 font-heading text-sm text-gold">{panel.num}</span><div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal/55 to-transparent" /><div className="absolute bottom-3 left-3 right-3"><p className="text-[11px] font-600 uppercase tracking-[0.12em] text-primary-foreground">{tc(panel.caption)}</p><p className="mt-0.5 text-[10px] italic text-primary-foreground/90">{tc(panel.ethos)}</p></div></div>;
}