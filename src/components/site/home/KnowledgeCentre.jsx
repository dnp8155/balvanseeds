import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { news, images } from "@/lib/siteData";

export default function KnowledgeCentre() {
  const { t } = useLanguage();
  const featured = news[0];
  const secondary = news.slice(1, 4);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <section className="bg-sage/30 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-label text-primary/60">Knowledge Centre</p>
            <h2 className="mt-4 font-heading text-3xl font-400 leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Knowledge for
              <br />
              <span className="italic text-primary">better decisions.</span>
            </h2>
          </div>
          <Link to="/news" className="group inline-flex items-center gap-2 text-sm font-600 text-primary transition">
            {t("common.allNews")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Featured article — large */}
          <Link to={`/news/${featured.slug}`} className="group lg:col-span-7">
            <div className="overflow-hidden">
              <Image
                src={featured.cover}
                alt={featured.title}
                className="aspect-[16/10] w-full transition duration-700 group-hover:scale-105"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.45}
              />
            </div>
            <div className="mt-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold">{featured.category}</span>
                <span className="text-xs text-muted-foreground">{formatDate(featured.date)}</span>
                <span className="text-border">·</span>
                <span className="text-xs text-muted-foreground">5 min read</span>
              </div>
              <h3 className="mt-3 font-heading text-2xl font-400 leading-snug text-foreground transition group-hover:text-primary sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {featured.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-primary">
                Read article
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Secondary articles — editorial list */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {secondary.map((article) => (
              <Link
                key={article.slug}
                to={`/news/${article.slug}`}
                className="group flex gap-5 border-b border-border pb-6 last:border-0 last:pb-0"
              >
                <div className="shrink-0 overflow-hidden">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    className="h-24 w-24 transition duration-500 group-hover:scale-110"
                    fittingType="fill"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-600 text-gold">{article.category}</span>
                    <span className="text-border">·</span>
                    <span className="text-muted-foreground">{formatDate(article.date)}</span>
                    <span className="text-border">·</span>
                    <span className="text-muted-foreground">3 min read</span>
                  </div>
                  <h3 className="mt-1.5 font-heading text-lg font-400 leading-snug text-foreground transition group-hover:text-primary line-clamp-2">
                    {article.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-600 text-primary">
                    Read article
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}