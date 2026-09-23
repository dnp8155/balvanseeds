import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Leaf } from "lucide-react";

const IMG_SEEDLING =
  "https://media.base44.com/images/public/6a64d5af72b38f08fd5a080e/304bb49c1_generated_image.png";
const IMG_FARMER =
  "https://media.base44.com/images/public/6a64d5af72b38f08fd5a080e/071cde10a_generated_image.png";
const IMG_HANDS =
  "https://media.base44.com/images/public/6a64d5af72b38f08fd5a080e/392c68d31_generated_image.png";

const VALUES_LIST = [
  "Integrity",
  "Farmer First",
  "Innovation",
  "Sustainability",
  "Quality in Everything We Do",
];

const RIGHT_BLOCKS = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To develop and supply high-quality seeds that help farmers achieve better yields, higher incomes and a more food-secure future.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be a globally trusted seed company known for innovation, quality and positive impact on agriculture and communities.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function OrganicVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* Thin organic green outline ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#4F8A3A]/30" />
      <div className="absolute inset-3 rounded-full border border-[#4F8A3A]/20" />

      {/* Main large circle — farmer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_12px_40px_rgba(18,60,42,0.18)]"
      >
        <img src={IMG_FARMER} alt="Farmer in field at golden hour" className="h-full w-full object-cover" />
      </motion.div>

      {/* Top-left overlapping circle — seedling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -10 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-2 h-[42%] w-[42%] overflow-hidden rounded-full border-4 border-[#F8F8F2] shadow-[0_8px_24px_rgba(18,60,42,0.2)]"
      >
        <img src={IMG_SEEDLING} alt="Young seedling in soil" className="h-full w-full object-cover" />
      </motion.div>

      {/* Bottom-right overlapping circle — hands holding plant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 10 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-2 right-0 h-[44%] w-[44%] overflow-hidden rounded-full border-4 border-[#F8F8F2] shadow-[0_8px_24px_rgba(18,60,42,0.2)]"
      >
        <img src={IMG_HANDS} alt="Hands holding a young plant" className="h-full w-full object-cover" />
      </motion.div>

      {/* Floating leaf accents */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 top-8 text-[#4F8A3A]/50"
      >
        <Leaf className="h-7 w-7" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-1 bottom-12 text-[#4F8A3A]/40"
      >
        <Leaf className="h-6 w-6" />
      </motion.div>
    </div>
  );
}

export default function OurStorySection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F8F2]">
      {/* Decorative leaves — top corners */}
      <motion.div
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-3 top-10 text-[#4F8A3A]/15 lg:left-8 lg:top-16"
      >
        <Leaf className="h-16 w-16" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute right-3 top-20 text-[#4F8A3A]/12 lg:right-10"
      >
        <Leaf className="h-12 w-12" />
      </motion.div>

      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* ── 3-column grid ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 lg:items-center">
          {/* LEFT — 35% */}
          <div className="lg:col-span-4 xl:col-span-4">
            <motion.span
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="inline-flex items-center gap-2.5 text-[11px] font-700 uppercase tracking-[0.22em] text-[#4F8A3A]"
            >
              <span className="h-px w-8 bg-[#4F8A3A]" />
              Our Story
            </motion.span>

            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="mt-5 font-heading text-[2rem] font-700 leading-[1.1] text-[#123C2A] text-balance sm:text-[2.5rem] lg:text-[2.75rem]"
            >
              From a Simple Belief
              <br />
              to a <span className="text-[#4F8A3A]">Greater Impact</span>
            </motion.h2>

            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="mt-6 text-[14px] leading-relaxed text-[#4A5A4A] sm:text-[15px]"
            >
              Balavan Agro was founded with a simple yet powerful belief –
              high-quality seeds can transform lives. What started as a
              commitment to support farmers has grown into a trusted seed
              manufacturing company, serving agriculture communities across
              diverse regions.
            </motion.p>
            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="mt-4 text-[14px] leading-relaxed text-[#4A5A4A] sm:text-[15px]"
            >
              Today, we combine science, innovation and real field experience
              to deliver seed solutions that perform – in today's fields and
              for tomorrow's generations.
            </motion.p>

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
              className="mt-8"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-md bg-[#123C2A] px-7 py-3.5 text-sm font-600 text-white shadow-[0_4px_16px_rgba(18,60,42,0.25)] transition hover:bg-[#4F8A3A] hover:shadow-[0_6px_24px_rgba(79,138,58,0.35)]"
              >
                Explore Our Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p
                className="mt-5 font-heading text-lg italic leading-tight text-[#4F8A3A]/80"
              >
                "Growing Together for a Healthier Tomorrow"
              </p>
            </motion.div>
          </div>

          {/* CENTER — 40% organic visual */}
          <div className="flex justify-center py-4 lg:col-span-5 xl:col-span-5">
            <OrganicVisual />
          </div>

          {/* RIGHT — 25% info blocks */}
          <div className="flex flex-col gap-6 lg:col-span-3 xl:col-span-3">
            {RIGHT_BLOCKS.map((block, i) => (
              <motion.div
                key={block.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 2}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4F8A3A]/12">
                  <block.icon className="h-5.5 w-5.5 text-[#4F8A3A]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-700 text-[#123C2A]">
                    {block.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#4A5A4A]">
                    {block.text}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Values block */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={4}
              className="flex gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4F8A3A]/12">
                <Leaf className="h-5.5 w-5.5 text-[#4F8A3A]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-700 text-[#123C2A]">
                  Our Values
                </h3>
                <ul className="mt-2 space-y-1">
                  {VALUES_LIST.map((v) => (
                    <li
                      key={v}
                      className="flex items-center gap-2 text-[13px] leading-relaxed text-[#4A5A4A]"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#4F8A3A]" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom organic wave transition ── */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 90"
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: "70px" }}
        >
          <path
            d="M0,50 C240,90 480,10 720,40 C960,70 1200,20 1440,45 L1440,90 L0,90 Z"
            fill="#F8F8F2"
          />
          <path
            d="M0,50 C240,90 480,10 720,40 C960,70 1200,20 1440,45"
            fill="none"
            stroke="#4F8A3A"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
        </svg>

        {/* Decorative line + leaf + phrase */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-center">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-[#4F8A3A]/30 sm:w-24" />
            <motion.div
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf className="h-4 w-4 text-[#4F8A3A]/50" />
            </motion.div>
            <span className="text-[10px] font-700 uppercase tracking-[0.2em] text-[#123C2A]/70 sm:text-[11px]">
              Better Seeds. Stronger Communities. A Greener Tomorrow.
            </span>
            <motion.div
              animate={{ rotate: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Leaf className="h-4 w-4 text-[#4F8A3A]/50" />
            </motion.div>
            <span className="h-px w-16 bg-[#4F8A3A]/30 sm:w-24" />
          </div>
        </div>
      </div>
    </section>
  );
}