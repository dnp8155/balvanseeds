import React, { useState, useMemo } from "react";
import { Award, ShieldCheck } from "lucide-react";
import { certificates, images } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CertificateCard from "@/components/site/CertificateCard";
import SectionHeading from "@/components/site/SectionHeading";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Certificates() {
  const { t, tc } = useLanguage();
  const allCrops = [t("cert.all"), ...Array.from(new Set(certificates.flatMap((c) => c.crops)))];
  const [filter, setFilter] = useState(allCrops[0]);
  const filtered = useMemo(() => {
    if (filter === t("cert.all")) return certificates;
    return certificates.filter((c) => c.crops.includes(filter));
  }, [filter, t]);

  const badges = [
    { icon: Award, title: t("cert.badge1"), text: t("cert.badge1d") },
    { icon: ShieldCheck, title: t("cert.badge2"), text: t("cert.badge2d") },
    { icon: Award, title: t("cert.badge3"), text: t("cert.badge3d") },
    { icon: ShieldCheck, title: t("cert.badge4"), text: t("cert.badge4d") }
  ];

  return (
    <>
      <Seo {...seoConfig["/certificates"]} />
      <PageHero
        eyebrow={t("cert.eyebrow")}
        title={t("cert.title")}
        subtitle={t("cert.subtitle")}
        image={images.mustard}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("cert.breadcrumb") }]} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => (
            <div key={b.title} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
              <span className="grid place-items-center w-11 h-11 rounded-lg bg-leaf-soft text-leaf shrink-0"><b.icon className="w-5 h-5" /></span>
              <div>
                <p className="text-sm font-600 text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {allCrops.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-600 transition focus-ring ${filter === c ? "bg-primary text-primary-foreground" : "bg-leaf-soft text-leaf hover:bg-leaf/15"}`}
            >{tc(c)}</button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CertificateCard key={c.id} cert={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="rounded-2xl border border-border bg-cream/60 p-8 text-center">
          <SectionHeading align="center" title={t("cert.needCopy")} description={t("cert.needCopyDesc")} />
          <a href="/downloads" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf focus-ring">{t("cert.goDownloads")}</a>
        </div>
      </section>
    </>
  );
}