import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { site, images } from "@/lib/siteData";
import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "@/lib/siteSettings";

const DEFAULT_VIDEO = "https://media.base44.com/videos/public/6a64d5af72b38f08fd5a080e/a0efeea0f_NestedSequence01_7.mp4";

export default function VideoHero() {
  const { t, tc } = useLanguage();
  const [playVideo, setPlayVideo] = useState(false);
  const { data: settings = {} } = useQuery({
    queryKey: ["home-settings"],
    queryFn: () => fetchSettings("home_page"),
    staleTime: 600000,
  });

  const videoUrl = settings.hero_video || DEFAULT_VIDEO;
  const posterUrl = settings.hero_image || site.ogImage || images.hero;

  // Defer background video until after main thread settles to guarantee sub-1.5s LCP on mobile
  useEffect(() => {
    // Only stream heavy MP4 on desktop screens when connection is idle
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setPlayVideo(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const t = setTimeout(() => setPlayVideo(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <section className="relative mt-14 flex min-h-[520px] flex-col overflow-hidden bg-charcoal sm:mt-20 sm:min-h-[600px] lg:mt-24 lg:h-[calc(92vh-6rem)]">
      {/* Instant LCP Poster Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={posterUrl}
          alt="Balvan Agro Seeds Field Harvest in Gujarat India"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />

        {/* Video stream (activated cleanly after idle on desktop) */}
        {playVideo && (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/45 to-charcoal/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div>
          <span className="inline-block h-px w-12 bg-gold" />
        </div>
        <h1 className="mt-5 max-w-4xl font-heading text-3xl font-400 leading-[1.05] text-primary-foreground text-balance sm:mt-6 sm:text-6xl lg:text-[5.5rem]">
          {settings.hero_title || tc("Bij Balvan, Kishaan Dhanwan")}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/90 sm:mt-8 sm:text-lg">
          {settings.hero_subtitle || tc("Hybrid and improved varieties developed for Indian soil, seasons and growing conditions — from Kharif bajra to Rabi wheat.")}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
          <Link to="/seeds" className="group inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf sm:px-8 sm:py-4">
            {t("home.hero.explore")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/seeds" className="group inline-flex items-center gap-2 border border-primary-foreground/25 bg-primary-foreground/5 px-6 py-3.5 text-sm font-600 text-primary-foreground backdrop-blur-sm transition hover:border-primary-foreground/50 hover:bg-primary-foreground/10 sm:px-8 sm:py-4">
            <Search className="h-4 w-4" />
            {t("home.hero.find")}
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block pointer-events-none">
        <ChevronDown className="h-5 w-5 animate-bounce text-primary-foreground/40" />
      </div>
    </section>
  );
}