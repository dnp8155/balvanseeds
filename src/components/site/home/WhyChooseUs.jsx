import React from "react";
import { Cog, Users, Headset, Truck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
const features = [
  { icon: Cog, title: "Advanced Technology", desc: "Modern breeding and processing methods for superior seed quality." },
  { icon: Users, title: "Expert Team", desc: "Experienced agronomists guiding farmers at every stage." },
  { icon: Headset, title: "Customer Support", desc: "Dedicated helpline for crop guidance and seed queries." },
  { icon: Truck, title: "Pan-India Distribution", desc: "Authorised dealer network across 7 states for easy access." },
];
export default function WhyChooseUs() {
  const { tc } = useLanguage();
  return <section className="bg-cream"><div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
    <div className="mx-auto max-w-xl text-center"><div className="flex items-center justify-center gap-2.5"><span className="h-px w-8 bg-primary" /><span className="text-[11px] font-700 uppercase tracking-[0.2em] text-primary">{tc("Why Choose Us")}</span><span className="h-px w-8 bg-primary" /></div><h2 className="mt-3.5 font-heading text-[28px] font-700 leading-tight text-foreground sm:text-[32px] lg:text-[34px]">{tc("Your Trusted Seed Partner")}</h2></div>
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">{features.map(({ icon: Icon, title, desc }) => <div key={title} className="group relative flex flex-col items-center rounded-2xl border border-primary/10 bg-card/60 px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-card hover:shadow-soft lg:items-start lg:text-left"><span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100" /><div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted transition-colors duration-300 group-hover:bg-primary"><Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" strokeWidth={1.8} /></div><h3 className="mt-5 font-heading text-[17px] font-700 leading-snug text-foreground">{tc(title)}</h3><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{tc(desc)}</p></div>)}</div>
  </div></section>;
}