import React from "react";
import Seo from "@/components/site/Seo";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { seoConfig } from "@/lib/seoConfig";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ContactHero from "@/components/site/contact/ContactHero";
import QuickNav from "@/components/site/contact/QuickNav";
import ContactDirectory from "@/components/site/contact/ContactDirectory";
import ContactForm from "@/components/site/contact/ContactForm";
import FarmerSupport from "@/components/site/contact/FarmerSupport";
import AreasServed from "@/components/site/contact/AreasServed";
import OfficeLocation from "@/components/site/contact/OfficeLocation";
import ContactFinalCTA from "@/components/site/contact/ContactFinalCTA";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <Seo {...seoConfig["/contact"]} />
      <ContactHero />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: t("contact.breadcrumb") }]} />
      </div>

      {/* Quick resource navigation — editorial index */}
      <div className="pt-8">
        <QuickNav />
      </div>

      {/* Main contact area — directory + form */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ContactDirectory />
            </div>
            <div className="lg:col-span-7 lg:border-l lg:border-border lg:pl-16">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Farmer support CTA */}
      <FarmerSupport />

      {/* Areas we serve */}
      <AreasServed />

      {/* Office location + map */}
      <OfficeLocation />

      {/* Final CTA */}
      <ContactFinalCTA />
    </>
  );
}