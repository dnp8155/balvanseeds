import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NewsCard({ article, featured = false, className }) {
  const { t, tc, lang } = useLanguage();
  const content = (
    <article className={cn(
      "group flex flex-col overflow-hidden rounded-xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift h-full",
      featured && "lg:flex-row",
      className
    )}>
      <div className={cn("relative overflow-hidden bg-muted", featured ? "lg:w-1/2 aspect-[16/10] lg:aspect-auto" : "aspect-[16/10]")}>
        <Image src={article.cover} alt={article.title} className="h-full w-full transition duration-500 group-hover:scale-105" fittingType="fill" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-600 text-primary">{tc(article.category)}</span>
      </div>
      <div className={cn("flex flex-1 flex-col p-5", featured && "lg:p-8 lg:justify-center")}>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(article.date, lang)}</span>
        </div>
        <h3 className={cn("mt-2 font-heading font-600 leading-snug text-foreground", featured ? "text-2xl lg:text-3xl" : "text-lg")}>{article.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{article.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-primary transition group-hover:gap-2.5">
          {t("common.readMore")} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </article>
  );

  return <Link to={`/news/${article.slug}`} className="block focus-ring rounded-xl">{content}</Link>;
}

function formatDate(d, lang = "en") {
  const locale = lang === "hi" ? "hi-IN" : lang === "gu" ? "gu-IN" : "en-IN";
  return new Date(d).toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}