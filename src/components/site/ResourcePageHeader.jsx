import React from "react";
import Seo from "@/components/site/Seo";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";
export default function ResourcePageHeader({ path, prefix, image, title, subtitle, eyebrow }) {
  const { t } = useLanguage();
  return <><Seo {...seoConfig[path]} /><PageHero eyebrow={eyebrow || t(`${prefix}.eyebrow`)} title={title || t(`${prefix}.title`)} subtitle={subtitle || t(`${prefix}.subtitle`)} image={image} /><div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8"><Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: title || t(`${prefix}.breadcrumb`) }]} /></div></>;
}