import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { news } from "@/lib/siteData";
import SectionHeading from "@/components/site/SectionHeading";
import NewsCard from "@/components/site/NewsCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NewsPreview() {
  const { t } = useLanguage();
  const [featured, ...rest] = news;
  return (
    <section className="bg-cream/60 border-y border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("home.news.eyebrow")}
            title={t("home.news.title")}
            description={t("home.news.desc")}
          />
          <Link
            to="/news"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring sm:self-auto"
          >
            {t("common.allNews")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <NewsCard article={featured} featured />
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.slice(0, 2).map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}