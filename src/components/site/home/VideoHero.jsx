import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { images, site } from "@/lib/siteData";
import { fetchSettings } from "@/lib/siteSettings";

const DEFAULT_VIDEO =
  "https://media.base44.com/videos/public/6a64d5af72b38f08fd5a080e/a0efeea0f_NestedSequence01_7.mp4";

export default function VideoHero() {
  const { t, tc } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchSettings("home_page").then(setSettings).catch(() => {});
  }, []);

  const heroImage = settings.hero_image || site.ogImage;
  const heroTitle = settings.hero_title || tc("Seeds built for real Indian fields.");
  const heroSubtitle =
    settings.hero_subtitle ||
    tc(
      "Hybrid and improved varieties developed for Indian soil, seasons and growing conditions — from Kharif bajra to Rabi wheat."
    );
  const heroVideo = settings.hero_video || DEFAULT_VIDEO;

  return (
    <section className="relative mt-14 flex min-h-[520px] flex-col overflow-hidden bg-charcoal sm:mt-20 sm:min-h-[600px] lg:mt-24 lg:h-[calc(92vh-6rem)]">
      <div className="absolute inset-0 overflow-hidden">
        <video
          src={loaded ? heroVideo : undefined}
          poster={heroImage}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/35 to-charcoal/92" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className={`transition-all delay-75 duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <span className="inline-block h-px w-12 bg-gold" />
        </div>
        <h1 className={`mt-5 max-w-4xl font-heading text-3xl font-400 leading-[1.05] text-white text-balance transition-all delay-100 duration-700 sm:mt-6 sm:text-6xl lg:text-[5.5rem] ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          {heroTitle}
        </h1>

        <p className={`mt-5 max-w-xl text-sm leading-relaxed text-white/90 transition-all delay-200 duration-700 sm:mt-8 sm:text-lg ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          {heroSubtitle}
        </p>

        <div className={`mt-8 flex flex-wrap items-center gap-3 transition-all delay-300 duration-700 sm:mt-10 sm:gap-4 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <Link to="/seeds" className="group inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-sm font-600 text-charcoal transition hover:bg-white sm:px-8 sm:py-4">
            {t("home.hero.explore")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/seeds" className="group inline-flex items-center gap-2 border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-600 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10 sm:px-8 sm:py-4">
            <Search className="h-4 w-4" />
            {t("home.hero.find")}
          </Link>
        </div>
      </div>

      <div className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 transition-all delay-700 duration-700 lg:block ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <ChevronDown className="h-5 w-5 animate-bounce text-white/40" />
      </div>
    </section>
  );
}