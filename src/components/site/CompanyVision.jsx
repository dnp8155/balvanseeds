import React from "react";
import { motion } from "framer-motion";
import { Wheat, User, Users, Leaf, Sprout, Heart } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const OUTCOMES = [
  { icon: Wheat, label: "Healthy Food" },
  { icon: User, label: "Prosperous Farmers" },
  { icon: Users, label: "Stronger Communities" },
  { icon: Leaf, label: "A Sustainable Planet" },
];

const PILLARS = [
  { icon: Sprout, title: "Thriving Farms", text: "Every field full of potential." },
  { icon: Users, title: "Stronger Communities", text: "Better opportunities for rural communities." },
  { icon: Heart, title: "A Healthier India", text: "Nutritious food for generations." },
  { icon: Leaf, title: "A Sustainable Future", text: "In harmony with nature." },
];

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function CompanyVision() {
  const { tc } = useLanguage();
  const vp = { once: true, margin: "-80px" };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* ── Main editorial composition ── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-5 lg:items-start">
          {/* LEFT — Headline + vision + handwritten note */}
          <div className="lg:col-span-4 lg:pt-8">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0)}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="text-[11px] font-600 uppercase tracking-[0.2em] text-gold">{tc("Our Vision")}</span>
              </div>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={fade(0.1)}
              className="mt-5 font-heading text-3xl font-400 leading-[1.08] text-foreground sm:text-4xl lg:text-[2.5rem] text-balance"
            >
              {tc("Nourishing Lives,")}
              <br />
              {tc("Growing")}
              <br />
              <span className="text-leaf">{tc("a Better Tomorrow")}</span>
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              variants={fade(0.2)}
              className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground"
            >
              {tc("Our vision is to build a trusted seed company recognised for innovation, quality and farmer success, contributing to a more productive, sustainable and food-secure future.")}
            </motion.p>

            {/* Handwritten brand annotation */}
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fade(0.3)} className="mt-8">
              <p className="font-heading text-lg italic leading-tight text-leaf">
                {tc("Seeds")}
                <br />
                {tc("for a Better")}
                <br />
                {tc("Tomorrow")}
              </p>
              <svg width="110" height="10" viewBox="0 0 110 10" fill="none" className="mt-1 text-gold">
                <path d="M2 6 Q 28 1, 55 5 T 108 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </motion.div>
          </div>

          {/* CENTER — Arched agricultural image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fade(0.15)}
            className="lg:col-span-3 overflow-hidden rounded-t-[4rem] rounded-b-2xl lg:-my-4"
          >
            <Image
              src={images.riceField}
              alt="A healthy agricultural field under natural light"
              className="aspect-[3/4] w-full object-cover"
              fittingType="fill"
              focalPointX={0.5}
              focalPointY={0.4}
            />
          </motion.div>

          {/* GREEN PANEL — Vision outcomes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fade(0.2)}
            className="lg:col-span-2 rounded-t-[3rem] rounded-b-[3rem] bg-primary p-6 lg:p-7 lg:-my-4"
          >
            <div className="flex h-full flex-col gap-5 lg:gap-6">
              {OUTCOMES.map((o, i) => {
                const Icon = o.icon;
                return (
                  <React.Fragment key={o.label}>
                    <div>
                      <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                      <p className="mt-2.5 text-[10px] font-600 uppercase tracking-[0.12em] text-primary-foreground/90">
                        {tc(o.label)}
                      </p>
                    </div>
                    {i < OUTCOMES.length - 1 && <span className="h-px w-full bg-primary-foreground/15" />}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>

          {/* FARMER IMAGE — with quote overlay */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={fade(0.25)}
            className="relative lg:col-span-2 overflow-hidden rounded-t-[3rem] rounded-b-2xl lg:-my-4"
          >
            <Image
              src={images.farmer}
              alt="An Indian farmer looking across a field"
              className="aspect-[3/4] w-full object-cover"
              fittingType="fill"
              focalPointX={0.5}
              focalPointY={0.35}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-5 left-4 right-4">
              <p className="font-heading text-base italic leading-tight text-white sm:text-lg">
                {tc("\u201CA brighter")}
                <br />
                {tc("tomorrow begins")}
                <br />
                {tc("in today's fields.\u201D")}
              </p>
              <span className="mt-2.5 block h-px w-10 bg-gold" />
            </div>
          </motion.div>

          {/* RIGHT EDGE — Margin annotation */}
          <div className="hidden lg:col-span-1 lg:block lg:pt-10">
            <div className="flex flex-col gap-0.5 text-[9px] font-600 uppercase tracking-[0.2em] text-muted-foreground/50">
              <span>{tc("Rooted")}</span>
              <span>{tc("In")}</span>
              <span>{tc("Nature.")}</span>
              <span className="mt-3">{tc("Growing")}</span>
              <span>{tc("Together.")}</span>
            </div>
          </div>
        </div>

        {/* ── Vision pillars — thin vertical rules, no cards ── */}
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fade(0.1 + i * 0.08)}
                  className={`px-5 ${i > 0 ? "lg:border-l border-border" : ""}`}
                >
                  <Icon className="h-5 w-5 text-leaf" strokeWidth={1.5} />
                  <p className="mt-3 text-[11px] font-600 uppercase tracking-[0.12em] text-foreground">{tc(p.title)}</p>
                  <p className="mt-1.5 text-[13px] leading-snug text-muted-foreground">{tc(p.text)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom photographic strip ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.wheatField}
            alt="Close-up of healthy green crops in natural light"
            className="h-full w-full"
            fittingType="fill"
            focalPointX={0.5}
            focalPointY={0.6}
          />
          <div className="absolute inset-0 bg-charcoal/65" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-heading text-lg italic text-white sm:text-xl">
              {tc("Small Seeds.")} <span className="text-gold">{tc("Big Possibilities.")}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-600 uppercase tracking-[0.2em] text-white/80">
              <span>{tc("People")}</span>
              <span className="text-gold">|</span>
              <span>{tc("Fields")}</span>
              <span className="text-gold">|</span>
              <span>{tc("Communities")}</span>
              <span className="text-gold">|</span>
              <span>{tc("Tomorrow")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
