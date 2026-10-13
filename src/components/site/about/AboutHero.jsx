import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AboutPanelImage from "@/components/site/about/AboutPanelImage";
const stats = [{ value: "10+", label: "Crop Categories" }, { value: "7", label: "States Served" }, { value: "2014", label: "Founded" }];
const panels = [
  { src: images.seed, alt: "Farmer's hand placing seeds into natural soil", num: "01", caption: "Better Seeds", ethos: "Rooted in Nature" },
  { src: images.wheatField, alt: "Healthy crop rows in an Indian agricultural field", num: "02", caption: "Stronger Farms", ethos: "Driven by People" },
  { src: images.farmer, alt: "Indian farmer standing in a healthy field at morning light", num: "03", caption: "Brighter Tomorrows", ethos: "Growing a Greener Tomorrow" },
];
const v = delay => ({ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } } });
export default function AboutHero() {
  const { tc } = useLanguage();
  return <section className="relative overflow-hidden bg-background"><div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:min-h-[680px]">
    <div className="flex flex-col justify-center py-14 lg:py-16 lg:col-span-5">
      <motion.div initial="hidden" animate="visible" variants={v(0)}><div className="flex items-center gap-3"><span className="h-px w-10 bg-gold" /><span className="text-[11px] font-600 uppercase tracking-[0.2em] text-gold">{tc("About Balvan Agro")}</span></div></motion.div>
      <motion.h1 initial="hidden" animate="visible" variants={v(0.1)} className="mt-6 font-heading text-[2.5rem] font-400 leading-[1.05] text-foreground sm:text-5xl lg:text-[3.4rem]">{tc("From a Seed")}<br />{tc("to a Stronger")}<br /><span className="text-gold">{tc("Tomorrow")}</span></motion.h1>
      <motion.p initial="hidden" animate="visible" variants={v(0.2)} className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">{tc("At Balvan Agro, we are more than a seed company. We are a partner in progress — working with farmers, through science and innovation, to grow a healthier, more resilient tomorrow.")}</motion.p>
      <motion.div initial="hidden" animate="visible" variants={v(0.3)} className="mt-9 flex flex-wrap items-center gap-6"><a href="#journey" className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-600 text-primary-foreground hover:bg-leaf">{tc("Our Journey")}<ArrowRight className="h-4 w-4" /></a><Link to="/videos" className="group inline-flex items-center gap-3 text-sm font-600 text-foreground"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"><Play className="h-4 w-4 fill-current" /></span>{tc("Watch Our Story")}<span className="text-xs font-400 text-muted-foreground">2 MIN</span></Link></motion.div>
      <motion.div initial="hidden" animate="visible" variants={v(0.4)} className="mt-12 hidden lg:block"><p className="text-[10px] font-600 uppercase tracking-[0.25em] text-muted-foreground/70">{tc("Rooted in India")} · {tc("Growing for Generations")}</p></motion.div>
    </div>
    <div className="lg:col-span-7"><div className="flex flex-col gap-5 lg:hidden">{panels.map((p, i) => <motion.figure key={p.num} initial="hidden" animate="visible" variants={v(0.3 + i * 0.1)}><AboutPanelImage panel={p} aspect="aspect-[4/3]" /></motion.figure>)}<p className="mt-1 font-heading text-lg italic text-leaf">{tc("Growing possibilities together.")}</p></div>
      <div className="relative hidden h-[640px] lg:block"><motion.figure initial="hidden" animate="visible" variants={v(0.2)} className="absolute left-0 top-0 z-10 w-[40%]"><AboutPanelImage panel={panels[0]} aspect="aspect-[4/5]" /></motion.figure><motion.figure initial="hidden" animate="visible" variants={v(0.35)} className="absolute right-0 top-[36px] z-20 w-[58%]"><AboutPanelImage panel={panels[1]} aspect="aspect-[5/4]" /></motion.figure><motion.figure initial="hidden" animate="visible" variants={v(0.5)} className="absolute bottom-0 left-[7%] z-30 w-[42%]"><AboutPanelImage panel={panels[2]} aspect="aspect-[3/4]" /></motion.figure><motion.p initial="hidden" animate="visible" variants={v(0.65)} className="absolute right-[1%] bottom-[3%] z-40 font-heading text-xl italic text-leaf">{tc("Growing possibilities together.")}</motion.p></div>
    </div>
  </div><motion.div initial="hidden" animate="visible" variants={v(0.6)} className="border-t border-border py-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-center">{stats.map((s, i) => <React.Fragment key={s.label}><div className="flex items-baseline gap-3 sm:flex-1"><span className="font-heading text-3xl font-400 text-foreground lg:text-4xl">{s.value}</span><span className="text-[11px] font-600 uppercase tracking-[0.15em] text-muted-foreground">{tc(s.label)}</span></div>{i < stats.length - 1 && <span className="hidden h-10 w-px bg-border sm:block" />}</React.Fragment>)}</div></motion.div></div></section>;
}