import React, { useState, useMemo } from "react";
import { Award, ShieldCheck } from "lucide-react";
import { certificates, images } from "@/lib/siteData";
import ResourcePageHeader from "@/components/site/ResourcePageHeader";
import CertificateCard from "@/components/site/CertificateCard";
import SectionHeading from "@/components/site/SectionHeading";
import FilterPills from "@/components/site/FilterPills";
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
    { icon: ShieldCheck, title: t("cert.badge4"), text: t("cert.badge4d") },
  ];

  return (
    <>
      <ResourcePageHeader path="/certificates" prefix="cert" image={images.mustard} />
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="rounded-sm border border-border bg-card p-4">
                <Icon className="h-6 w-6 text-leaf" strokeWidth={1.5} />
                <p className="mt-3 text-sm font-600 text-foreground">{b.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{b.text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <FilterPills options={allCrops} value={filter} onChange={setFilter} />
      </section>
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => <CertificateCard key={c.id} cert={c} />)}
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="rounded-sm border border-border bg-cream/60 p-8 text-center">
          <SectionHeading align="center" title={t("cert.needCopy")} description={t("cert.needCopyDesc")} />
          <a href="/downloads" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-600 text-primary-foreground shadow-soft transition hover:bg-leaf focus-ring">{t("cert.goDownloads")}</a>
        </div>
      </section>
    </>
  );
}