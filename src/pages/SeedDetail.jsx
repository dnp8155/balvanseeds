import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, TrendingUp, Sprout, ShieldCheck, Download, MessageCircle, ArrowRight, Check, FileText } from "lucide-react";
import { Image } from "@/components/ui/image";
import { whatsappLink, site } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import SeedCard from "@/components/site/SeedCard";
import CTASection from "@/components/site/CTASection";
import Seo from "@/components/site/Seo";
import NotFound from "@/pages/NotFound";
import LoadingSkeleton from "@/components/site/LoadingSkeleton";
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
import { SITE_DOMAIN } from "@/lib/seoConfig";
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
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ loading: true, error: false, notFound: false });
    setVariety(null);
    setActiveImage(0);

    (async () => {
      try {
        const [v, cats] = await Promise.all([fetchVarietyBySlug(slug), fetchPublishedCategories()]);
        if (!active) return;
        if (!v) {
          setState({ loading: false, error: false, notFound: true });
          return;
        }
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

    return () => {
      active = false;
    };
  }, [slug]);

  if (state.loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16">
        <LoadingSkeleton count={2} />
      </div>
    );
  }

  if (state.notFound) return <NotFound />;

  if (state.error) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-base font-600 text-foreground">{t("seedDetail.loadError")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("seedDetail.loadErrorDesc")}</p>
        <Link to="/seeds" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-leaf focus-ring">
          {t("seedDetail.backToSeeds")}
        </Link>
      </div>
    );
  }

  const v = variety;
  const cropName = category ? tc(category.name) : t("mega.seeds.allSeeds");
  const typeStyles = v.variety_type === "Hybrid" ? "bg-leaf-soft text-leaf" : "bg-gold-soft text-gold";

  const mainImage = resolveMainImage(v, gallery);
  const galleryUrls = gallery.map((g) => g.image_url);
  const heroImage = mainImage;

  const seoTitle = buildSeoTitle(v, cropName);
  const seoDescription = buildSeoDescription(v);
  const canonical = `${SITE_DOMAIN}/seeds/${slug}`;
  const faqEntries = [
    {
      q: `What is ${v.variety_name} ${cropName}?`,
      a: v.short_description || `${v.variety_name} is a ${v.variety_type.toLowerCase()} ${cropName} seed variety developed by Balavan Agro.`,
    },
    {
      q: `Where does Balavan Agro source its seeds?`,
      a: `Balavan Agro develops and produces its seed varieties at its facility in Tharad, Gujarat, India.`,
    },
    {
      q: `Can I contact Balavan Agro for bulk ${cropName} seed requirements?`,
      a: `Yes, you can contact Balavan Agro through the contact page or WhatsApp for bulk seed enquiries and variety selection guidance.`,
    },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_DOMAIN}/` },
          { "@type": "ListItem", position: 2, name: "Our Seeds", item: `${SITE_DOMAIN}/seeds` },
          { "@type": "ListItem", position: 3, name: v.variety_name, item: canonical },
        ],
      },
      {
        "@type": "Product",
        name: `${v.variety_name} ${cropName} Seed`,
        description: seoDescription,
        image: heroImage,
        brand: { "@type": "Brand", name: site.name },
        category: cropName,
        additionalType: "AgriculturalProduct",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntries.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const specs = [
    { icon: Calendar, label: t("seedDetail.season"), value: v.suitable_season },
    { icon: MapPin, label: t("seedDetail.regions"), value: v.recommended_regions },
    { icon: Clock, label: t("seedDetail.maturity"), value: v.maturity_duration },
    { icon: TrendingUp, label: t("seedDetail.yield"), value: v.yield_information },
  ].filter((s) => s.value && s.value.trim() !== "");

  const guidance = [
    { icon: Sprout, title: t("seedDetail.sowing"), value: v.sowing_guidance },
    { icon: ShieldCheck, title: t("seedDetail.resistance"), value: v.disease_resistance },
    { icon: TrendingUp, title: t("seedDetail.seedRate"), value: v.seed_rate },
    { icon: Sprout, title: t("seedDetail.spacing"), value: v.plant_spacing },
    { icon: Calendar, title: t("seedDetail.irrigation"), value: v.irrigation_guidance },
    { icon: MapPin, title: t("seedDetail.soil"), value: v.soil_requirements },
    { icon: FileText, title: t("seedDetail.packaging"), value: v.packaging_information },
  ].filter((g) => g.value && g.value.trim() !== "");

  const features = Array.isArray(v.key_features) ? v.key_features.filter((f) => f && f.trim() !== "") : [];
  const lookup = category ? { byId: { [category.id]: category }, bySlug: {} } : { byId: {}, bySlug: {} };

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} image={heroImage} canonical={canonical} jsonLd={jsonLd} />

      <PageHero eyebrow={cropName} title={v.variety_name} subtitle={v.short_description} image={heroImage}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={cn("rounded-full px-3 py-1.5 text-xs font-600", typeStyles)}>{tc(v.variety_type)}</span>
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-600 text-primary">{cropName}</span>
        </div>
      </PageHero>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("seeds.breadcrumb"), to: "/seeds" }, { label: v.variety_name }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <Image src={activeImage >= 0 && galleryUrls[activeImage] ? galleryUrls[activeImage] : mainImage} alt={`${v.variety_name} — ${cropName}`} className="aspect-[4/3] w-full" fittingType="fill" />
            </div>
            {galleryUrls.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryUrls.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={cn("overflow-hidden rounded-xl border shadow-soft transition focus-ring", i === activeImage ? "border-primary ring-2 ring-ring" : "border-border hover:border-primary/50")}
                  >
                    <Image src={g} alt={`${v.variety_name} image ${i + 1}`} className="aspect-square w-full" fittingType="fill" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn("rounded-full px-3 py-1 text-xs font-600", typeStyles)}>{tc(v.variety_type)} {t("seedDetail.variety")}</span>
              <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-600 text-leaf">{cropName}</span>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-600 text-foreground sm:text-4xl">{v.variety_name}</h1>
            {v.short_description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{v.short_description}</p>
            )}

            {specs.length > 0 && (
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {specs.map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
                    <div className="flex items-center gap-2 text-xs font-600 uppercase tracking-wider text-muted-foreground">
                      <s.icon className="w-4 h-4 text-leaf" />{s.label}
                    </div>
                    <p className="mt-1.5 text-sm font-500 text-foreground">{s.value}</p>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink(`Hello Balavan Agro, I would like to know more about ${v.variety_name} (${cropName}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf focus-ring">
                <MessageCircle className="w-4 h-4" /> {t("seedDetail.enquireWhatsapp")}
              </a>
              {v.brochure_url && (
                <a href={v.brochure_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-600 text-foreground transition hover:border-primary hover:text-primary focus-ring">
                  <Download className="w-4 h-4" /> {t("seedDetail.downloadBrochure")}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {(v.full_description || features.length > 0) && (
        <section className="bg-cream/60 border-y border-border">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {v.full_description && (
                <div>
                  <h2 className="font-heading text-2xl font-600 text-foreground">{t("seedDetail.overview")}</h2>
                  <p className="mt-5 text-base leading-relaxed text-foreground/80">{v.full_description}</p>
                </div>
              )}
              {features.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl font-600 text-foreground">{t("seedDetail.keyChars")}</h2>
                  <ul className="mt-5 space-y-3">
                    {features.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-base text-foreground/80">
                        <span className="mt-1 grid place-items-center w-5 h-5 rounded-full bg-leaf-soft text-leaf shrink-0"><Check className="w-3 h-3" /></span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {guidance.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-heading text-2xl font-600 text-foreground">{t("seedDetail.cultivation")}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guidance.map((g) => (
              <div key={g.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-2">
                  <g.icon className="w-5 h-5 text-leaf" />
                  <h3 className="font-heading text-lg font-600 text-foreground">{g.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {documents.length > 0 && (
        <section className="bg-cream/60 border-y border-border">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <h2 className="font-heading text-2xl font-600 text-foreground">{t("seedDetail.relatedDocs")}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((d) => (
                <a key={d.id} href={d.file_url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:shadow-lift focus-ring">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-leaf-soft text-leaf shrink-0"><FileText className="w-5 h-5" /></span>
                  <div className="min-w-0">
                    <p className="font-heading text-base font-600 text-foreground truncate">{d.document_title}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{d.document_type.replace(/_/g, " ")}{d.language ? ` · ${d.language}` : ""}{d.file_size ? ` · ${d.file_size}` : ""}</p>
                  </div>
                  <Download className="ml-auto w-4 h-4 text-muted-foreground transition group-hover:text-primary" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-cream/60 border-y border-border">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-600 text-foreground">{t("seedDetail.relatedVarieties")}</h2>
              <Link to="/seeds" className="inline-flex items-center gap-1.5 text-sm font-600 text-primary hover:gap-2.5 transition">
                {t("seedDetail.allSeeds")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {related.map((r) => (
                <SeedCard key={r.id} seed={toSeedCardProps(r, lookup)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <h2 className="font-heading text-2xl font-600 text-foreground">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {faqEntries.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-heading text-lg font-600 text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={t("seedDetail.ctaTitle")}
        description={t("seedDetail.ctaDesc")}
        primary={{ label: t("common.contactUs"), to: "/contact" }}
      />
    </>
  );
}