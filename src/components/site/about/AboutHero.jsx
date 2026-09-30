import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const STATS = [
  { value: "10+", label: "Crop Categories" },
  { value: "7", label: "States Served" },
  { value: "2014", label: "Founded" },
];

const PANELS = [
  {
    src: images.seed,
    alt: "Farmer's hand placing seeds into natural soil",
    num: "01",
    caption: "Better Seeds",
    ethos: "Rooted in Nature",
  },
  {
    src: images.wheatField,
    alt: "Healthy crop rows in an Indian agricultural field",
    num: "02",
    caption: "Stronger Farms",
    ethos: "Driven by People",
  },
  {
    src: images.farmer,
    alt: "Indian farmer standing in a healthy field at morning light",
    num: "03",
    caption: "Brighter Tomorrows",
    ethos: "Growing a Greener Tomorrow",
  },
];

const v = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

function PanelImage({ panel, aspect, tc }) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift">
      <Image
        src={panel.src}
        alt={tc(panel.alt)}
        className={`w-full ${aspect} object-cover`}
        fittingType="fill"
        focalPointX={0.5}
        focalPointY={0.42}
      />
      {/* Number badge */}
      <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 font-heading text-sm text-gold">
        {panel.num}
      </span>
      {/* Readability gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
      {/* Caption + ethos */}
      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-[11px] font-600 uppercase tracking-[0.12em] text-white">{tc(panel.caption)}</p>
        <p className="mt-0.5 text-[10px] italic text-white/90">{tc(panel.ethos)}</p>
      </div>
    </div>
  );
}

export default function AboutHero() {
  const { tc } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:min-h-[680px]">
          {/* ── LEFT — Typography ── */}
          <div className="flex flex-col justify-center py-14 lg:py-16 lg:col-span-5">
            <motion.div initial="hidden" animate="visible" variants={v(0)}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[11px] font-600 uppercase tracking-[0.2em] text-gold">
                  {tc("About Balavan Agro")}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={v(0.1)}
              className="mt-6 font-heading text-[2.5rem] font-400 leading-[1.05] text-foreground sm:text-5xl lg:text-[3.4rem]"
            >
              {tc("From a Seed")}
              <br />
              {tc("to a Stronger")}
              <br />
              <span className="text-gold">{tc("Tomorrow")}</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={v(0.2)}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base"
            >
              {tc("At Balavan Agro, we are more than a seed company. We are a partner in progress — working with farmers, through science and innovation, to grow a healthier, more resilient tomorrow.")}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={v(0.3)}
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <a
                href="#journey"
                className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-600 text-primary-foreground transition hover:bg-[#1B4332]"
              >
                {tc("Our Journey")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/videos"
                className="group inline-flex items-center gap-3 text-sm font-600 text-foreground"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                {tc("Watch Our Story")}
                <span className="text-xs font-400 text-muted-foreground">2 MIN</span>
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={v(0.4)}
              className="mt-12 hidden lg:block"
            >
              <p className="text-[10px] font-600 uppercase tracking-[0.25em] text-muted-foreground/70">
                {tc("Rooted in India")} · {tc("Growing for Generations")}
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT — Photographic composition ── */}
          <div className="lg:col-span-7">
            {/* Mobile stack */}
            <div className="flex flex-col gap-5 lg:hidden">
              {PANELS.map((p, i) => (
                <motion.figure key={p.num} initial="hidden" animate="visible" variants={v(0.3 + i * 0.1)}>
                  <PanelImage panel={p} aspect="aspect-[4/3]" tc={tc} />
                </motion.figure>
              ))}
              <motion.p
                initial="hidden"
                animate="visible"
                variants={v(0.6)}
                className="mt-1 font-heading text-lg italic text-leaf"
              >
                {tc("Growing possibilities together.")}
              </motion.p>
            </div>

            {/* Desktop composition */}
            <div className="relative hidden lg:block" style={{ height: "640px" }}>
              {/* Panel 1 — Seed (top-left) */}
              <motion.figure
                initial="hidden"
                animate="visible"
                variants={v(0.2)}
                className="absolute left-0 top-0 z-10 w-[40%]"
              >
                <PanelImage panel={PANELS[0]} aspect="aspect-[4/5]" tc={tc} />
              </motion.figure>

              {/* Panel 2 — Crop (center-right, largest) */}
              <motion.figure
                initial="hidden"
                animate="visible"
                variants={v(0.35)}
                className="absolute right-0 top-[36px] z-20 w-[58%]"
              >
                <PanelImage panel={PANELS[1]} aspect="aspect-[5/4]" tc={tc} />
              </motion.figure>

              {/* Panel 3 — Farmer (bottom-left, overlapping) */}
              <motion.figure
                initial="hidden"
                animate="visible"
                variants={v(0.5)}
                className="absolute bottom-0 left-[7%] z-30 w-[42%]"
              >
                <PanelImage panel={PANELS[2]} aspect="aspect-[3/4]" tc={tc} />
              </motion.figure>

              {/* Handwritten annotation */}
              <motion.p
                initial="hidden"
                animate="visible"
                variants={v(0.65)}
                className="absolute right-[1%] bottom-[3%] z-40 font-heading text-xl italic text-leaf"
              >
                {tc("Growing possibilities together.")}
              </motion.p>
            </div>
          </div>
        </div>

        {/* ── Stats line ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={v(0.6)}
          className="border-t border-border py-7"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex items-baseline gap-3 sm:flex-1">
                  <span className="font-heading text-3xl font-400 text-foreground lg:text-4xl">{s.value}</span>
                  <span className="text-[11px] font-600 uppercase tracking-[0.15em] text-muted-foreground">{tc(s.label)}</span>
                </div>
                {i < STATS.length - 1 && <span className="hidden h-10 w-px bg-border sm:block" />}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
