import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Calendar, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { getNews, news } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CTASection from "@/components/site/CTASection";
import Seo from "@/components/site/Seo";
import { SITE_DOMAIN } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NewsDetail() {
  const { slug } = useParams();
  const { t, tc, lang } = useLanguage();
  const article = getNews(slug);

  if (!article) return <Navigate to="/news" replace />;

  const related = news.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${article.title} | Balavan Agro`}
        description={article.excerpt}
        image={article.cover}
        canonical={`${SITE_DOMAIN}/news/${slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "NewsArticle",
              headline: article.title,
              description: article.excerpt,
              image: [article.cover],
              datePublished: article.date,
              author: { "@type": "Organization", name: "Balavan Agro" },
              publisher: { "@type": "Organization", name: "Balavan Agro" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_DOMAIN}/` },
                { "@type": "ListItem", position: 2, name: "News", item: `${SITE_DOMAIN}/news` },
                { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_DOMAIN}/news/${slug}` },
              ],
            },
          ],
        }}
      />
      <PageHero
        eyebrow={tc(article.category)}
        title={article.title}
        subtitle={article.excerpt}
        image={article.cover}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("news.breadcrumb"), to: "/news" }, { label: article.title }]} />
      </div>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(article.date, lang)}</span>
          <span className="inline-flex items-center gap-1.5"><Tag className="w-4 h-4" />{tc(article.category)}</span>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl shadow-lift">
          <Image src={article.cover} alt={article.title} className="aspect-[16/9] w-full" fittingType="fill" />
        </div>

        <div className="mt-8 prose prose-stone max-w-none">
          <p className="text-lg leading-relaxed text-foreground/90">{article.body}</p>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-600 text-primary hover:gap-3 transition focus-ring rounded">
            <ArrowLeft className="w-4 h-4" /> {t("newsDetail.backAllNews")}
          </Link>
        </div>
      </article>

      <section className="bg-cream/60 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-heading text-2xl font-600 text-foreground">{t("newsDetail.moreFrom")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} to={`/news/${a.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition hover:shadow-lift focus-ring">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <Image src={a.cover} alt={a.title} className="h-full w-full transition duration-500 group-hover:scale-105" fittingType="fill" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">{formatDate(a.date, lang)} · {tc(a.category)}</p>
                  <h3 className="mt-1.5 font-heading text-base font-600 leading-snug text-foreground line-clamp-2">{a.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-600 text-primary">{t("common.readMore")} <ArrowRight className="w-4 h-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={t("newsDetail.stayUpdated")} description={t("newsDetail.stayUpdatedDesc")} primary={{ label: t("common.contactUs"), to: "/contact" }} />
    </>
  );
}

function formatDate(d, lang = "en") {
  const locale = lang === "hi" ? "hi-IN" : lang === "gu" ? "gu-IN" : "en-IN";
  return new Date(d).toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}