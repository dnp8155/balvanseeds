import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Calendar, Wheat, Droplets, Building2, Store, ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHero from "@/components/site/PageHero";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CTASection from "@/components/site/CTASection";
import Seo from "@/components/site/Seo";
import { seoConfig } from "@/lib/seoConfig";
import { faqCategories } from "@/lib/faqData";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const iconMap = {
  Sprout,
  Calendar,
  Wheat,
  Droplets,
  Building2,
  Store,
};

export default function Faq() {
  const { t } = useLanguage();

  return (
    <>
      <Seo {...seoConfig["/faq"]} />
      <PageHero
        eyebrow="Knowledge Base"
        title="Frequently Asked Questions"
        subtitle="Everything farmers, dealers, and partners ask about Balavan Agro seeds — hybrid vs improved varieties, seasonal sowing, cultivation practices, dealership, and more."
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={[{ label: t("common.home"), to: "/" }, { label: "FAQ" }]} />
      </div>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {faqCategories.map((cat) => {
          const Icon = iconMap[cat.icon] || HelpCircle;
          return (
            <div key={cat.id} className="mb-12 last:mb-0">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-heading text-2xl font-600 text-foreground">{cat.title}</h2>
              </div>
              <Accordion type="single" collapsible className="border-t border-border">
                {cat.questions.map((qa, i) => (
                  <AccordionItem key={`${cat.id}-${i}`} value={`${cat.id}-${i}`} className="border-b border-border">
                    <AccordionTrigger className="text-left text-[15px] font-600 text-foreground hover:text-primary py-5">
                      {qa.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                      {qa.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          );
        })}

        {/* Still have questions */}
        <div className="mt-12 rounded-lg border border-border bg-leaf-soft/40 p-8 text-center">
          <h3 className="font-heading text-xl font-600 text-foreground">Still have questions?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our agronomy team is here to help with personalized seed selection and cultivation guidance.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/ask-expert" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-600 text-primary-foreground transition hover:bg-primary/90">
              Ask an Expert <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-600 text-foreground transition hover:border-primary/40">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Find the Right Seed for Your Field"
        description="Browse our full catalogue of hybrid and improved seed varieties — or talk to our team for a personalized recommendation."
        primary={{ label: "Browse All Seeds", to: "/seeds" }}
      />
    </>
  );
}