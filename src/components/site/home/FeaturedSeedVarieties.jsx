import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FeaturedSeedCard from "@/components/site/home/FeaturedSeedCard";
import useHomeSeeds from "@/components/site/home/useHomeSeeds";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function FeaturedSeedVarieties() {
  const { tc } = useLanguage();
  const { data: seeds = [], isPending, isError, refetch } = useHomeSeeds("featured");
  return <section className="bg-background"><div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-[600px]"><span className="text-[11px] font-700 uppercase tracking-[0.15em] text-primary">{tc("Featured Seed Varieties")}</span><h2 className="mt-2.5 font-heading text-[28px] font-700 leading-tight text-foreground sm:text-[32px] lg:text-[34px]">{tc("Our Best-Performing Varieties")}</h2><p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{tc("Trusted by farmers for their consistent performance and higher yields.")}</p></motion.div><Link to="/seeds" className="inline-flex items-center gap-1.5 rounded-lg border border-primary px-5 py-2.5 text-[13px] font-600 text-primary transition hover:bg-primary hover:text-primary-foreground">{tc("View All Seeds")}<ArrowRight className="h-4 w-4" /></Link></div>
    <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">{isPending ? Array.from({ length: 4 }, (_, i) => <div key={i} className="animate-pulse rounded-xl border border-border bg-card"><div className="aspect-[4/3] rounded-t-xl bg-muted" /><div className="h-24 bg-muted/50" /></div>) : seeds.map((seed, i) => <motion.div key={seed.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}><FeaturedSeedCard seed={seed} /></motion.div>)}</div>
    {isError ? <button onClick={() => refetch()} className="mt-5 text-sm text-primary">{tc("Unable to load seeds. Try again.")}</button> : !isPending && !seeds.length && <p className="py-8 text-center text-sm text-muted-foreground">{tc("No published seed varieties yet.")}</p>}
  </div></section>;
}