import React from "react";
import { Image } from "@/components/ui/image";
import { researchAreas } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function ResearchInnovation() {
  const { tc } = useLanguage();
  return <section className="bg-charcoal text-primary-foreground"><div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20"><div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
    <div className="lg:col-span-5"><span className="inline-block h-px w-12 bg-gold" /><h2 className="mt-5 font-heading text-2xl font-400 leading-[1.1] sm:mt-6 sm:text-4xl lg:text-[3rem] text-balance">{tc("The science behind every seed.")}</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/65 sm:mt-6 sm:text-[15px]">{tc("Built through research, field trials and disciplined selection across multiple locations and seasons.")}</p><div className="mt-8 aspect-[4/3] overflow-hidden sm:mt-10"><Image src={researchAreas[0].image} alt="Research greenhouse" className="h-full w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.45} /></div></div>
    <div className="lg:col-span-7 lg:border-l lg:border-primary-foreground/10 lg:pl-12"><ul>{researchAreas.map((r, i) => <li key={r.title} className="border-b border-primary-foreground/10 py-7 first:pt-0 last:border-0"><div className="flex items-baseline gap-6"><span className="font-heading text-2xl font-400 text-gold sm:text-[1.75rem]">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-heading text-xl font-400 sm:text-2xl">{tc(r.title)}</h3><p className="mt-2.5 text-sm leading-relaxed text-primary-foreground/55 sm:text-[15px]">{tc(r.text)}</p></div></div></li>)}</ul></div>
  </div></div></section>;
}