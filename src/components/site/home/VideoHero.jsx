import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images } from "@/lib/siteData";

export default function VideoHero() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.warn("Autoplay prevented:", e));
    }
  }, [videoReady]);

  return (
    <section className="relative mt-6 h-[94vh] min-h-[640px] w-full overflow-hidden rounded-3xl bg-charcoal">
      <div className="absolute inset-0 overflow-hidden">
        {/* Poster image stays until the video is ready, then crossfades — no flash */}
        <img
          src={images.hero}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          src="https://media.base44.com/videos/public/6a64d5af72b38f08fd5a080e/a0efeea0f_NestedSequence01_7.mp4"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-charcoal/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <p className="editorial-label text-gold">Balavan Agro</p>
          </div>
          <p className="mt-2 text-xs font-600 tracking-[0.15em] text-white/60">Research · Quality · Farmers</p>
        </div>

        <h1 className={`mt-7 max-w-4xl font-heading text-4xl font-400 leading-[1.05] text-white text-balance transition-all delay-75 duration-700 sm:text-6xl lg:text-7xl ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          {t("home.hero.title")}
        </h1>

        <p className={`mt-7 max-w-xl text-base leading-relaxed text-white/70 transition-all delay-150 duration-700 sm:text-lg ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          {t("home.hero.desc")}
        </p>

        <div className={`mt-9 flex flex-wrap items-center gap-4 transition-all delay-200 duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <Link to="/seeds" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-600 text-charcoal transition hover:bg-white focus-ring">
            {t("home.hero.explore")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/seeds" className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-600 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10 focus-ring">
            <Search className="h-4 w-4" />
            {t("home.hero.find")}
          </Link>
        </div>
      </div>

      {/* Field note micro-detail — top left */}
      <div className="absolute left-4 top-4 z-10 hidden items-center gap-3 sm:left-6 sm:flex lg:left-8">
        <span className="h-px w-8 bg-gold/50" />
        <div className="leading-tight">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/40">BALAVANAGRO SEEDS</p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-gold/70">FIELD NOTE / 01</p>
        </div>
      </div>

      {/* Technical info line */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-charcoal/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center divide-x divide-white/10 px-4 sm:px-6 lg:px-8">
          {["Research-Led", "Multi-Location Trials", "Quality Tested"].map((label) => (
            <span key={label} className="flex-1 py-4 text-center text-xs font-600 tracking-[0.15em] text-white/60">
              {label}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}