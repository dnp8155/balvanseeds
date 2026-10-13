import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, TrendingUp, Download, MessageCircle, ArrowRight } from "lucide-react";
import { whatsappLink, site } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SeedCard from "@/components/site/SeedCard";
import CTASection from "@/components/site/CTASection";
import Seo from "@/components/site/Seo";
import NotFound from "@/pages/NotFound";
import LoadingSkeleton from "@/components/site/LoadingSkeleton";
import SeedDetailGallery from "@/components/site/seeds/SeedDetailGallery";
import SeedDetailContent from "@/components/site/seeds/SeedDetailContent";
import SeedCalculator from "@/components/site/seeds/SeedCalculator";
import {
  fetchVarietyBySlug,
  fetchPublishedCategories,
  fetchImagesForVariety,
  fetchDocumentsForVariety,
  fetchRelatedVarieties,
  buildCategoryLookup,
  toSeedCardProps,
  resolveMainImage,
  buildSeoTitle,
  buildSeoDescription,
} from "@/lib/seedCatalog";
import { SITE_DOMAIN, seoConfigSeedDetail } from "@/lib/seoConfig";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SeedDetail() {
  const { slug } = useParams();
  const { t, tc } = useLanguage();
  const [state, setState] = useState({ loading: true, error: false, notFound: false });
  const [variety, setVariety] = useState(null);
  const [category, setCategory] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let active = true;
    setState({ loading: true, error: false, notFound: false });
    setVariety(null);

    (async () => {
      try {
        const [v, cats] = await Promise.all([fetchVarietyBySlug(slug), fetchPublishedCategories()]);
        if (!active) return;
        if (!v) { setState({ loading: false, error: false, notFound: true }); return; }
        const lookup = buildCategoryLookup(cats);
        const cat = lookup.byId[v.crop_category_id];
        const [imgs, docs, rel] = await Promise.all([
          fetchImagesForVariety(v.id),
          fetchDocumentsForVariety(v.id),
          fetchRelatedVarieties(v.crop_category_id, v.id, 4),
        ]);
        if (!active) return;
        setVariety(v);
        setCategory(cat || null);
        setGallery(imgs);
        setDocuments(docs);
        setRelated(rel);
        setState({ loading: false, error: false, notFound: false });
      } catch {
        if (!active) return;
        setState({ loading: false, error: true, notFound: false });
      }
    })();

    return () => { active = false; };
  }, [slug]);

  if (state.loading) {
    return <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16"><LoadingSkeleton count={2} /></div>;
  }

  if (state.notFound) return <NotFound />;

  if (state.error) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-base font-600 text-foreground">{t("seedDetail.loadError")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("seedDetail.loadErrorDesc")}</p>
        <Link to="/seeds" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring">{t("seedDetail.backToSeeds")}</Link>
      </div>
    );
  }

  const v = variety;
  const cropName = category ? tc(category.name) : t("mega.seeds.allSeeds");
  const typeStyles = v.variety_type === "Hybrid" ? "bg-leaf-soft text-leaf" : "bg-gold-soft text-gold";
  const mainImage = resolveMainImage(v, gallery);
  const heroImage = mainImage;
  const seo = seoConfigSeedDetail(v, category);

  const specs = [
    { icon: Calendar, label: t("seedDetail.season"), value: v.suitable_season },
    { icon: MapPin, label: t("seedDetail.regions"), value: v.recommended_regions },
    { icon: Clock, label: t("seedDetail.maturity"), value: v.maturity_duration },
    { icon: TrendingUp, label: t("seedDetail.yield"), value: v.yield_information },
  ].filter((s) => s.value && s.value.trim() !== "");

  const faqEntries = [
    { q: `What is ${v.variety_name} ${cropName}?`, a: v.short_description || `${v.variety_name} is a ${v.variety_type.toLowerCase()} ${cropName} seed variety developed by Balvan Agro.` },
    { q: `Where does Balvan Agro source its seeds?`, a: `Balvan Agro develops and produces its seed varieties at its facility in Tharad, Gujarat, India.` },
    { q: `Can I contact Balvan Agro for bulk ${cropName} seed requirements?`, a: `Yes, you can contact Balvan Agro through the contact page or WhatsApp for bulk seed enquiries and variety selection guidance.` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Our Seeds", item: `${SITE_DOMAIN}/seeds` },
          ...(category ? [{ "@type": "ListItem", position: 3, name: tc(category.name), item: `${SITE_DOMAIN}/crops/${category.slug}` }] : []),
          { "@type": "ListItem", position: category ? 4 : 3, name: v.variety_name, item: `${SITE_DOMAIN}/seeds/${slug}` },
        ],
      },
      {
        "@type": "Product",
        name: `${v.variety_name} ${cropName} Seed`,
        description: seo.description,
        image: heroImage,
        url: `${SITE_DOMAIN}/seeds/${slug}`,
        sku: v.id,
        brand: { "@type": "Brand", name: site.name },
        category: cropName,
        additionalType: "AgriculturalProduct",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          seller: { "@type": "Organization", name: site.name },
          url: `${SITE_DOMAIN}/seeds/${slug}`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntries.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Seo {...seo} imageAlt={`${v.variety_name} — ${cropName} Seeds | Balvan Agro`} jsonLd={jsonLd} />
      <PageHero eyebrow={cropName} title={v.variety_name} subtitle={v.short_description} image={heroImage}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={cn("rounded-full px-3 py-1.5 text-xs font-600", typeStyles)}>{tc(v.variety_type)}</span>
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-600 text-primary">{cropName}</span>
        </div>
      </PageHero>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("seeds.breadcrumb"), to: "/seeds" }, ...(category ? [{ label: tc(category.name), to: `/crops/${category.slug}` }] : []), { label: v.variety_name }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div><SeedDetailGallery name={`${v.variety_name} — ${cropName}`} mainImage={mainImage} gallery={gallery} /></div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn("rounded-full px-3 py-1 text-xs font-600", typeStyles)}>{tc(v.variety_type)} {t("seedDetail.variety")}</span>
              <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-600 text-leaf">{cropName}</span>
            </div>
            <h2 className="mt-4 font-heading text-3xl font-600 text-foreground sm:text-4xl">{v.variety_name}</h2>
            {v.short_description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{v.short_description}</p>}
            {specs.length > 0 && (
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {specs.map((s) => (
                  <div key={s.label} className="rounded-sm border border-border bg-card p-4">
                    <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className="mt-1.5 text-sm font-500 text-foreground">{s.value}</p>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink(`Hello Balvan Agro, I am interested in ${v.variety_name} (${cropName} Seed). Please share the current seed price, availability, nearest authorized dealer, and sowing recommendations.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-700 text-white shadow-soft transition hover:bg-[#20ba59] hover:shadow-md focus-ring"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                {tc("1-Click WhatsApp Enquiry")}
              </a>
              {v.brochure_url && (
                <a
                  href={v.brochure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring"
                >
                  <Download className="w-4 h-4" />
                  {t("seedDetail.downloadBrochure")}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Acreage & Seed Rate Calculator for this variety */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <SeedCalculator
          initialCrop={category ? category.name : v.crop_category_id || ""}
          initialVariety={v.variety_name}
        />
      </section>

      <SeedDetailContent variety={v} documents={documents} />

      {related.length > 0 && (
        <section className="bg-cream/60 border-y border-border">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-600 text-foreground">{t("seedDetail.relatedVarieties")}</h2>
              <Link to="/seeds" className="inline-flex items-center gap-1.5 text-sm font-600 text-primary hover:gap-2.5 transition">{t("seedDetail.allSeeds")} <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {related.map((r) => <SeedCard key={r.id} seed={toSeedCardProps(r, { byId: { [r.crop_category_id]: category }, bySlug: {} })} />)}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <h2 className="font-heading text-2xl font-600 text-foreground">{tc("Frequently Asked Questions")}</h2>
        <div className="mt-8 space-y-4">
          {faqEntries.map((f) => (
            <div key={f.q} className="rounded-sm border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-600 text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title={t("seedDetail.ctaTitle")} description={t("seedDetail.ctaDesc")} primary={{ label: t("common.contactUs"), to: "/contact" }} />
    </>
  );
}