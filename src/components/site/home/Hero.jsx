import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images, whatsappLink } from "@/lib/siteData";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: images.hero,
    overlay: "from-primary via-primary/85 to-primary/30",
    eyebrow: "Est. 2014 · Sanand, Ahmedabad",
    title: "Seeds bred for the fields that feed India.",
    description:
      "Balavan Agro develops hybrid and improved varieties for bajra, wheat, mustard, groundnut, cumin and more — tested in real farmer fields across Gujarat, Rajasthan and Madhya Pradesh.",
    primary: { to: "/seeds", label: "Explore Seeds" },
    secondary: {
      href: whatsappLink("Hello Balavan Agro, I would like to discuss seed varieties for my farm."),
      label: "Talk to our agronomy team"
    }
  },
  {
    image: images.fieldTexture,
    overlay: "from-primary via-primary/80 to-primary/25",
    eyebrow: "Government Acknowledged · Valid 2025 – 2030",
    title: "Varieties officially acknowledged by the Gujarat State Department of Agriculture.",
    description:
      "17 crops and 23 hybrid & improved varieties — from pearl millet and wheat to isabgol and fodder maize — formally recognised for cultivation across the state.",
    primary: { to: "/certificates", label: "View Certifications" },
    secondary: {
      href: whatsappLink("Hello Balavan Agro, I would like to know about your acknowledged varieties."),
      label: "Enquire on WhatsApp"
    }
  },
  {
    image: images.farmer,
    overlay: "from-primary via-primary/85 to-primary/30",
    eyebrow: "Farmer-first research",
    title: "From our trial fields to your harvest.",
    description:
      "Every variety is shaped by real field feedback. Multi-location trials, demonstration plots and on-farm consultations keep our research honest and our seeds dependable.",
    primary: { to: "/farmer-stories", label: "Farmer Stories" },
    secondary: {
      href: whatsappLink("Hello Balavan Agro, I would like a demonstration plot on my farm."),
      label: "Request a demo plot"
    }
  }
];

const stats = [
  { value: 17, suffix: "", label: "Crop categories" },
  { value: 23, suffix: "", label: "Seed varieties" },
  { value: 3, suffix: "", label: "Trial states" },
  { value: 12, suffix: "k+", label: "Farmers reached" }
];

function CountUp({ value, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return (
    <dt ref={ref} className="font-heading text-2xl font-600 text-white sm:text-3xl tabular-nums">
      {n}
      {suffix}
    </dt>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = slides[active];

  return (
    <section
      className="relative overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i !== active}
        >
          <Image src={s.image} alt="" className="h-full w-full" fittingType="fill" />
          <div className={cn("absolute inset-0 bg-gradient-to-tr", s.overlay)} />
        </div>
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-600 uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {slide.eyebrow}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-600 leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem] text-balance">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {slide.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to={slide.primary.to}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-600 text-primary shadow-lift transition hover:bg-white/90 focus-ring"
            >
              {slide.primary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={slide.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-600 text-white transition hover:bg-white/10 focus-ring"
            >
              <MessageCircle className="w-4 h-4" />
              {slide.secondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* Numbered progress indicators (Pioneer / Corteva style) */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="group flex items-center gap-2.5 focus-ring rounded-md"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
            >
              <span
                className={cn(
                  "grid place-items-center w-7 h-7 rounded-full border text-xs font-600 transition",
                  i === active
                    ? "border-white bg-white text-primary"
                    : "border-white/40 text-white/70 hover:border-white"
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "hidden sm:block h-px transition-all duration-500",
                  i === active ? "w-16 bg-white" : "w-8 bg-white/30"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Stats band */}
      <div className="relative border-t border-white/15 bg-primary/30 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={cn("px-4 py-5 text-center sm:py-6", i !== 0 && "sm:border-l border-white/15")}
              >
                <CountUp value={s.value} suffix={s.suffix} />
                <dd className="mt-1 text-[11px] font-500 uppercase tracking-wider text-white/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}