import React from "react";
import { Link } from "react-router-dom";
import { Heart, FlaskConical, ShieldCheck, Factory, Sprout } from "lucide-react";
import { Image } from "@/components/ui/image";
import { images, values, milestones } from "@/lib/siteData";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CTASection from "@/components/site/CTASection";
import FounderVision from "@/components/site/FounderVision";
import CompanyVision from "@/components/site/CompanyVision";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function About() {
  const { t, tc } = useLanguage();
  return (
    <>
      <Seo {...seoConfig["/about"]} />
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        image={images.about}
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("about.breadcrumb") }]} />
      </div>

      {/* Overview */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow={t("about.overviewEyebrow")} title={t("about.overviewTitle")} />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>{t("about.overviewP1")}</p>
              <p>{t("about.overviewP2")}</p>
              <p>{t("about.overviewP3")}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lift">
            <Image src={images.fieldTexture} alt="Aerial view of agricultural fields" className="aspect-[4/3] w-full" fittingType="fill" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream/60 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1 overflow-hidden rounded-2xl shadow-lift">
              <Image src={images.about} alt="Balavan Agro research facility and trial fields" className="aspect-[4/3] w-full" fittingType="fill" />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading eyebrow={t("about.storyEyebrow")} title={t("about.storyTitle")} />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>{t("about.storyP1")}</p>
                <p>{t("about.storyP2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <FounderVision />

      {/* Company Vision */}
      <CompanyVision />

      {/* Values */}
      <section className="bg-cream/60 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <SectionHeading align="center" eyebrow={t("about.valuesEyebrow")} title={t("about.valuesTitle")} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <span className="grid place-items-center w-11 h-11 rounded-lg bg-leaf-soft text-leaf"><Heart className="w-5 h-5" /></span>
                <h3 className="mt-4 font-heading text-lg font-600 text-foreground">{tc(v.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tc(v.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D + Quality + Infrastructure */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { icon: FlaskConical, title: t("about.rdTitle"), text: t("about.rdText") },
            { icon: ShieldCheck, title: t("about.qualityTitle"), text: t("about.qualityText") },
            { icon: Factory, title: t("about.infraTitle"), text: t("about.infraText") }
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <span className="grid place-items-center w-12 h-12 rounded-lg bg-leaf-soft text-leaf"><c.icon className="w-6 h-6" /></span>
              <h3 className="mt-4 font-heading text-xl font-600 text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Farmer-focused approach */}
      <section className="bg-cream/60 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeading eyebrow={t("about.farmerEyebrow")} title={t("about.farmerTitle")} />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>{t("about.farmerP1")}</p>
                <p>{t("about.farmerP2")}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <Image src={images.farmer} alt="Balavan Agro farmer partner in the field" className="aspect-[4/3] w-full" fittingType="fill" />
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <SectionHeading eyebrow={t("about.milestonesEyebrow")} title={t("about.milestonesTitle")} />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m) => (
            <li key={m.year} className="relative rounded-xl border border-border bg-card p-6 shadow-soft">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-primary text-primary-foreground"><Sprout className="w-6 h-6" /></span>
              <p className="mt-4 font-heading text-xl font-600 text-primary">{m.year}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tc(m.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <CTASection
        title={t("about.ctaTitle")}
        description={t("about.ctaDesc")}
        primary={{ label: t("common.contactUs"), to: "/contact" }}
      />
    </>
  );
}