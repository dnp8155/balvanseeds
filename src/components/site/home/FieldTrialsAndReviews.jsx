import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MessageCircle, Play, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { testimonials, videos, whatsappLink } from "@/lib/siteData";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import VideoModal from "@/components/site/VideoModal";

export default function FieldTrialsAndReviews() {
  const { tc } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="bg-cream/40 border-y border-border py-14 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs font-700 uppercase tracking-widest text-primary">
                {tc("Field Proofs & Farmer Trust")}
              </span>
            </div>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-600 text-foreground">
              {tc("Real Field Trials. Proven Harvests.")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
              {tc("See how Balvan Agro varieties perform in actual fields across Gujarat and Rajasthan. Hear directly from farmers who achieved 400+ quintal yields.")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/farmer-stories"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-5 py-2.5 text-xs sm:text-sm font-600 text-primary transition hover:bg-primary hover:text-white"
            >
              {tc("All Farmer Stories")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs sm:text-sm font-600 text-foreground transition hover:border-primary hover:text-primary"
            >
              {tc("Field Photo Gallery")}
            </Link>
          </div>
        </div>

        {/* Video Trials Row */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-lg sm:text-xl font-600 text-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white text-[11px] font-bold">
                ▶
              </span>
              {tc("Live Demonstration & Crop Walkthroughs")}
            </h3>
            <Link to="/videos" className="text-xs sm:text-sm font-600 text-primary hover:underline flex items-center gap-1">
              {tc("Watch More Videos")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.slice(0, 3).map((v) => (
              <div
                key={v.id}
                onClick={() => setActiveVideo(v)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={v.thumb}
                    alt={v.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/30 transition group-hover:bg-charcoal/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition duration-300 group-hover:scale-110">
                      <Play className="h-5 w-5 fill-white translate-x-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-2.5 left-2.5 rounded bg-charcoal/80 px-2 py-0.5 text-[11px] font-600 text-white backdrop-blur-sm">
                    {tc(v.category)}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-heading text-sm sm:text-base font-600 text-foreground line-clamp-2 group-hover:text-primary transition">
                    {tc(v.title)}
                  </h4>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{tc(v.crop)} · {v.variety}</span>
                    <span className="text-primary font-600">{tc("Watch Video")} →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Testimonials Cards with Real Yields */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-lg sm:text-xl font-600 text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold" />
              {tc("Verified Farmer Feedback & Yield Reports")}
            </h3>
            <span className="text-xs text-muted-foreground font-500">
              {tc("Gujarat & Rajasthan Trials")}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-soft transition hover:border-gold/60 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-700 text-primary">
                      {tc(t.highlight)}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-foreground/80 italic">
                    "{tc(t.quote)}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-700 text-foreground">{tc(t.farmer)}</h4>
                    <p className="text-[11px] text-muted-foreground">
                      {t.village}, {t.district} ({t.state})
                    </p>
                  </div>
                  <a
                    href={whatsappLink(`Hello Balvan Agro, I want to learn more about ${t.variety} yield in ${t.district}. Please connect me with dealer or agronomist.`)}
                    target="_blank"
                    rel="noreferrer"
                    title={tc("Ask About This Variety")}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1ebd5a] hover:bg-[#25D366] hover:text-white transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Quick Action CTA Box */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-primary via-leaf to-primary p-6 sm:p-8 text-white shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-600">
              <Award className="h-3.5 w-3.5 text-gold" />
              {tc("High Yielding Certified Varieties")}
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-600">
              {tc("Want Field Demonstration Seeds for Your Village?")}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              {tc("Connect directly with our Chief Agronomist for sowing guides, seed availability and bulk dealer pricing.")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink("Hello Balvan Agro, I am interested in testing your seeds on my farm / bulk inquiry for my shop.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-700 text-primary shadow-soft transition hover:bg-gold hover:text-charcoal"
            >
              <MessageCircle className="h-4 w-4 fill-[#25D366] text-[#25D366]" />
              {tc("Instant WhatsApp Inquiry")}
            </a>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-xs sm:text-sm font-600 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {tc("Download Full Catalogue")}
            </Link>
          </div>
        </div>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
