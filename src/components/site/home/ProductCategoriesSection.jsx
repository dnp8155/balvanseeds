import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import FeaturedSeedCard from "@/components/site/home/FeaturedSeedCard";
import useHomeSeeds from "@/components/site/home/useHomeSeeds";
export default function ProductCategoriesSection() {
  const { tc } = useLanguage();
  const { data: seeds = [], isPending, isError, refetch } = useHomeSeeds("range");
  const [offset, setOffset] = useState(0);
  useEffect(() => { if (seeds.length <= 6) return; const timer = setInterval(() => setOffset(p => (p + 1) % seeds.length), 3000); return () => clearInterval(timer); }, [seeds.length]);
  const visible = seeds.length ? Array.from({ length: Math.min(6, seeds.length) }, (_, i) => seeds[(offset + i) % seeds.length]) : [];
  return <section className="bg-background"><div className="mx-auto max-w-[1250px] px-4 sm:px-6 lg:px-8 py-10 lg:py-16"><motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-[650px] text-center"><div className="flex items-center justify-center gap-2.5"><span className="h-px w-8 bg-primary" /><span className="text-[11px] font-700 uppercase tracking-[0.15em] text-primary">{tc("Our Products")}</span><span className="h-px w-8 bg-primary" /></div><h2 className="mt-3.5 font-heading text-[30px] font-700 leading-tight text-primary sm:text-[32px] lg:text-[34px]">{tc("Wide Range of Premium Seeds")}</h2><p className="mx-auto mt-3 max-w-[650px] text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{tc("We offer a diverse range of high-quality seeds for various crops, designed to meet the needs of modern farmers and ensure maximum productivity.")}</p></motion.div>
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:mt-12 lg:grid-cols-6 lg:gap-5">{isPending ? Array.from({ length: 6 }, (_, i) => <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-border bg-card"><div className="aspect-square bg-muted" /><div className="h-12 bg-muted/50" /></div>) : visible.map((seed, i) => <AnimatePresence mode="wait" key={`${i}-${offset}`}><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}><FeaturedSeedCard seed={seed} compact /></motion.div></AnimatePresence>)}</div>
    {isError ? <button onClick={() => refetch()} className="mt-5 w-full text-center text-sm text-primary">{tc("Unable to load seeds. Try again.")}</button> : !isPending && !seeds.length && <p className="py-8 text-center text-sm text-muted-foreground">{tc("No published seed varieties yet.")}</p>}
  </div></section>;
}