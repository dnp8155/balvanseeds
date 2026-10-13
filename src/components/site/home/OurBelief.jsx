import React from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import BeliefCollage from "@/components/site/home/BeliefCollage";
const features = ["Farmer Centric Approach", "Consistently Producing & Delivering Quality Seeds", "Experienced Balvan Team at Farmer's Service", "Improved Seeds to Meet Future Challenges"];
const paragraphs = [
  "Balvan Agro is a leading agriculture seeds supplier in India since 2014. With a commitment to innovation and excellence, we provide a diverse range of seeds to meet the unique needs of farmers across various Indian regions.",
  "Who can understand a farmer better than a farmer? Naturally, people in the same category can understand each other. Balvan Agro is founded by a farmer's family.",
  "We offer an extensive portfolio of seeds including Cereals, Pulse seeds, Oil seeds, Spice seeds, Vegetable seeds and Fodder seeds.",
];
export default function OurBelief() {
  const { tc } = useLanguage();
  return <section className="bg-background"><div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-20"><div className="grid gap-10 lg:grid-cols-[1fr_1.5fr_1.3fr] lg:gap-12 lg:items-center">
    <div><h2 className="font-heading text-2xl font-700 leading-[1.1] text-foreground sm:text-4xl lg:text-[2.75rem] text-balance">{tc("From Farmer to Farmer")}</h2><svg viewBox="0 0 240 10" className="mt-3 h-2.5 w-48 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M2 6 C 30 1, 50 1, 80 6 S 130 11, 160 6 S 210 1, 238 6" /></svg><ul className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">{features.map(f => <li key={f} className="flex items-start gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold"><Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} /></span><span className="text-sm font-600 leading-snug text-foreground sm:text-[15px]">{tc(f)}</span></li>)}</ul></div>
    <div className="space-y-5 sm:space-y-6">{paragraphs.map(p => <p key={p} className="text-sm leading-relaxed text-foreground/80 sm:text-base lg:leading-[1.8]">{tc(p)}</p>)}</div><div className="order-first lg:order-none"><BeliefCollage /></div>
  </div></div></section>;
}